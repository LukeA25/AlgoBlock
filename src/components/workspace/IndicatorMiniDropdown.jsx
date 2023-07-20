import { AiFillCaretDown } from "react-icons/ai";
import { MdSettings } from "react-icons/md";

function IndicatorMiniDropdown(props) {
  function hasInputs(inputs) {
    if (inputs.length == 0) {
      return false;
    }
    for (const i in inputs) {
      if (typeof inputs[i] === "string") {
        continue;
      } else {
        return true;
      }
    }
    return false;
  }

  return (
    <>
      <div className="py-2 flex-grow flex flex-col gap-1">
        <p className="leading-tight text-lg font-semibold">
          {props.indicator.name}
        </p>
        {props.indicator.outputs && (
          <div
            onClick={props.toggleDropdown}
            onMouseEnter={() => props.setDisabled(true)}
            onMouseLeave={() => props.setDisabled(false)}
            onTouchStart={() => {
              props.setDisabled(true);
            }}
            onTouchEnd={() => {
              props.setDisabled(false);
            }}
            className="w-36 m-auto rounded-md border-2 border-white bg-green-600 hover:bg-green-400 active:bg-green-700 duration-300 p-1 flex justify-center items-center gap-2"
          >
            <p className="text-base font-semibold">
              {props.indicator.activeOutput}
            </p>
            <AiFillCaretDown size="20" color="white" />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        {props.indicator.inputs && hasInputs(props.indicator.inputs) && (
          <div
            onClick={props.togglePopup}
            onMouseEnter={() => props.setDisabled(true)}
            onMouseLeave={() => props.setDisabled(false)}
            onTouchStart={() => props.setDisabled(true)}
            onTouchEnd={() => props.setDisabled(false)}
            className="hover:bg-shaded-500 active:bg-shaded-750 duration-300 p-[0.1rem] rounded-md"
          >
            <MdSettings size="25" color="white" />
          </div>
        )}
        <AiFillCaretDown size="30" color="white" />
      </div>
    </>
  );
}

export default IndicatorMiniDropdown;
