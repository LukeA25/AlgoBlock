import { MdOutlineAddCircleOutline } from "react-icons/md";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useContext } from "react";
import UserContext from "../components/UserContext";
import StrategyContext from "../components/StrategyContext";
import Popup from "../components/Popup";

function Strategies() {
  const [isNewStratActive, setNewStratActive] = useState(false);
  const strategyNameRef = useRef();
  const { userKey } = useContext(UserContext);
  // const { currentStrategy, setCurrentStrategy } = useContext(StrategyContext);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedStrategies, setLoadedStrategies] = useState([]);

  function toggleStratActive() {
    setNewStratActive(!isNewStratActive);
  }

  function newStrategyHandler(strategyData) {
    fetch(
      "https://algoblock-4a1c4-default-rtdb.firebaseio.com/userData/" +
        userKey +
        "/strategies.json",
      {
        method: "POST",
        body: JSON.stringify(strategyData),
        headers: {
          "Content-Type": "appliation/json",
        },
      }
    ).then(() => {
      toggleStratActive();
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    const strategyData = {
      name: strategyNameRef.current.value,
    };

    newStrategyHandler(strategyData);
  }

  useEffect(() => {
    fetch(
      "https://algoblock-4a1c4-default-rtdb.firebaseio.com/userData/" +
        userKey +
        "/strategies.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const strategies = [];

        for (const key in data) {
          const strategy = {
            id: key,
            ...data[key],
          };
          strategies.push(strategy);
        }

        setIsLoading(false);
        setLoadedStrategies(strategies);
      });
  });

  return (
    <motion.div
      className="h-screen relative pt-20" /*initial={{width: 0}} animate={{width: "100%"}} exit={{x: window.innerWidth, transition: {duration: 0.1}}}*/
    >
      <div>
        <p className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 h-24 font-semibold text-7xl text-center relative top-8">
          Strategies
        </p>
        <div className="rounded-3xl w-[calc(80rem+8px)] mx-auto relative top-16 bg-shaded-500 border-white border-8 p-16">
          {isLoading ? (
            <h2 className="text-4xl text-white m-auto">Loading...</h2>
          ) : (
            <ul className="flex gap-10 flex-wrap">
              {loadedStrategies.map((strategy) => (
                <button className="rounded-xl h-80 w-64 bg-green-600 border-4 border-white hover:bg-green-500 active:bg-green-900 transition-all duration-300">
                  <h2 className="text-white text-center text-3xl relative m-auto">
                    {strategy.name}
                  </h2>
                </button>
              ))}
              <button
                className="rounded-xl h-80 w-64 bg-gray-600 border-4 border-white hover:bg-gray-500 active:bg-gray-800 transition-all duration-300"
                onClick={toggleStratActive}
              >
                <MdOutlineAddCircleOutline
                  size="5rem"
                  color="white"
                  className="relative m-auto"
                />
                <h1 className="text-white text-center text-3xl relative m-auto">
                  New Strategy
                </h1>
              </button>
            </ul>
          )}
        </div>
      </div>
      <Popup
        toggle={toggleStratActive}
        getActive={isNewStratActive}
        title="New Strategy"
      >
        <form className="flex flex-col" onSubmit={submitHandler}>
          <label htmlFor="strat-name" className="text-xl font-semibold pt-2">
            Strategy Name
          </label>
          <input
            type="text"
            id="strat-name"
            className="border-black border-2 focus:border-[3px] bg-white focus:bg-green-100 transition-colors duration-300 mx-auto text-black w-96 h-16 rounded-lg text-xl pl-2 py-2 my-1 z-10"
            ref={strategyNameRef}
            required
          />
          <div className="flex gap-8 mt-8">
            <button
              type="button"
              className="w-48  h-12 m-auto bg-gray-600 hover:bg-gray-500 active:bg-gray-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-2xl font-semibold"
              onClick={toggleStratActive}
            >
              Cancel
            </button>
            <button className="w-48 h-12 m-auto bg-green-600 hover:bg-green-500 active:bg-green-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-2xl font-semibold">
              Submit
            </button>
          </div>
        </form>
      </Popup>
    </motion.div>
  );
}

export default Strategies;
