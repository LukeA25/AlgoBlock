import { useEffect, useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import ValueMiniDropdown from "./ValueMiniDropdown";
import IndicatorMiniDropdown from "./IndicatorMiniDropdown";
import MiniDropdownExtras from "./MiniDropdownExtras";
import CommunityIndicatorMiniDropdown from "./CommunityIndicatorMiniDropdown";

function MiniDropdown(props) {
  const [isActive, setIsActive] = useState(false);
  const topRef = useRef();
  const searchRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [indicatorDropdownActive, setIndicatorDropdownActive] = useState(false);
  const [indicatorPopupActive, setIndicatorPopupActive] = useState(false);
  const [top, setTop] = useState(0.0);

  function toggleIndicatorPopup() {
    setIndicatorPopupActive(!indicatorPopupActive);
  }

  function toggleIndicatorDropdown() {
    setIndicatorDropdownActive(!indicatorDropdownActive);
  }

  function toggleDropdown() {
    setIsActive(!isActive);
  }

  useEffect(() => {
    setTop((topRef.current.offsetTop + topRef.current.offsetHeight) * 0.0625);
  });

  return (
    <>
      <div
        onClick={!disabled ? toggleDropdown : undefined}
        ref={topRef}
        className={`w-full min-h-[3.5rem] overlow-y-scroll rounded-lg flex justify-between items-center border-2 border-white hover:cursor-pointer duration-300 ${
          props.object.values[props.index]
            ? `bg-green-600 ${
                !disabled && "hover:bg-green-500 active:bg-green-800"
              }`
            : "bg-gray-600 hover:bg-gray-500 active:bg-gray-800"
        }`}
      >
        {props.object.values[props.index] ? (
          typeof props.object.values[props.index] === "object" ? (
            props.object.values[props.index].name.startsWith("Enter") ? (
              <ValueMiniDropdown
                setDisabled={setDisabled}
                values={props.object.values[props.index]}
                updateStrategy={props.updateStrategy}
              />
            ) : props.object.values[props.index].title ? (
              <CommunityIndicatorMiniDropdown
                setDisabled={setDisabled}
                indicator={props.object.values[props.index]}
                updateStrategy={props.updateStrategy}
              />
            ) : (
              <IndicatorMiniDropdown
                toggleDropdown={toggleIndicatorDropdown}
                setDisabled={setDisabled}
                indicator={props.object.values[props.index]}
                togglePopup={toggleIndicatorPopup}
                searchValue={searchValue}
              />
            )
          ) : (
            <>
              <p className="leading-tight text-lg font-semibold flex-grow">
                {props.object.values[props.index]}
              </p>
              <AiFillCaretDown size="30" color="white" />
            </>
          )
        ) : (
          <>
            <p className="leading-tight text-lg flex-grow">
              {props.item.prompt}
            </p>
            <AiFillCaretDown size="30" color="white" />
          </>
        )}
      </div>
      <MiniDropdownExtras
        miniDropdownProps={props}
        searchValue={searchValue}
        searchRef={searchRef}
        setSearchValue={setSearchValue}
        topRef={topRef}
        toggleDropdown={toggleDropdown}
        isActive={isActive}
        indicatorDropdownActive={indicatorDropdownActive}
        toggleIndicatorDropdown={toggleIndicatorDropdown}
        indicatorPopupActive={indicatorPopupActive}
        toggleIndicatorPopup={toggleIndicatorPopup}
        top={top}
      />
    </>
  );
}

export default MiniDropdown;
