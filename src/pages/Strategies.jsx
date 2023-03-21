import { AiFillHome } from "react-icons/ai";
import { MdOutlineAddCircleOutline } from "react-icons/md";

import { motion } from "framer-motion";
import { useState } from "react";
import Popup from "../components/Popup";

function Workspace() {
  const [isNewStratActive, setNewStratActive] = useState(false);

  function toggleStratActive() {
    setNewStratActive(!isNewStratActive);
  }

  return (
    <motion.div
      className="bg-gradient-to-r from-green-600 to-green-800 h-screen relative top-20" /*initial={{width: 0}} animate={{width: "100%"}} exit={{x: window.innerWidth, transition: {duration: 0.1}}}*/
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
              size="80"
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
        <form>
          <input
            type="text"
            className="border-black border-4 bg-green-500 focus:bg-green-600 transition-all duration-300 m-auto text-white w-96 h-20 rounded-xl block relative top-20 text-3xl pl-2 py-2"
            required
          />
          <div className="flex relative top-32">
            <button
              type="button"
              className="w-48  h-12 m-auto bg-gray-600 hover:bg-gray-500 active:bg-gray-700 transition-all duration-300 border-black border-4 rounded-lg text-white text-2xl font-semibold"
              onClick={toggleStratActive}
            >
              Cancel
            </button>
            <button
              className="w-48 h-12 m-auto bg-green-600 hover:bg-green-500 active:bg-green-700 transition-all duration-300 border-black border-4 rounded-lg text-white text-2xl font-semibold"
              onClick={toggleStratActive}
            >
              Submit
            </button>
          </div>
        </form>
      </Popup>
    </motion.div>
  );
}

export default Workspace;
