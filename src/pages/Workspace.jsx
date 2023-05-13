import { useContext } from "react";
import UserContext from "../components/UserContext";
import { motion } from "framer-motion";

function Workspace() {
  const { currentStrategy } = useContext(UserContext);

  return (
    <motion.div
      className="h-screen relative pt-20" /*initial={{width: 0}} animate={{width: "100%"}} exit={{x: window.innerWidth, transition: {duration: 0.1}}}*/
    >
      <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 h-24 font-semibold text-7xl text-center relative top-8">
        {currentStrategy}
      </h1>
      <div className="w-64 rounded-xl bg-shaded-750 p-4 pb-8 mt-8">
        <h1 className="text-white text-center text-3xl mb-4 font-semibold">
          Variables
        </h1>
        <hr className="w-4/5 m-auto" />
        <div className="flex flex-col gap-4 h-[20rem] overflow-y-scroll pt-4">
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
      </div>
    </motion.div>
  );
}

export default Workspace;
