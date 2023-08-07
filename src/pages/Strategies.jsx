import { MdOutlineAddCircleOutline, MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { BiDownload } from "react-icons/bi";

import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Popup from "../components/Popup";
import { useUserContext } from "../components/UserContext";
import { useStrategyContext } from "../components/strategyContext";
import AlgoBlockPlusPopup from "../components/AlgoBlockPlusPopup";
import ReactPixel from "react-facebook-pixel";
import axios from "axios";

function Strategies() {
  const [isNewStratActive, setNewStratActive] = useState(false);
  const strategyNameRef = useRef();
  const { currentUser, getFreeStrategy, getSubscriptionId } = useUserContext();
  const {
    newStrategy,
    setStrategy,
    getUserStrategies,
    setStrategyKey,
    deleteStrategy,
    checkStrategy,
  } = useStrategyContext();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedStrategies, setLoadedStrategies] = useState([]);
  const [isDeleteStratActive, setIsDeleteStratActive] = useState(false);
  const [deleteName, setDeleteName] = useState("");
  const [formValue, setFormValue] = useState("");
  const [createStratError, setCreateStratError] = useState("");
  const [strategyError, setStrategyError] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [plusPopup, setPlusPopup] = useState(false);
  const navigate = useNavigate();

  function toggleStratActive() {
    setCreateStratError("");
    setNewStratActive(!isNewStratActive);
  }

  function togglePlusPopup() {
    setPlusPopup(!plusPopup);
  }

  function toggleDeleteStratActive() {
    setIsDeleteStratActive(!isDeleteStratActive);
  }

  function submitHandler(event) {
    event.preventDefault();
    newStrategy(strategyNameRef.current.value);
    toggleStratActive();
    setFormValue("");
  }

  useEffect(() => {
    async function fetchStrategies() {
      try {
        const strategies = await getUserStrategies();
        setLoadedStrategies(strategies);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching strategies:", error);
        setIsLoading(false);
      }
    }

    async function getSubscribed() {
      const subscriptionId = await getSubscriptionId();
      if (subscriptionId) {
        const response = await axios.post("https://algoblock-backend-5df4fb859f35.herokuapp.com/get-subscription-info", {
          subscriptionId: subscriptionId,
        });

        if (!response.data.canceled) {
          setSubscribed(true);
          return;
        }
      }
      setSubscribed(false);
    }

    fetchStrategies();
    if (!checked) {
      getSubscribed();
      setChecked(true);
    }
  }, [deleteHandler, submitHandler]);

  function deleteHandler(event) {
    event.preventDefault();
    deleteStrategy();
    toggleDeleteStratActive();
  }

  if (!currentUser) {
    return (
      <div className="w-screen min-h-[calc(100vh-12.6rem)] sm:min-h-[calc(100vh-13.6rem)] relative pt-20">
        <h1 className="text-white text-6xl sm:text-7xl text-center font-semibold pt-20">
          Oops...
        </h1>
        <h3 className="text-white text-3xl sm:text-5xl text-center pt-6 m-auto w-2/3">
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

  return (
    <motion.div
      className="relative pt-20 min-h-[calc(100vh-13.6rem)]" /*initial={{width: 0}} animate={{width: "100%"}} exit={{x: window.innerWidth, transition: {duration: 0.1}}}*/
    >
      <div>
        <div
          className={`w-72 sm:w-[28rem] sm:h-12 fixed bg-gray-700 z-50 rounded-3xl sm:rounded-full left-[calc(50vw-9rem)] sm:left-[calc(50vw-14rem)] top-32 p-4 duration-500 flex justify-center items-center text-white text-xl ${
            !strategyError && "scale-x-50 scale-y-0 -translate-y-[8rem]"
          }`}
        >
          Please finish the strategy before downloading!
        </div>
        <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 h-16 sm:h-24 font-semibold text-5xl sm:text-7xl text-center relative top-8">
          Strategies
        </h1>
        <div className="rounded-3xl w-3/4 sm:w-5/6 mx-auto relative top-16 bg-shaded-500 border-white border-2 p-[2.25rem] sm:p-16 mb-36">
          {isLoading ? (
            <h2 className="text-5xl text-white font-semibold m-auto">
              Loading...
            </h2>
          ) : (
            <ul className="flex gap-10 flex-wrap">
              {loadedStrategies &&
                loadedStrategies.map((strategy) => (
                  <li key={strategy.name}>
                    <div
                      id={strategy.name}
                      className="rounded-xl h-56 w-56 sm:h-64 sm:w-64 bg-green-600 border-4 border-white group"
                    >
                      <div className="h-full w-full flex justify-center items-center flex-col">
                        <h2 className="text-white text-center text-2xl sm:text-3xl font-semibold w-full px-1">
                          {strategy.name}
                        </h2>
                        <h3 className="text-gray-300 text-center text-lg sm:text-xl">
                          {strategy.creator}
                        </h3>
                      </div>
                      <div className="w-full h-full relative -top-full rounded-lg bg-shaded-500 opacity-0 group-hover:opacity-100 duration-300 flex flex-col gap-4 py-[10%]">
                        <Link
                          to="/workspace"
                          onClick={() => {
                            const { id, ...strategyWithoutId } = strategy;
                            setStrategy(strategyWithoutId);
                            setStrategyKey(strategy.id);
                          }}
                          className="bg-shaded-500 w-20 h-20 sm:w-24 sm:h-24 m-auto rounded-md group active:bg-black active:opacity-80 hover:bg-shaded-750 duration-300 py-[7.5%] flex flex-col items-center"
                        >
                          <MdEdit size="30" color="white" />
                          <p className="text-white text-sm sm:text-lg">Edit</p>
                        </Link>
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={async () => {
                              const { id, ...strategyWithoutId } = strategy;
                              setStrategy(strategyWithoutId);
                              setStrategyKey(strategy.id);
                              const freeStrategy = await getFreeStrategy();
                              if (checkStrategy()) {
                                if (subscribed) {
                                  navigate("/scriptcopy", { replace: true });
                                } else if (freeStrategy) {
                                  await axios.post("https://algoblock-backend-5df4fb859f35.herokuapp.com/use-free-strategy", {
                                    uid: currentUser.uid,
                                  });
                                  ReactPixel.track("StartTrial");
                                  navigate("/scriptcopy", { replace: true });
                                } else {
                                  togglePlusPopup();
                                }
                              } else {
                                setStrategyError(true);
                                setTimeout(() => setStrategyError(false), 2000);
                              }
                            }}
                            className="bg-shaded-500 w-20 h-20 sm:w-24 sm:h-24 rounded-md group active:bg-black active:opacity-80 hover:bg-shaded-750 duration-300 py-[7.5%] flex flex-col items-center"
                          >
                            <BiDownload size="30" color="white" />
                            <p className="text-white text-sm sm:text-lg">
                              Download
                            </p>
                          </button>
                          <button
                            onClick={() => {
                              setDeleteName(strategy.name);
                              setStrategyKey(strategy.id);
                              toggleDeleteStratActive();
                            }}
                            className="bg-shaded-500 w-20 h-20 sm:w-24 sm:h-24 rounded-md active:bg-black active:opacity-80 hover:bg-shaded-750 duration-300 py-[7.5%] flex flex-col items-center"
                          >
                            <FaTrashAlt size="30" color="white" />
                            <p className="text-white text-sm sm:text-lg">
                              Delete
                            </p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              <li key="NewStratButton#&)@*^*)@^$&&">
                <button
                  className="rounded-xl h-56 w-56 sm:h-64 sm:w-64 bg-gray-600 border-4 border-white hover:bg-gray-500 active:bg-gray-800 transition-all duration-300"
                  onClick={toggleStratActive}
                  id="newStratButton"
                >
                  <MdOutlineAddCircleOutline
                    size="60"
                    color="white"
                    className="relative m-auto"
                  />
                  <h1 className="text-white text-center text-xl sm:text-3xl relative m-auto">
                    New Strategy
                  </h1>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
      <Popup
        toggle={toggleStratActive}
        getActive={isNewStratActive}
        title="New Strategy"
      >
        <form
          className="flex flex-col"
          onSubmit={submitHandler}
          id="stratNamePopup"
        >
          <label
            htmlFor="strat-name"
            className="text-lg sm:text-xl font-semibold"
          >
            Strategy Name
          </label>
          <input
            type="text"
            id="strat-name"
            className="border-black border-2 focus:border-[3px] bg-white focus:bg-green-100 transition-colors duration-300 mx-auto text-black w-full rounded-lg text-xl p-2 my-1 z-10"
            ref={strategyNameRef}
            onChange={(event) => {
              for (const i in loadedStrategies) {
                if (event.target.value === loadedStrategies[i].name) {
                  setCreateStratError("Please enter a unique strategy name.");
                  return;
                }
              }
              setCreateStratError("");
              setFormValue(event.target.value);
            }}
            value={formValue}
            required
          />
          {createStratError && (
            <p className="text-red-600 text-center">{createStratError}</p>
          )}
          <div className="flex gap-8 mt-8">
            <button
              type="button"
              className="w-48  h-12 m-auto bg-gray-600 hover:bg-gray-500 active:bg-gray-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-xl sm:text-2xl font-semibold"
              onClick={toggleStratActive}
            >
              Cancel
            </button>
            <button
              id="stratNameSubmitButton"
              className="w-48 h-12 m-auto bg-green-600 hover:bg-green-500 active:bg-green-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-xl sm:text-2xl font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </Popup>
      <Popup
        toggle={toggleDeleteStratActive}
        getActive={isDeleteStratActive}
        title="Are you sure?"
      >
        <p className="text-black text-lg sm:text-xl">
          Are you sure you want to delete <b>{deleteName}</b>? <br />
          This action cannot be undone.
        </p>
        <form onSubmit={deleteHandler}>
          <div className="flex gap-8 mt-8">
            <button
              type="button"
              className="w-48  h-12 m-auto bg-gray-600 hover:bg-gray-500 active:bg-gray-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-xl sm:text-2xl font-semibold"
              onClick={toggleDeleteStratActive}
            >
              Cancel
            </button>
            <button className="w-48 h-12 m-auto bg-green-600 hover:bg-green-500 active:bg-green-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-xl sm:text-2xl font-semibold">
              Confirm
            </button>
          </div>
        </form>
      </Popup>
      {/* {!tutorialCompleted && (
        <Popup
          toggle={toggleTutorialQuestion}
          getActive={tutorialQuestion}
          title="Learn the Ropes"
        >
          <p className="text-black text-xl text-center">
            Would you like to try the tutorial and learn how it works?
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setTutorialActive(true);
              toggleTutorialQuestion();
            }}
          >
            <div className="flex items-center justify-center gap-2 mt-4">
              <input
                className="hover:cursor-pointer"
                type="checkbox"
                value={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <p>Don't ask me again</p>
            </div>
            <div className="flex gap-8 mt-4">
              <button
                type="button"
                className="w-48  h-12 m-auto bg-gray-600 hover:bg-gray-500 active:bg-gray-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-2xl font-semibold"
                onClick={() => {
                  toggleTutorialQuestion();
                  if (isChecked) {
                    setTutorialCompleted(true);
                  }
                }}
              >
                No Thanks
              </button>
              <button className="w-48 h-12 m-auto bg-green-600 hover:bg-green-500 active:bg-green-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-2xl font-semibold">
                Sure!
              </button>
            </div>
          </form>
        </Popup>
      )}
      {tutorialActive && (
        <StrategyTutorial
          id={["newStratButton", "stratNamePopup", tutorialName]}
        />
      )} */}
      <AlgoBlockPlusPopup toggle={togglePlusPopup} getActive={plusPopup} />
    </motion.div>
  );
}

export default Strategies;
