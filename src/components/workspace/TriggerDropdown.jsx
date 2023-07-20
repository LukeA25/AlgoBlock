import blocks from "../../blocks.json";
import Dropdown from "../Dropdown";
import DropdownButton from "../DropdownButton";
import { useContext } from "react";
import StrategyContext from "../strategyContext";

import crossover from "../../assets/icons/crossover.png";
import thresholdCross from "../../assets/icons/thresholdCross.png";
import patternBreakout from "../../assets/icons/patternBreakout.png";

function TriggerDropdown(props) {
  const { strategy } = useContext(StrategyContext);
  return (
    <Dropdown
      isDropdownActive={props.isTriggerDropdownActive}
      toggleDropdown={props.toggleDropdown}
      top="27.05"
    >
      <DropdownButton
        onClick={() => {
          strategy.trigger = {
            name: "Crossover",
            values: ["", "", ""],
          };
          props.updateStrategy();
        }}
        name="Crossover"
        icon={<img src={crossover} className="h-16 w-16" />}
      />
      <DropdownButton
        onClick={() => {
          props.cond.trigger = {
            name: "Threshold Cross",
            values: ["", "", ""],
          };
          props.updateStrategy();
        }}
        name="Threshold Cross"
        icon={<img src={thresholdCross} className="h-16 w-16" />}
      />
      <DropdownButton
        onClick={() => {
          props.cond.trigger = {
            name: "Pattern Breakout",
            values: [""],
          };
          props.updateStrategy();
        }}
        name="Pattern Breakout"
        icon={<img src={patternBreakout} className="h-16 w-16" />}
        lineBreak={true}
      />
    </Dropdown>
  );
}

export default TriggerDropdown;
