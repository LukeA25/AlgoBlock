import { AiFillHome } from "react-icons/ai";
import { MdOutlineAddCircleOutline } from "react-icons/md";

import { motion } from "framer-motion";
import { useState, useRef, useContext } from "react";
import UserContext from "../components/UserContext";
import Popup from "../components/Popup";

function Strategies() {
  const [isNewStratActive, setNewStratActive] = useState(false);
  const strategyNameRef = useRef();
  const { userKey } = useContext(UserContext);

  function toggleStratActive() {
    setNewStratActive(!isNewStratActive);
  }

  function newStrategyHandler(strategyData) {
    fetch(
      "https://algoblock-4a1c4-default-rtdb.firebaseio.com/userData/" + userKey + "/strategies.json",
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

  return (
    <motion.div
      className="bg-gradient-to-r from-green-600 to-green-800 h-screen relative pt-20" /*initial={{width: 0}} animate={{width: "100%"}} exit={{x: window.innerWidth, transition: {duration: 0.1}}}*/
    >
      <div>
        <h1 className="text-white text-7xl text-center relative top-8">
          Workspace
        </h1>
        <div className="rounded-3xl h-[32rem] w-[80rem] mx-auto relative top-16 bg-shaded-500 border-white border-8 p-16">
          <button
            className="rounded-xl h-96 w-64 bg-shaded-750 border-4 border-white hover:bg-shaded-500 active:bg-black transition-all duration-300"
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
