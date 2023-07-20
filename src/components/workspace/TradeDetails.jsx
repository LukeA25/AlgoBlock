import Dropdown from "../Dropdown";
import { useEffect, useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import DropdownButton from "../DropdownButton";
import Popup from "../Popup";
import IndicatorMiniDropdown from "./IndicatorMiniDropdown";
import IndicatorInputValue from "./IndicatorInputValue";
import blocks from "../../blocks.json";

function TradeDetails(props) {
  const [stopLossDropdown, setStopLossDropdown] = useState(false);
  const [indicatorDropdown, setIndicatorDropdown] = useState(false);
  const [miniIndicatorDropdown, setMiniIndicatorDropdown] = useState(false);
  const [miniButtonDisabled, setMiniButtonDisabled] = useState(false);
  const [indicatorPopupActive, setIndicatorPopupActive] = useState(false);

  const [error, setError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [stopLossError, setStopLossError] = useState("");
  const [riskRewardError, setRiskRewardError] = useState("");

  const [typeDropdown, setTypeDropdown] = useState(false);
  const [riskDropdown, setRiskDropdown] = useState(false);
//   const [riskNum, setRiskNum] = useState(
//     props.strategy.details.riskManagement
//       ? props.strategy.details.riskManagement.value
//       : 1
//   );
//   const [riskManagementError, setRiskManagementError] = useState("");
//   const [riskManagementDisabled, setRiskManagementDisabled] = useState(false);
  const [quantity, setQuantity] = useState(
    props.strategy.details.orderQuantity
  );
  const [riskReward, setRiskReward] = useState(
    props.strategy.details.riskReward
  );

  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef();
  const [disabled, setDisabled] = useState(false);
  const [currentNum, setNum] = useState(
    props.strategy.details.stopLoss ? props.strategy.details.stopLoss.value : 1
  );

  const typeRef = useRef();
  const [typeTop, setTypeTop] = useState(0.0);
  const [typeLeft, setTypeLeft] = useState(0.0);
  const riskManagementRef = useRef();
//   const [riskManagementTop, setRiskManagementTop] = useState(0.0);
//   const [riskManagementLeft, setRiskManagementLeft] = useState(0.0);
  const stopLossRef = useRef();
  const [stopLossTop, setStopLossTop] = useState(0.0);
  const [stopLossLeft, setStopLossLeft] = useState(0.0);

  function toggleStopLossDropdown() {
    setStopLossDropdown(!stopLossDropdown);
  }

  function toggleTypeDropdown() {
    setTypeDropdown(!typeDropdown);
  }

  function toggleIndicatorDropdown() {
    setIndicatorDropdown(!indicatorDropdown);
  }

  function toggleMiniIndicatorDropdown() {
    setMiniIndicatorDropdown(!miniIndicatorDropdown);
  }

//   function toggleRiskDropdown() {
//     setRiskDropdown(!riskDropdown);
//   }

  function toggleIndicatorPopup() {
    setError("");
    setIndicatorPopupActive(!indicatorPopupActive);
  }

//   function riskNumChangeHandler(event) {
//     const newValue = event.target.value;
//     setRiskNum(newValue);
//     console.log(newValue);
//     if (newValue > 0) {
//       if (
//         props.strategy.details.riskManagement.title ===
//         "Percentage of Portfolio"
//       ) {
//         setRiskManagementError("");
//         props.strategy.details.riskManagement.value = newValue;
//         props.updateStrategy();
//       } else {
//         if (/^\d*$/.test(newValue)) {
//           setRiskManagementError("");
//           props.strategy.details.riskManagement.value = newValue;
//           props.updateStrategy();
//         } else {
//           setRiskManagementError("Please enter a whole number.");
//         }
//       }
//     } else {
//       setRiskManagementError("Please enter a value greater than 0.");
//     }
//   }

  function changeHandler(event) {
    const newValue = event.target.value;
    setNum(newValue);
    if (newValue > 0) {
      if (props.strategy.details.stopLoss.type === "ATR Multiple") {
        setStopLossError("");
        props.strategy.details.stopLoss.value = newValue;
        props.updateStrategy();
      } else {
        if (/^\d*$/.test(newValue)) {
          setStopLossError("");
          props.strategy.details.stopLoss.value = newValue;
          props.updateStrategy();
        } else {
          setStopLossError("Please enter a whole number.");
        }
      }
    } else {
      setStopLossError("Please enter a value greater than 0.");
    }
  }

  function restoreDefaults() {
    const inputs = props.strategy.details.stopLoss.value.inputs;

    inputs.forEach((input) => {
      if (typeof input !== "string") {
        const newValue = input.defaultValue;
        input.value = newValue;
      }
    });
    toggleIndicatorPopup();
    props.updateStrategy();
  }

  function submitHandler(event) {
    event.preventDefault();
    toggleIndicatorPopup();
    props.updateStrategy();
  }

  useEffect(() => {
    setTypeLeft(
      (typeRef.current.offsetLeft + typeRef.current.offsetWidth / 2) * 0.0625 -
        6
    );
    setTypeTop(
      (typeRef.current.offsetTop + typeRef.current.offsetHeight) * 0.0625
    );
    // setRiskManagementLeft(
    //   (riskManagementRef.current.offsetLeft +
    //     riskManagementRef.current.offsetWidth / 2) *
    //     0.0625 -
    //     6
    // );
    // setRiskManagementTop(
    //   (riskManagementRef.current.offsetTop +
    //     riskManagementRef.current.offsetHeight) *
    //     0.0625
    // );
    setStopLossLeft(
      (stopLossRef.current.offsetLeft + stopLossRef.current.offsetWidth / 2) *
        0.0625 -
        6
    );
    setStopLossTop(
      (stopLossRef.current.offsetTop + stopLossRef.current.offsetHeight) *
        0.0625
    );
  }, [typeRef, riskManagementRef, stopLossRef, props.updateStrategy]);

  return (
    <div className="w-5/6 flex flex-col justify-between gap-4 mt-4 border-2 border-white rounded-lg bg-shaded-500 m-auto text-white p-4">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold flex-grow">Order Type:</p>
        <div
          ref={typeRef}
          onClick={toggleTypeDropdown}
          className={`rounded-lg flex justify-between items-center border-2 border-white duration-300 cursor-pointer origin-bottom
           ${
             props.strategy.details.orderType
               ? "bg-green-600 hover:bg-green-500 active:bg-green-800"
               : "bg-gray-600 hover:bg-gray-500 active:bg-gray-800"
           }`}
        >
          {props.strategy.details.orderType ? (
            <div className="flex flex-col items-center justify-center">
              <h3 className="leading-tight text-xl flex-grow py-2 px-4 font-semibold">
                {props.strategy.details.orderType}
              </h3>
            </div>
          ) : (
            <p className="leading-tight text-lg flex-grow py-2 px-4">
              Select Order Type
            </p>
          )}
          <AiFillCaretDown color="white" size="30" />
        </div>
        <Dropdown
          isDropdownActive={typeDropdown}
          toggleDropdown={toggleTypeDropdown}
          left={typeLeft + "rem"}
          top={typeTop}
        >
          <DropdownButton
            onClick={() => {
              props.strategy.details.orderType = "Buy Long";
              toggleTypeDropdown();
              props.updateStrategy();
            }}
            name="Buy Long"
            lineBreak={false}
          />
          <DropdownButton
            onClick={() => {
              props.strategy.details.orderType = "Buy Short";
              toggleTypeDropdown();
              props.updateStrategy();
            }}
            name="Buy Short"
            lineBreak={true}
          />
        </Dropdown>
      </div>
      <hr className="w-full" />
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold flex-grow">Order Quantity:</p>
        <div className="flex flex-col items-end">
          <input
            value={quantity}
            onChange={(event) => {
              setQuantity(event.target.value);
              if (/^\d*$/.test(event.target.value)) {
                setQuantityError("");
                props.strategy.details.orderQuantity = event.target.value;
                props.updateStrategy();
              } else {
                setQuantityError("Please enter a whole number.");
              }
            }}
            className="h-8 bg-green-600 hover:bg-green-400 active:bg-green-700 border-white text-white border-2 rounded-md w-20 text-xl font-semibold px-1 py-4 duration-300"
            type="number"
          />
          {quantityError && <p className="text-red-600">{quantityError}</p>}
        </div>
      </div>
      <hr className="w-full" />
      {/* <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold flex-grow">Risk Management:</p>
        <div className="flex flex-col items-end">
          <div
            ref={riskManagementRef}
            onClick={riskManagementDisabled ? undefined : toggleRiskDropdown}
            className={`rounded-lg flex justify-between items-center border-2 border-white duration-300 cursor-pointer
           ${
             props.strategy.details.riskManagement
               ? `bg-green-600 ${
                   !riskManagementDisabled &&
                   "hover:bg-green-500 active:bg-green-800"
                 }`
               : "bg-gray-600 hover:bg-gray-500 active:bg-gray-800"
           }`}
          >
            {props.strategy.details.riskManagement ? (
              <div className="flex flex-col items-center justify-center">
                <h3 className="leading-tight text-xl flex-grow py-2 px-4 font-semibold">
                  {props.strategy.details.riskManagement.title}
                </h3>
                <div className="flex items-center gap-2 pb-2 px-2">
                  <input
                    onMouseEnter={() => setRiskManagementDisabled(true)}
                    onMouseLeave={() => setRiskManagementDisabled(false)}
                    value={riskNum}
                    onChange={riskNumChangeHandler}
                    className={`h-8 ${
                      riskNum
                        ? "bg-green-600 hover:bg-green-400 active:bg-green-700 border-white text-white"
                        : "bg-white border-gray-700 text-black"
                    } border-2 rounded-md w-20 p-1 duration-300`}
                    type="number"
                  />
                  <p className="font-semibold">
                    {props.strategy.details.riskManagement.prompt}
                  </p>
                </div>
              </div>
            ) : (
              <p className="leading-tight text-lg flex-grow py-2 px-4">None</p>
            )}
            <AiFillCaretDown color="white" size="30" />
          </div>
          {riskManagementError && (
            <p className="text-red-600">{riskManagementError}</p>
          )}
        </div>
        <Dropdown
          isDropdownActive={riskDropdown}
          toggleDropdown={toggleRiskDropdown}
          left={riskManagementLeft + "rem"}
          top={riskManagementTop}
        >
          <DropdownButton
            onClick={() => {
              props.strategy.details.riskManagement = {
                prompt: " trade(s) at a time.",
                title: "Limit on Open Trades",
                value: 1,
              };
              toggleRiskDropdown();
              setRiskNum(1);
              setRiskManagementError("");
              props.updateStrategy();
            }}
            name="Limit on Open Trades"
            lineBreak={false}
          />
          <DropdownButton
            onClick={() => {
              props.strategy.details.riskManagement = {
                prompt: "% of portfolio can be used.",
                title: "Percentage of Portfolio",
                value: 10,
              };
              toggleRiskDropdown();
              setRiskNum(10);
              setRiskManagementError("");
              props.updateStrategy();
            }}
            name="Percentage of Portfolio"
            lineBreak={false}
          />
          <DropdownButton
            onClick={() => {
              props.strategy.details.riskManagement = {
                prompt: " trade(s) per day.",
                title: "Limit on Trades per Day",
                value: 1,
              };
              toggleRiskDropdown();
              setRiskNum(1);
              setRiskManagementError("");
              props.updateStrategy();
            }}
            name="Limit on Trades per Day"
            lineBreak={false}
          />
          <DropdownButton
            onClick={() => {
              props.strategy.details.riskManagement = null;
              toggleRiskDropdown();
              setRiskManagementError("");
              props.updateStrategy();
            }}
            name="None"
            lineBreak={true}
          />
        </Dropdown>
      </div>
      <hr className="w-full" /> */}
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold flex-grow">Stop-Loss Price:</p>
        <div className="flex flex-col items-end">
          <div
            ref={stopLossRef}
            onClick={!disabled ? toggleStopLossDropdown : undefined}
            className={`rounded-lg flex justify-between items-center border-2 border-white duration-300 cursor-pointer
           ${
             props.strategy.details.stopLoss
               ? `bg-green-600 ${
                   !disabled && "hover:bg-green-500 active:bg-green-800"
                 }`
               : "bg-gray-600 hover:bg-gray-500 active:bg-gray-800"
           }`}
          >
            {props.strategy.details.stopLoss ? (
              <div className="flex flex-col items-center justify-center">
                <h3 className="leading-tight text-xl flex-grow py-2 px-4 font-semibold">
                  {props.strategy.details.stopLoss.type}
                </h3>
                {props.strategy.details.stopLoss.type !== "Indicator Price" ? (
                  <div className="flex items-center gap-2 pb-2 px-2">
                    <p className="font-semibold">
                      {props.strategy.details.stopLoss.prompt}
                    </p>
                    <input
                      onMouseEnter={() => setDisabled(true)}
                      onMouseLeave={() => setDisabled(false)}
                      value={currentNum}
                      onChange={changeHandler}
                      className={`h-8 ${
                        currentNum
                          ? "bg-green-600 hover:bg-green-400 active:bg-green-700 border-white text-white"
                          : "bg-white border-gray-700 text-black"
                      } border-2 rounded-md w-20 p-1 duration-300`}
                      type="number"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 pb-2 px-2">
                      <div
                        onClick={
                          miniButtonDisabled
                            ? undefined
                            : toggleIndicatorDropdown
                        }
                        onMouseEnter={() => setDisabled(true)}
                        onMouseLeave={() => setDisabled(false)}
                        className={`border-2 border-white rounded-md duration-300 max-w-[15rem] cursor-pointer ${
                          props.strategy.details.stopLoss.value
                            ? `bg-shaded-500 ${
                                !miniButtonDisabled &&
                                "hover:bg-shaded-250 active:bg-shaded-750"
                              }`
                            : "bg-gray-600 hover:bg-gray-400 active:bg-gray-700"
                        }`}
                      >
                        {props.strategy.details.stopLoss.value ? (
                          <div className="flex justify-between items-center gap-2 pl-2">
                            <IndicatorMiniDropdown
                              toggleDropdown={toggleMiniIndicatorDropdown}
                              setDisabled={setMiniButtonDisabled}
                              indicator={props.strategy.details.stopLoss.value}
                              togglePopup={toggleIndicatorPopup}
                              searchValue={searchValue}
                            />
                          </div>
                        ) : (
                          <div className="flex gap-2 px-2 py-1 items-center">
                            <p>{props.strategy.details.stopLoss.prompt}</p>
                            <AiFillCaretDown size="30" color="white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="leading-tight text-lg flex-grow py-2 px-4">
                Select Stop-Loss
              </p>
            )}
            <AiFillCaretDown color="white" size="30" />
          </div>
          {stopLossError && <p className="text-red-600">{stopLossError}</p>}
        </div>
        {props.strategy.details.stopLoss &&
          props.strategy.details.stopLoss.type === "Indicator Price" && (
            <>
              <Dropdown
                isDropdownActive={indicatorDropdown}
                toggleDropdown={toggleIndicatorDropdown}
                left={stopLossLeft + "rem"}
                top={stopLossTop}
              >
                <li key="search" className="px-2 pt-1 pb-2">
                  <input
                    type="search"
                    ref={searchRef}
                    onChange={() => setSearchValue(searchRef.current.value)}
                    placeholder="Search"
                    className="px-1 w-full rounded-md mx-auto active:bg-gray-400 duration-300 text-black border-2 border-gray-700"
                  />
                </li>
                <hr />
                {blocks["indicators"].map((indicator, index) => (
                  <DropdownButton
                    searchValue={searchValue}
                    onClick={() => {
                      props.strategy.details.stopLoss.value = indicator;
                      props.updateStrategy();
                      toggleIndicatorDropdown();
                    }}
                    name={indicator.name}
                    lineBreak={index == blocks["indicators"].length - 1}
                  />
                ))}
              </Dropdown>
              {props.strategy.details.stopLoss.value &&
                props.strategy.details.stopLoss.value.inputs && (
                  <Popup
                    toggle={toggleIndicatorPopup}
                    getActive={indicatorPopupActive}
                    title={
                      <p>
                        Settings for{" "}
                        <b className="font-semibold text-green-600">
                          {props.strategy.details.stopLoss.value.name}
                        </b>
                      </p>
                    }
                  >
                    <form onSubmit={submitHandler}>
                      {props.strategy.details.stopLoss.value.inputs.map(
                        (input, index) =>
                          typeof input !== "string" && (
                            <>
                              <div className="flex justify-between items-center py-2">
                                <h3 className="text-black text-xl">
                                  {input.name + ":"}
                                </h3>
                                <IndicatorInputValue
                                  path="details.stopLoss.value"
                                  index={index}
                                  value={input.value}
                                  setError={setError}
                                  updateStrategy={props.updateStrategy}
                                />
                              </div>
                              <hr className="border-black" />
                            </>
                          )
                      )}
                      {error && <p className="text-red-600 w-full text-center">{error}</p>}
                      <button
                        onClick={restoreDefaults}
                        type="button"
                        className="text-md w-full font-semibold pt-2 hover:cursor-pointer text-green-600 hover:text-green-500 active:text-green-700 duration-300"
                      >
                        Restore Defaults
                      </button>
                      <div className="flex gap-8 mt-4">
                        <button className="w-48 h-12 m-auto bg-green-600 hover:bg-green-500 active:bg-green-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-2xl font-semibold">
                          Confirm
                        </button>
                      </div>
                    </form>
                  </Popup>
                )}
              {props.strategy.details.stopLoss.value &&
                props.strategy.details.stopLoss.value.outputs && (
                  <Dropdown
                    isDropdownActive={miniIndicatorDropdown}
                    toggleDropdown={toggleMiniIndicatorDropdown}
                    left={stopLossLeft + "rem"}
                    top={stopLossTop}
                  >
                    {props.strategy.details.stopLoss.value.outputs.map(
                      (output, index) => (
                        <DropdownButton
                          searchValue={searchValue}
                          onClick={() => {
                            props.strategy.details.stopLoss.value.activeOutput =
                              output.displayName;
                            props.updateStrategy();
                            toggleMiniIndicatorDropdown();
                          }}
                          name={output.displayName}
                          lineBreak={
                            index ==
                            props.strategy.details.stopLoss.value.outputs
                              .length -
                              1
                          }
                        />
                      )
                    )}
                  </Dropdown>
                )}
            </>
          )}
        <Dropdown
          isDropdownActive={stopLossDropdown}
          toggleDropdown={toggleStopLossDropdown}
          left={stopLossLeft + "rem"}
          top={stopLossTop}
        >
          <DropdownButton
            onClick={() => {
              props.strategy.details.stopLoss = {
                type: "ATR Multiple",
                value: 1,
                prompt: "Multiple:",
              };
              setNum(1);
              toggleStopLossDropdown();
              props.updateStrategy();
            }}
            name="ATR Multiple"
            lineBreak={false}
          />
          <DropdownButton
            onClick={() => {
              props.strategy.details.stopLoss = {
                type: "Swing Low/High",
                value: 1,
                prompt: "Lowest/Highest of X Previous Candles:",
              };
              setNum(1);
              toggleStopLossDropdown();
              props.updateStrategy();
            }}
            name="Swing Low/High"
            lineBreak={false}
          />
          <DropdownButton
            onClick={() => {
              props.strategy.details.stopLoss = {
                type: "Indicator Price",
                prompt: "Choose Indicator",
              };
              setError("");
              toggleStopLossDropdown();
              props.updateStrategy();
            }}
            name="Indicator Price"
            lineBreak={false}
          />
          <DropdownButton
            onClick={() => {
              props.strategy.details.stopLoss = {
                type: "Previous Candles",
                value: 1,
                prompt: "Number of Candles:",
              };
              setNum(1);
              setError("");
              toggleStopLossDropdown();
              props.updateStrategy();
            }}
            name="Previous Candles"
            lineBreak={true}
          />
        </Dropdown>
      </div>
      <hr className="w-full" />
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold flex-grow">Risk/Reward Ratio:</p>
        <div className="flex flex-col items-end">
          <div className="flex items-center">
            <p className="text-white text-xl font-semibold pr-2">1 :</p>
            <input
              value={riskReward}
              onChange={(event) => {
                setRiskReward(event.target.value);
                if (event.target.value > 0) {
                  setRiskRewardError("");
                  props.strategy.details.riskReward = event.target.value;
                  props.updateStrategy();
                } else {
                  setRiskRewardError("Please enter a positive number.");
                }
              }}
              className="h-8 bg-green-600 hover:bg-green-400 active:bg-green-700 border-white text-white border-2 rounded-md w-20 text-xl font-semibold px-1 py-4 duration-300"
              type="number"
            />
          </div>
          {riskRewardError && <p className="text-red-600">{riskRewardError}</p>}
        </div>
      </div>
    </div>
  );
}

export default TradeDetails;
