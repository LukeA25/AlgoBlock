import { useContext, useEffect, useState, useRef } from "react";
import UserContext from "../components/UserContext";
import { motion } from "framer-motion";
import InputButton from "../components/workspace/InputButton";
import TriggerDropdown from "../components/workspace/TriggerDropdown";

import { MdOutlineAddCircleOutline } from "react-icons/md";
import { AiFillCaretDown, AiOutlineLoading } from "react-icons/ai";
import ConditionDropdown from "../components/workspace/ConditionDropdown";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import TradeDetails from "../components/workspace/TradeDetails";
import StrategyContext from "../components/strategyContext";

function Workspace() {
  const { currentStrategy } = useContext(UserContext);
  const { strategy, setStrategy, updateStrategy, disregardChanges } =
    useContext(StrategyContext);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStrategyChanged, setHasStrategyChanged] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const dropdownRef = useRef();
  const [dropdownLeft, setDropdownLeft] = useState(0.0);
  const [dropdownTop, setDropdownTop] = useState(0.0);

  const sellDropdownRef = useRef();
  const [sellDropdownLeft, setSellDropdownLeft] = useState(0.0);
  const [sellDropdownTop, setSellDropdownTop] = useState(0.0);

  const [isTriggerDropdownActive, setIsTriggerDropdownActive] = useState(false);
  const [isConditionDropdownActive, setIsConditionDropdownActive] =
    useState(false);
  const [isSellConditionDropdownActive, setIsSellConditionDropdownActive] =
    useState(false);

  useEffect(() => {
    if (isLoading) {
      if (strategy.name) {
        setIsLoading(false);
      }
    }

    if (!isLoading) {
      setDropdownLeft(dropdownRef.current.offsetLeft * 0.0625);
      setDropdownTop(dropdownRef.current.offsetTop * 0.0625 + 4);
      setSellDropdownLeft(sellDropdownRef.current.offsetLeft * 0.0625);
      setSellDropdownTop(sellDropdownRef.current.offsetTop * 0.0625 + 4);
    }
  }, [dropdownRef, sellDropdownRef, isLoading, updateStrategy]);

  function disregardStrategyChanges() {
    setIsUpdateLoading(true);
    disregardChanges().then(() => {
      setHasStrategyChanged(false);
      setIsUpdateLoading(false);
    });
  }

  function saveStrategyChanges() {
    setIsUpdateLoading(true);
    updateStrategy().then(() => {
      setHasStrategyChanged(false);
      setIsUpdateLoading(false);
    });
  }

  function toggleTriggerDropdown() {
    setIsTriggerDropdownActive(!isTriggerDropdownActive);
  }

  function toggleSellConditionsDropdown() {
    setIsSellConditionDropdownActive(!isSellConditionDropdownActive);
  }

  function toggleConditionsDropdown() {
    setIsConditionDropdownActive(!isConditionDropdownActive);
  }

  if (!strategy.name) {
    return (
      <div className="w-screen h-[calc(100vh-13.6rem)] relative pt-20">
        <h1 className="text-white text-7xl text-center font-semibold pt-20">
          Oops...
        </h1>
        <h3 className="text-white text-5xl text-center pt-6 m-auto w-2/3">
          You're not supposed to be here yet. Visit the{" "}
          <Link
            to="/"
            replace
            className="font-semibold text-green-600 hover:text-green-500 active:text-green-800 duration-300"
          >
            home page
          </Link>{" "}
          instead.
        </h3>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-screen h-screen relative pt-20">
        <h1 className="text-white text-7xl text-center font-semibold pt-20">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <motion.div
      className="pb-20 relative pt-20" /*initial={{width: 0 border-2 border-white}} animate={{width: "100%"}} exit={{x: window.innerWidth, transition: {duration: 0 border-2 border-white.1}}}*/
    >
      <div className="flex items-center justify-center mt-8 gap-4 bg-green-600 w-fit m-auto px-8 pt-4 rounded-lg border-4 border-white">
        <h1 className="text-white w-fit h-20 font-semibold text-6xl text-center">
          {strategy.name}
        </h1>
      </div>

      <div
        className={`w-2/3 h-16 fixed bg-gray-700 z-50 rounded-xl left-[16.67%] top-32 flex items-center justify-between p-4 duration-500 ${
          !hasStrategyChanged && "scale-x-50 scale-y-0 -translate-y-[8rem]"
        }`}
      >
        <h1 className="text-white text-xl">You have unsaved changes.</h1>
        {isUpdateLoading ? (
          <AiOutlineLoading
            size="24"
            color="white"
            className="animate-spin"
          />
        ) : (
          <div className="flex gap-4">
            <button
              onClick={disregardStrategyChanges}
              className="text-gray-200 hover:text-white active:text-gray-500 duration-300"
            >
              Disregard Changes
            </button>
            <button
              onClick={saveStrategyChanges}
              className="text-white text-md w-36 h-10 rounded-md border-2 border-white bg-green-600 hover:bg-green-400 active:bg-green-700 duration-300"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <section
        id="workspace"
        className="w-[75vw] border-2 border-white rounded-xl bg-shaded-750 p-10 mt-8 ml-[12.5vw] z-10"
      >
        <article className="w-96 border-2 boder-white rounded-xl bg-shaded-750 p-4 mx-auto">
          <h1 className="text-white text-center text-3xl mb-4 font-semibold">
            Trigger
          </h1>
          <hr className="w-4/5 m-auto" />
          {strategy?.trigger ? (
            <div className="flex">
              <InputButton
                strategy={strategy}
                object={strategy.trigger}
                toggleDropdown={toggleTriggerDropdown}
                auto="m-auto"
                updateStrategy={() => setHasStrategyChanged(true)}
                path="trigger"
                dropdown={
                  <TriggerDropdown
                    toggleDropdown={toggleTriggerDropdown}
                    isTriggerDropdownActive={isTriggerDropdownActive}
                    cond={strategy}
                    updateStrategy={() => setHasStrategyChanged(true)}
                  />
                }
              />
            </div>
          ) : (
            <button
              onClick={toggleTriggerDropdown}
              id="selectTrigger"
              className="w-56 h-16 mt-4 border-2 border-white rounded-lg bg-gray-600 m-auto text-white flex justify-center gap-4 items-center hover:cursor-pointer hover:bg-gray-500 active:bg-gray-800 duration-300"
            >
              <p className="text-lg">Choose Trigger</p>
              <AiFillCaretDown size="40" color="white" />
              <TriggerDropdown
                updateStrategy={() => setHasStrategyChanged(true)}
                toggleDropdown={toggleTriggerDropdown}
                isTriggerDropdownActive={isTriggerDropdownActive}
              />
            </button>
          )}
        </article>

        <hr className="h-16 border-2 w-1 m-auto" />

        <article className="w-full border-2 border-white rounded-xl bg-shaded-750 p-4 mx-auto">
          <h1 className="text-white text-center text-3xl mb-4 font-semibold">
            Entry Conditions
          </h1>
          <hr className="w-4/5 m-auto" />
          <div className="w-full flex justify-around flex-wrap gap-4">
            {strategy.entryConditions &&
              strategy.entryConditions.map((condition, index) => (
                <InputButton
                  object={condition}
                  icon={<FaTrashAlt size="22" color="white" />}
                  index={index}
                  updateStrategy={() => setHasStrategyChanged(true)}
                  path={`entryConditions[${index}]`}
                />
              ))}
            <button
              ref={dropdownRef}
              onClick={toggleConditionsDropdown}
              className="max-w-[14rem] flex-grow h-16 border-2 mt-4 border-white rounded-lg bg-gray-600 text-white flex justify-center gap-2 items-center hover:cursor-pointer hover:bg-gray-500 active:bg-gray-800 duration-300 origin-bottom"
            >
              <p className="text-lg">Add Condition</p>
              <MdOutlineAddCircleOutline size="40" color="white" />
              <ConditionDropdown
                updateStrategy={() => setHasStrategyChanged(true)}
                toggleDropdown={toggleConditionsDropdown}
                isConditionDropdownActive={isConditionDropdownActive}
                cond={"entryConditions"}
                left={`left-[calc(${dropdownLeft}-5rem)]`}
                top={dropdownTop}
              />
            </button>
          </div>
        </article>

        <hr className="h-16 border-2 w-1 m-auto" />

        <article className="w-full border-2 border-white rounded-xl bg-shaded-750 p-4 mx-auto">
          <h1 className="text-white text-center text-3xl mb-4 font-semibold">
            Exit Conditions
          </h1>
          <hr className="w-4/5 m-auto" />
          <div className="w-full flex justify-around flex-wrap gap-4">
            {strategy.exitConditions &&
              strategy.exitConditions.map((exitCondition, index) => (
                <InputButton
                  updateStrategy={() => setHasStrategyChanged(true)}
                  strategy={strategy}
                  object={exitCondition}
                  icon={<FaTrashAlt size="22" color="white" />}
                  index={index}
                  setStrategy={setStrategy}
                  isSell={true}
                  path={`exitConditions[${index}]`}
                />
              ))}
            <button
              ref={sellDropdownRef}
              onClick={toggleSellConditionsDropdown}
              className="max-w-[14rem] flex-grow h-16 border-2 mt-4 border-white rounded-lg bg-gray-600 text-white flex justify-center gap-2 items-center hover:cursor-pointer hover:bg-gray-500 active:bg-gray-800 duration-300 origin-bottom"
            >
              <p className="text-lg">Add Condition</p>
              <MdOutlineAddCircleOutline size="40" color="white" />
              <ConditionDropdown
                updateStrategy={() => setHasStrategyChanged(true)}
                toggleDropdown={toggleSellConditionsDropdown}
                isConditionDropdownActive={isSellConditionDropdownActive}
                cond={"exitConditions"}
                left={`left-[calc(${sellDropdownLeft}-5rem)]`}
                top={sellDropdownTop}
              />
            </button>
          </div>
        </article>

        <hr className="h-16 border-2 w-1 m-auto" />

        <article className="w-full border-2 border-white rounded-xl bg-shaded-750 p-4 mx-auto">
          <h1 className="text-white text-center text-3xl mb-4 font-semibold">
            Details
          </h1>
          <hr className="w-4/5 m-auto" />
          {Object.keys(strategy).length != 0 && (
            <TradeDetails
              updateStrategy={() => setHasStrategyChanged(true)}
              strategy={strategy}
            />
          )}
        </article>
      </section>

      <div className="w-full flex justify-center">
        <Link
          to="/checkout"
          className="p-4 bg-green-600 border-2 border-white duration-300 hover:bg-green-500 active:bg-green-800 text-white text-4xl rounded-lg mt-16 font-semibold"
        >
          {"Download Strategy >"}
        </Link>
      </div>
      {/* <WorkspaceTutorial id={["selectTrigger", "Crossover"]} /> */}
    </motion.div>
  );
}

export default Workspace;
