import Dropdown from "../Dropdown";
import DropdownButton from "../DropdownButton";
import blocks from "../../blocks.json";
import { useContext } from "react";
import StrategyContext from "../strategyContext";

import trend from "../../assets/icons/trend.png";
import thresholdComparison from "../../assets/icons/thresholdComparison.png";
import comparison from "../../assets/icons/comparison.png";
import { AiFillClockCircle } from "react-icons/ai";

function ConditionDropdown(props) {
  const { strategy } = useContext(StrategyContext);

  return (
    <Dropdown
      isDropdownActive={props.isConditionDropdownActive}
      toggleDropdown={props.toggleDropdown}
      left={props.left + "rem"}
      top={props.top}
    >
      <DropdownButton
        onClick={() => {
          const trendBlock = {
            ...blocks["trend"],
            values: ["", "", ""],
          };
          strategy[props.cond]
            ? strategy[props.cond].push(trendBlock)
            : (strategy[props.cond] = [trendBlock]);
          props.updateStrategy();
        }}
        name="Trend"
        icon={<img src={trend} className="h-16 w-16" />}
      />
      <DropdownButton
        onClick={() => {
          const timeBlock = {
            ...blocks["time"],
            values: ["", ""],
          };
          strategy[props.cond]
            ? strategy[props.cond].push(timeBlock)
            : (strategy[props.cond] = [timeBlock]);
          props.updateStrategy();
        }}
        name="Time"
        icon={
          <div className="h-16 w-16 border-2 border-black rounded-lg flex items-center justify-center">
            <AiFillClockCircle size="48" color="white" />
          </div>
        }
      />
      <DropdownButton
        onClick={() => {
          const thresholdBlock = {
            ...blocks["thresholdComparison"],
            values: ["", "", ""],
          };
          strategy[props.cond]
            ? strategy[props.cond].push(thresholdBlock)
            : (strategy[props.cond] = [thresholdBlock]);
          props.updateStrategy();
        }}
        name="Threshold Comparison"
        icon={<img src={thresholdComparison} className="h-16 w-16" />}
      />
      <DropdownButton
        onClick={() => {
          const comparisonBlock = {
            ...blocks["comparison"],
            values: ["", "", ""],
          };
          strategy[props.cond]
            ? strategy[props.cond].push(comparisonBlock)
            : (strategy[props.cond] = [comparisonBlock]);
          props.updateStrategy();
        }}
        name="Comparison"
        icon={<img src={comparison} className="h-16 w-16" />}
        lineBreak={true}
      />
    </Dropdown>
  );
}

export default ConditionDropdown;
