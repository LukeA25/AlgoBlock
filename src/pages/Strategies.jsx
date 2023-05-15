import { MdOutlineAddCircleOutline, MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import UserContext from "../components/UserContext";
import Popup from "../components/Popup";

function Strategies() {
  const [isNewStratActive, setNewStratActive] = useState(false);
  const strategyNameRef = useRef();
  const { userKey, setCurrentStrategy, username } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedStrategies, setLoadedStrategies] = useState([]);
  const [isDeleteStratActive, setIsDeleteStratActive] = useState(false);
  const [deleteName, setDeleteName] = useState("");
  const [deleteId, setDeleteId] = useState("");

  function toggleStratActive() {
    setNewStratActive(!isNewStratActive);
  }

  function toggleDeleteStratActive() {
    setIsDeleteStratActive(!isDeleteStratActive);
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

  function deleteStrategy(id) {
    fetch(
      "https://algoblock-4a1c4-default-rtdb.firebaseio.com/userData/" +
        userKey +
        "/strategies/" +
        id +
        ".json",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "appliation/json",
        },
      }
    );
    toggleDeleteStratActive();
  }

  function submitDeleteHandler(event) {
    event.preventDefault();
    deleteStrategy(deleteId);
  }

  return (
    <motion.div
      className="h-screen relative pt-20" /*initial={{width: 0}} animate={{width: "100%"}} exit={{x: window.innerWidth, transition: {duration: 0.1}}}*/
    >
      <div>
        <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 h-24 font-semibold text-7xl text-center relative top-8">
          Strategies
        </h1>
        <div className="rounded-3xl w-[80rem] mx-auto relative top-16 bg-shaded-500 border-white border-2 p-16">
          {isLoading ? (
            <h2 className="text-5xl text-white font-semibold m-auto">
              Loading...
            </h2>
          ) : (
            <ul className="flex gap-10 flex-wrap">
              {loadedStrategies.map((strategy) => (
                <div className="rounded-xl h-80 w-64 bg-green-600 border-4 border-white group">
                  <div className="h-full w-full flex justify-center items-center flex-col">
                    <h2 className="text-white text-center text-3xl font-semibold w-full px-1">
                      {strategy.name}
                    </h2>
                    <h3 className="text-gray-300 text-center text-xl">
                      {username}
                    </h3>
                  </div>
                  <div className="w-full h-full relative -top-full rounded-lg bg-shaded-500 opacity-0 group-hover:opacity-100 duration-300 flex flex-col py-[10%]">
                    <Link
                      to="/workspace"
                      onClick={() => setCurrentStrategy(strategy.name)}
                      className="bg-shaded-500 w-24 h-24 m-auto rounded-md group active:bg-black active:opacity-80 hover:bg-shaded-750 duration-300 py-[7.5%] flex flex-col items-center"
                    >
                      <MdEdit size="30" color="white" />
                      <p className="text-white text-lg">Edit</p>
                    </Link>
                    <button
                      onClick={() => {
                        setDeleteName(strategy.name);
                        setDeleteId(strategy.id);
                        toggleDeleteStratActive();
                      }}
                      className="bg-shaded-500 w-24 h-24 m-auto rounded-md active:bg-black active:opacity-80 hover:bg-shaded-750 duration-300 py-[7.5%] flex flex-col items-center"
                    >
                      <FaTrashAlt size="30" color="white" />
                      <p className="text-white text-lg">Delete</p>
                    </button>
                  </div>
                </div>
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
      <Popup
        toggle={toggleDeleteStratActive}
        getActive={isDeleteStratActive}
        title="Are you sure?"
      >
        <p className="text-black text-xl">
          Are you sure you want to delete <b>{deleteName}</b>? <br />
          This action cannot be undone.
        </p>
        <form
          onSubmit={submitDeleteHandler}
        >
          <div className="flex gap-8 mt-8">
            <button
              type="button"
              className="w-48  h-12 m-auto bg-gray-600 hover:bg-gray-500 active:bg-gray-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-2xl font-semibold"
              onClick={toggleDeleteStratActive}
            >
              Cancel
            </button>
            <button className="w-48 h-12 m-auto bg-green-600 hover:bg-green-500 active:bg-green-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-2xl font-semibold">
              Confirm
            </button>
          </div>
        </form>
      </Popup>
    </motion.div>
  );
}

export default Strategies;
