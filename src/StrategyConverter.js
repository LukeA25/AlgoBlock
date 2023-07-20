export default function convertScript(strategy) {
  var script = "";
  const fileContent = `// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0
// © AlgoBlock

//@version=5
strategy("${strategy.name}", overlay=true, default_qty_type=${strategy.details.orderQuantity.type === "%" ? "strategy.percent_of_equity" : "strategy.fixed"}, default_qty_value=${strategy.details.orderQuantity.amount})
`;

  function appendFile(content) {
    script = script + content;
  }

  appendFile(fileContent);

  var inputLines = [
    `riskRewardRatio = input.float(${strategy.details.riskReward}, title="Risk/Reward Ratio")`,
    `orderQuantity = input.int(${strategy.details.orderQuantity.amount}, title="Order Quantity")`
  ];
  var calculationLines = [];
  var plotLines = [];
  var communityIndicators = [];
  var varNames = { inputs: {} };
  var trendBlocks = 0;
  var entryCondition = "entryCondition = ";
  var exitCondition = "";

  const orderName =
    strategy.details.orderType === "Buy Long" ? "Long" : "Short";
  const orderType =
    strategy.details.orderType === "Buy Long"
      ? "strategy.long"
      : "strategy.short";
//   var riskManagement = strategy.riskManagement ? " and riskManagement" : "";
//   var riskManagementLine = "";
  var stopLoss = "";
  var takeProfit = "";

  function communityIndicator(indicator) {
    var exists = false;
    communityIndicators.forEach((name) => {
      if (name === indicator.name) {
        exists = true;
        return;
      }
    });
    if (exists) {
      return indicator.name;
    } else {
      inputLines.push(
        `${indicator.name} = input.source(close, title="${indicator.name}")`
      );
    }
    communityIndicators.push(indicator.name);
    return indicator.name;
  }

  function getIndicatorVarName(indicator) {
    if (indicator.outputs) {
      for (const i in indicator.outputs) {
        if (indicator.outputs[i].displayName === indicator.activeOutput) {
          return indicator.outputs[i].varName;
        }
      }
    } else {
      return indicator.output.name;
    }
  }

  function inputsToString(inputs) {
    var inputString = "";
    for (const i in inputs) {
      if (typeof inputs[i] === "string") {
        inputString = inputString + inputs[i];
      } else {
        inputString = inputString + inputs[i].value;
      }
    }
    return inputString;
  }

  function addIndicator(indicator) {
    var calculation = "";
    var plots = [];
    var indicatorFound = false;

    if (varNames[indicator.name]) {
      varNames.inputs[indicator.name].forEach((inputObj) => {
        if (inputsToString(indicator.inputs) === inputObj.string) {
          if (inputObj.num != 1) {
            const num = inputObj.num;
            if (indicator.outputs) {
              indicator.outputs.forEach((output) => {
                if (isNaN(output.varName.slice(-1))) {
                  output.varName = output.varName + num;
                  output.title = output.title + " " + num;
                }
              });
            } else {
              if (isNaN(indicator.output.name.slice(-1))) {
                indicator.output.name = indicator.output.name + num;
                indicator.output.title = indicator.output.title + " " + num;
              }
            }
          }
          indicatorFound = true;
          return;
        }
      });

      if (indicatorFound) {
        return;
      }

      const indicatorIndex = varNames[indicator.name] + 1;
      varNames[indicator.name] = indicatorIndex;
      varNames.inputs[indicator.name].push({
        string: inputsToString(indicator.inputs),
        num: varNames[indicator.name],
      });
      if (indicator.outputs) {
        indicator.outputs.forEach((output) => {
          if (isNaN(output.varName.slice(-1))) {
            output.varName = output.varName + indicatorIndex;
            output.title = output.title + " " + indicatorIndex;
          }
        });
      } else {
        if (isNaN(indicator.output.name.slice(-1))) {
          indicator.output.name = indicator.output.name + indicatorIndex;
          indicator.output.title =
            indicator.output.title + " " + indicatorIndex;
        }
      }
    } else {
      varNames[indicator.name] = 1;
      varNames.inputs[indicator.name] = [
        {
          string: inputsToString(indicator.inputs),
          num: 1,
        },
      ];
    }
    if (indicator.outputs) {
      calculation = "[";
      indicator.outputs.forEach((output, index) => {
        calculation = calculation.concat(output.varName);
        if (index != indicator.outputs.length - 1) {
          calculation = calculation.concat(", ");
        }

        if (output.plot) {
          var plot =
            "plot(" + output.varName + ', title="' + output.title + '", ';
          for (const key in output) {
            if (key === "plotSpecial") {
              plot = output[key] + ", ";
            } else {
              if (
                key !== "varName" &&
                key !== "displayName" &&
                key !== "plot" &&
                key !== "title"
              ) {
                plot = plot.concat(key + "=" + output[key] + ", ");
              }
            }
          }
          plots.push(plot.slice(0, -2).concat(")"));
        }
      });
      calculation = calculation.concat("]");
    } else {
      calculation = indicator.output.name;
      if (indicator.output.plot) {
        var plot =
          "plot(" +
          indicator.output.name +
          ', title="' +
          indicator.output.title +
          '", ';
        for (const key in indicator.output) {
          if (key === "plotSpecial") {
            plot = indicator.output[key] + ", ";
          } else {
            if (
              key !== "varName" &&
              key !== "displayName" &&
              key !== "plot" &&
              key !== "title" &&
              key !== "name"
            ) {
              plot = plot.concat(key + "=" + indicator.output[key] + ", ");
            }
          }
        }
        plots.push(plot.slice(0, -2).concat(")"));
      }
    }

    plots.forEach((plot) => plotLines.push(plot));

    calculation = calculation.concat(" = ta.", indicator.function, "(");
    indicator.inputs.forEach((input) => {
      if (typeof input === "string") {
        calculation = calculation.concat(input + ", ");
      } else {
        calculation = calculation.concat(input.value + ", ");
      }
    });

    calculationLines.push(calculation.slice(0, -2).concat(")"));
  }

  function indicatorCondition(indicator) {
    if (typeof indicator === "string") {
      return "close";
    } else if (indicator.title === "Community Indicator") {
      return communityIndicator(indicator);
    } else {
      addIndicator(indicator);
      return getIndicatorVarName(indicator);
    }
  }

  if (strategy.details.stopLoss.type === "ATR Multiple") {
    const atr = {
      name: "Average True Range",
      function: "atr",
      inputs: [{ name: "Length", defaultValue: 14, value: 14, type: "int" }],
      output: {
        name: "atr",
        plot: false,
      },
    };

    addIndicator(atr);
    inputLines.push(
      `atrScale = input.float(${strategy.details.stopLoss.value}, title="ATR Scale")`
    );
    stopLoss =
      orderName === "Long"
        ? "close - (atr * atrScale)"
        : "close + (atr * atrScale)";
    takeProfit =
      orderName === "Long"
        ? "close + (atr * atrScale"
        : "close - (atr * atrScale";
  } else if (strategy.details.stopLoss.type === "Previous Candles") {
    inputLines.push(
      `candlesBack = input.int(${strategy.details.stopLoss.value}, title="Candle(s) Back")`
    );
    stopLoss = "close[-candlesBack]";
    takeProfit =
      orderName === "Long"
        ? "close + math.abs((close - close[-candlesBack])"
        : "close - math.abs((close - close[-candlesBack])";
  } else if (strategy.details.stopLoss.type === "Swing Low/High") {
    inputLines.push(
      orderName === "Long"
        ? `swingCandlesBack = input.int(${strategy.details.stopLoss.value}, title="Swing Low of Previous X Candle(s)")`
        : `swingCandlesBack = input.int(${strategy.details.stopLoss.value}, title="Swing High of Previous X Candle(s)")`
    );
    calculationLines.push(
      orderName === "Long"
        ? `swingLow = ta.lowest(swingCandlesBack)`
        : `swingHigh = ta.highest(swingCandlesBack)`
    );
    stopLoss = orderName === "Long" ? `swingLow` : `swingHigh`;
    takeProfit =
      orderName === "Long"
        ? `close + math.abs((close - ${stopLoss})`
        : `close - math.abs((close - ${stopLoss})`;
  } else {
    addIndicator(strategy.details.stopLoss.value);
    stopLoss = getIndicatorVarName(strategy.details.stopLoss.value);
    takeProfit =
      orderName === "Long"
        ? `close + math.abs((close - ${stopLoss})`
        : `close - math.abs((close - ${stopLoss})`;
  }

  var enterTrade = `var float stopLossPrice = na
var float takeProfitPrice = na
    
if entryCondition
    strategy.entry("${orderName}", ${orderType}, qty=orderQuantity)
    stopLossPrice := ${stopLoss}
    takeProfitPrice := ${takeProfit} * riskRewardRatio)
    strategy.exit("Exit", "${orderName}", stop=stopLossPrice, limit=takeProfitPrice)`;

  if (
    strategy.trigger.name === "Crossover" ||
    strategy.trigger.name === "Threshold Cross"
  ) {
    var firstVal = "";
    var secondVal = "";
    firstVal = indicatorCondition(strategy.trigger.values[0]);
    if (strategy.trigger.name === "Crossover") {
      secondVal = indicatorCondition(strategy.trigger.values[2]);
    } else {
      secondVal = strategy.trigger.values[2].value;
    }

    if (strategy.trigger.values[1] === "Above") {
      entryCondition = entryCondition.concat(
        `ta.crossover(${firstVal}, ${secondVal}) and `
      );
    } else if (strategy.trigger.values[1] === "Below") {
      entryCondition = entryCondition.concat(
        `ta.crossunder(${firstVal}, ${secondVal}) and `
      );
    } else {
      entryCondition = entryCondition.concat(
        `ta.cross(${firstVal}, ${secondVal}) and `
      );
    }
  }

  if (strategy.entryConditions && strategy.entryConditions.length > 0) {
    strategy.entryConditions.forEach((condition) => {
      if (
        condition.name === "Comparison" ||
        condition.name === "Threshold Comparison"
      ) {
        var firstVal = "";
        var secondVal = "";
        firstVal = indicatorCondition(condition.values[0]);
        if (condition.name === "Comparison") {
          secondVal = indicatorCondition(condition.values[2]);
        } else {
          secondVal = condition.values[2].value;
        }
        entryCondition = entryCondition.concat(
          `${firstVal} ${
            condition.values[1] === "Greater Than" ? ">" : "<"
          } ${secondVal} and `
        );
      } else if (condition.name === "Trend") {
        var trendNum = "";
        trendBlocks += 1;
        if (trendBlocks > 1) {
          trendNum = trendBlocks.toString();
        }

        inputLines.push(
          `slopeBarsBack${trendNum} = input.int(1, title="Slope Over Previous X Candle(s)")`
        );
        var firstVal = "";
        var secondVal = "";
        firstVal = indicatorCondition(condition.values[0]);
        secondVal = condition.values[2].value;
        entryCondition = entryCondition.concat(
          `(${firstVal} - ${firstVal}[slopeBarsBack${trendNum}]) ${
            condition.values[1] === "Greater Than" ? ">" : "<"
          } ${secondVal} and `
        );
      } else {
        const hour = condition.values[2].value.split(":")[0];
        const minute = condition.values[2].value.split(":")[1];
        if (condition.values[1] === "Later Than") {
          if (minute === "00") {
            entryCondition = entryCondition.concat(`hour >= ${hour} and `);
          } else {
            entryCondition = entryCondition.concat(
              `((hour > ${hour}) or (hour == ${hour} and minute >= ${minute})) and `
            );
          }
        } else if (condition.values[1] === "Earlier Than") {
          if (minute === "00") {
            entryCondition = entryCondition.concat(`hour < ${hour} and `);
          } else {
            entryCondition = entryCondition.concat(
              `((hour < ${hour}) or (hour == ${hour} and minute < ${minute})) and `
            );
          }
        } else {
          entryCondition = entryCondition.concat(
            `(hour == ${hour} and minute == ${minute}) and `
          );
        }
        if (condition.values[1] === "Later Than") {
        } else if (condition.values[1] === "Earlier Than") {
        }
      }
    });
  }

  if (strategy.exitConditions && strategy.exitConditions.length > 0) {
    exitCondition = "exitCondition = ";
    console.log(strategy.exitConditions);
    strategy.exitConditions.forEach((condition) => {
      if (
        condition.name === "Comparison" ||
        condition.name === "Threshold Comparison"
      ) {
        var firstVal = "";
        var secondVal = "";
        firstVal = indicatorCondition(condition.values[0]);
        if (condition.name === "Comparison") {
          secondVal = indicatorCondition(condition.values[2]);
        } else {
          secondVal = condition.values[2].value;
        }
        exitCondition = exitCondition.concat(
          `${firstVal} ${
            condition.values[1] === "Greater Than" ? ">" : "<"
          } ${secondVal} or `
        );
      } else if (condition.name === "Trend") {
        var trendNum = "";
        trendBlocks += 1;
        if (trendBlocks > 1) {
          trendNum = trendBlocks.toString();
        }

        inputLines.push(
          `slopeBarsBack${trendNum} = input.int(1, title="Slope Over Previous X Candle(s)")`
        );
        var firstVal = "";
        var secondVal = "";
        firstVal = indicatorCondition(condition.values[0]);
        secondVal = condition.values[2].value;
        exitCondition = exitCondition.concat(
          `(${firstVal} - ${firstVal}[slopeBarsBack${trendNum}]) ${
            condition.values[1] === "Greater Than" ? ">" : "<"
          } ${secondVal} or `
        );
      } else {
        const hour = condition.values[2].value.split(":")[0];
        const minute = condition.values[2].value.split(":")[1];
        if (condition.values[1] === "Later Than") {
          if (minute === "00") {
            exitCondition = exitCondition.concat(`hour >= ${hour} or `);
          } else {
            exitCondition = exitCondition.concat(
              `((hour > ${hour}) or (hour == ${hour} and minute >= ${minute})) or `
            );
          }
        } else if (condition.values[1] === "Earlier Than") {
          if (minute === "00") {
            exitCondition = exitCondition.concat(`hour < ${hour} or `);
          } else {
            exitCondition = exitCondition.concat(
              `((hour < ${hour}) or (hour == ${hour} and minute < ${minute})) or `
            );
          }
        } else {
          exitCondition = exitCondition.concat(
            `(hour == ${hour} and minute == ${minute}) or `
          );
        }
        if (condition.values[1] === "Later Than") {
        } else if (condition.values[1] === "Earlier Than") {
        }
      }
    });
  }

  if (strategy.exitConditions) {
    enterTrade =
      enterTrade +
      `
if exitCondition
    strategy.close("${orderName}")`;
  }

//   if (strategy.riskManagement) {
//     if (strategy.riskManagement.title === "Limit on Open Trades") {
//       riskManagementLine = `riskManagement = strategy.opentrades < ${strategy.riskManagement.value}`;
//     } else if (strategy.riskManagement.title === "Percentage of Portfolio") {

//     }
//   }

  calculationLines.push("inTrade = strategy.opentrades > 0");
  if (orderName === "Long") {
    plotLines.push(
      `bgcolor(inTrade ? color.new(color.green, 75) : na, title="In Trade")`
    );
  } else {
    plotLines.push(
      `bgcolor(inTrade ? color.new(color.red, 75) : na, title="In Trade")`
    );
  }

  inputLines && appendFile("\n");
  inputLines.forEach((line) => {
    appendFile(line + "\n");
  });

  appendFile("\n");

  calculationLines.forEach((line) => {
    appendFile(line + "\n");
  });

  appendFile("\n" + entryCondition.slice(0, -5));
  exitCondition && appendFile("\n" + exitCondition.slice(0, -4));
  appendFile("\n\n" + enterTrade + "\n\n");

  plotLines.forEach((line) => {
    appendFile(line + "\n");
  });

  return script;
}
