import { useContext, useState } from "react";
import UserContext from "../components/UserContext";
import { motion } from "framer-motion";

import { AiFillCaretDown, AiOutlineBarChart } from "react-icons/ai";
import { BiCross } from "react-icons/bi";

function Workspace() {
  const { currentStrategy } = useContext(UserContext);
  const [isTriggerDropdownActive, setIsTriggerDropdownActive] = useState(false);

  function toggleTriggerDropdown() {
    setIsTriggerDropdownActive(!isTriggerDropdownActive);
  }

  return (
    <motion.div
      className="h-screen w-screen relative pt-20" /*initial={{width: 0}} animate={{width: "100%"}} exit={{x: window.innerWidth, transition: {duration: 0.1}}}*/
    >
      <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 h-24 font-semibold text-7xl text-center relative top-8">
        {currentStrategy}
      </h1>
      <div className="w-96 border-2 border-white rounded-xl bg-shaded-750 p-4 mt-8 mx-auto">
        <h1 className="text-white text-center text-3xl mb-4 font-semibold">
          Trigger
        </h1>
        <hr className="w-4/5 m-auto" />
        <div onClick={toggleTriggerDropdown} className="w-52 h-16 mt-4 border-2 border-white rounded-lg bg-gray-600 m-auto text-white flex justify-center gap-4 items-center hover:cursor-pointer hover:bg-gray-500 active:bg-gray-800 duration-300">
          <p className="text-lg">Choose Trigger</p>
          <AiFillCaretDown size="40" color="white" />
        </div>
        <div className={`w-40 text-lg text-white bg-gray-500 absolute top-72 h-40 left-[calc(50vw-5rem)] rounded-lg py-2 duration-300 overflow-y-scroll ${
          isTriggerDropdownActive
            ? "translate-y-20 scale-y-100"
            : "translate-y-0 scale-y-0"
        }`}>
          <ul>
            <li>
              <button className="w-full px-2 py-1 hover:bg-gray-400 active:bg-gray-600 duration-300 flex items-center gap-4 group">
                <BiCross size="50" color="white" />
                <p className="text-white">If-Cross</p>
                <div className="absolute w-10 h-10 bg-black text-white opacity-0 group-hover:opacity-100 delay-500 duration-300">Yoyo do this</div>
              </button>
            </li>
            <hr />
            <li>
              <button className="w-full px-2 py-1 hover:bg-gray-400 active:bg-gray-600 duration-300 flex items-center gap-4">
              <AiOutlineBarChart size="50" color="white" />
                <p className="text-white">If-Slope</p>
              </button>
            </li>
            <hr />
            <li>
              <button className="w-full px-2 py-1 text-left hover:bg-gray-400 active:bg-gray-600 duration-300">
                Subscription
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="w-64 rounded-xl bg-shaded-750 p-4 pb-8 mt-8">
        <h1 className="text-white text-center text-3xl mb-4 font-semibold">
          Variables
        </h1>
        <hr className="w-4/5 m-auto" />
        <div className="flex flex-col gap-4 h-[20rem] overflow-y-scroll pt-4 pl-4">
          <button className="w-3/4 h-20 bg-green-600 m-auto text-white text-center rounded-xl flex-shrink-0 hover:bg-green-500 active:bg-green-800 duration-300">
            Variable 1
          </button>
          <button className="w-3/4 h-20 bg-green-600 m-auto text-white text-center rounded-xl flex-shrink-0 hover:bg-green-500 active:bg-green-800 duration-300">
            Variable 2
          </button>
          <button className="w-3/4 h-20 bg-green-600 m-auto text-white text-center rounded-xl flex-shrink-0 hover:bg-green-500 active:bg-green-800 duration-300">
            Variable 3
          </button>
          <button className="w-3/4 h-20 bg-green-600 m-auto text-white text-center rounded-xl flex-shrink-0 hover:bg-green-500 active:bg-green-800 duration-300">
            Variable 4
          </button>
          <button className="w-3/4 h-20 bg-green-600 m-auto text-white text-center rounded-xl flex-shrink-0 hover:bg-green-500 active:bg-green-800 duration-300">
            Variable 5
          </button>
          <button className="w-3/4 h-20 bg-green-600 m-auto text-white text-center rounded-xl flex-shrink-0 hover:bg-green-500 active:bg-green-800 duration-300">
            Variable 6
          </button>
        </div>
      </div> */}
    </motion.div>
  );
}

export default Workspace;
