import Dropdown from "../Dropdown";
import DropdownButton from "../DropdownButton";
import Popup from "../Popup";
import { useState } from "react";
import blocks from "../../blocks.json";
import IndicatorInputValue from "./IndicatorInputValue";

function MiniDropdownExtras(props) {
  const [error, setError] = useState("");

  function restoreDefaults() {
    const inputs =
      props.miniDropdownProps.object.values[props.miniDropdownProps.index]
        .inputs;

    inputs.forEach((input) => {
      if (typeof input !== "string") {
        const newValue = input.defaultValue;
        input.value = newValue;
      }
    });
    props.toggleIndicatorPopup();
    setError("");
    props.miniDropdownProps.updateStrategy();
  }

  function submitHandler(event) {
    event.preventDefault();
    props.toggleIndicatorPopup();
    setError("");
    props.miniDropdownProps.updateStrategy();
  }

  return (
    <>
      {props.miniDropdownProps.object.values[props.miniDropdownProps.index] &&
        typeof props.miniDropdownProps.object.values[
          props.miniDropdownProps.index
        ] === "object" &&
        props.miniDropdownProps.object.values[props.miniDropdownProps.index]
          .name &&
        !props.miniDropdownProps.object.values[
          props.miniDropdownProps.index
        ].name.startsWith("Enter") &&
        props.miniDropdownProps.object.values[props.miniDropdownProps.index]
          .title !== "Community Indicator" && (
          <>
            <Popup
              toggle={() => {
                props.toggleIndicatorPopup();
                setError("");
              }}
              getActive={props.indicatorPopupActive}
              title={
                <p>
                  Settings for{" "}
                  <b className="font-semibold text-green-600">
                    {
                      props.miniDropdownProps.object.values[
                        props.miniDropdownProps.index
                      ].name
                    }
                  </b>
                </p>
              }
            >
              <form onSubmit={submitHandler}>
                {props.miniDropdownProps.object.values[
                  props.miniDropdownProps.index
                ].inputs.map(
                  (input, index) =>
                    typeof input !== "string" && (
                      <>
                        <div className="flex justify-between items-center py-2">
                          <h3 className="text-black text-xl">
                            {input.name + ":"}
                          </h3>
                          <IndicatorInputValue
                            value={input.value}
                            path={props.miniDropdownProps.path}
                            index={index}
                            setError={setError}
                            updateStrategy={
                              props.miniDropdownProps.updateStrategy
                            }
                          />
                        </div>
                        <hr className="border-black" />
                      </>
                    )
                )}
                {error && <p className="text-red-600">{error}</p>}
                <div
                  onClick={restoreDefaults}
                  className="text-md font-semibold pt-2 hover:cursor-pointer text-green-600 hover:text-green-500 active:text-green-700 duration-300"
                >
                  Restore Defaults
                </div>
                <div className="flex gap-8 mt-4">
                  <button className="w-48 h-12 m-auto bg-green-600 hover:bg-green-500 active:bg-green-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-2xl font-semibold">
                    Confirm
                  </button>
                </div>
              </form>
            </Popup>
            {props.miniDropdownProps.object.values[
              props.miniDropdownProps.index
            ].outputs && (
              <Dropdown
                isDropdownActive={props.indicatorDropdownActive}
                toggleDropdown={props.toggleIndicatorDropdown}
                left={props.miniDropdownProps.left + "rem"}
                top={props.top}
              >
                {props.miniDropdownProps.object.values[
                  props.miniDropdownProps.index
                ].outputs.map((output, index) => (
                  <DropdownButton
                    onClick={() => {
                      props.miniDropdownProps.object.values[
                        props.miniDropdownProps.index
                      ].activeOutput = output.displayName;
                      props.miniDropdownProps.updateStrategy();
                      props.toggleIndicatorDropdown();
                    }}
                    name={output.displayName}
                    lineBreak={
                      index ==
                      props.miniDropdownProps.object.values[
                        props.miniDropdownProps.index
                      ].outputs.length -
                        1
                    }
                  />
                ))}
              </Dropdown>
            )}
          </>
        )}
      <Dropdown
        isDropdownActive={props.isActive}
        toggleDropdown={props.toggleDropdown}
        left={props.miniDropdownProps.left + "rem"}
        top={props.top}
        noPt={true}
      >
        <div
          key="search"
          className="top-0 sticky pt-2 rounded-t-md bg-gray-600"
        >
          <li className="px-2 pb-2">
            <input
              type="search"
              ref={props.searchRef}
              onChange={() => {
                props.setSearchValue(props.searchRef.current.value);
              }}
              placeholder="Search"
              className="px-1 w-full rounded-md mx-auto active:bg-gray-400 duration-300 text-black border-2 border-gray-700"
            />
          </li>
          <hr />
        </div>
        {Array.isArray(props.miniDropdownProps.item.options) ? (
          props.miniDropdownProps.item.options.map((option, index) => (
            <DropdownButton
              searchValue={props.searchValue}
              onClick={() => {
                props.miniDropdownProps.object.values[
                  props.miniDropdownProps.index
                ] = option;
                props.miniDropdownProps.updateStrategy();
                props.toggleDropdown();
              }}
              name={typeof option === "object" ? option.name : option}
              lineBreak={
                index == props.miniDropdownProps.item.options.length - 1
              }
            />
          ))
        ) : (
          <>
            {props.miniDropdownProps.item.options === "indicators" && (
              <>
                <DropdownButton
                  searchValue={props.searchValue}
                  onClick={() => {
                    props.miniDropdownProps.object.values[
                      props.miniDropdownProps.index
                    ] = "Instrument Price";
                    props.miniDropdownProps.updateStrategy();
                    props.toggleDropdown();
                  }}
                  name="Instrument Price"
                  lineBreak={false}
                />
                <DropdownButton
                  searchValue={props.searchValue}
                  onClick={() => {
                    props.miniDropdownProps.object.values[
                      props.miniDropdownProps.index
                    ] = { title: "Community Indicator", name: "" };
                    props.miniDropdownProps.updateStrategy();
                    props.toggleDropdown();
                  }}
                  name="Community Indicator"
                  lineBreak={false}
                />
              </>
            )}
            {blocks[props.miniDropdownProps.item.options].map(
              (option, index) => (
                <DropdownButton
                  searchValue={props.searchValue}
                  onClick={() => {                    
                    props.miniDropdownProps.object.values[
                      props.miniDropdownProps.index
                    ] = JSON.parse(JSON.stringify(option));
                    props.miniDropdownProps.updateStrategy();
                    props.toggleDropdown();
                  }}
                  name={option.name}
                  lineBreak={
                    index ==
                    blocks[props.miniDropdownProps.item.options].length - 1
                  }
                />
              )
            )}
          </>
        )}
      </Dropdown>
    </>
  );
}

export default MiniDropdownExtras;
