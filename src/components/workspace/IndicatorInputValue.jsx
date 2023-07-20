import { useContext, useState } from "react";
import StrategyContext from "../strategyContext";

function IndicatorInputValue(props) {
  const [value, setValue] = useState(props.value);
  const { strategy } = useContext(StrategyContext);

  function checkNumber(event) {
    const input = eval(`strategy.${props.path}.inputs[${props.index}]`);
    if (event.target.value <= 0) {
      props.setError(`The '${input.name}' value must be positive.`);
      return false;
    } else {
      if (input.type === "int") {
        if (/^\d*$/.test(event.target.value)) {
          props.setError("");
          props.updateStrategy();
          return true;
        } else {
          props.setError(`The '${input.name}' value must be a whole number.`);
          return false;
        }
      }
    }
    props.setError("");
    props.updateStrategy();
    return true;
  }

  return (
    <input
      className="w-20 border-2 text-xl border-black bg-green-600 rounded-md text-center p-1"
      type="number"
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
        if (checkNumber(event)) {
          if (props.path.startsWith("entryConditions")) {
            strategy.entryConditions[props.path.substring(16, 17)].values[
              props.path.substring(26, 27)
            ].inputs[props.index].value = event.target.value;
          }
          if (props.path.startsWith("exitConditions")) {
            strategy.exitConditions[props.path.substring(15, 16)].values[
              props.path.substring(25, 26)
            ].inputs[props.index].value = event.target.value;
          }
          if (props.path.startsWith("trigger")) {
            strategy.trigger.values[props.path.substring(15, 16)].inputs[
              props.index
            ].value = event.target.value;
          }
          if (props.path.startsWith("details")) {
            strategy.details.stopLoss.value.inputs[props.index].value =
              event.target.value;
          }
        }
      }}
    />
  );
}

export default IndicatorInputValue;
