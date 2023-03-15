import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      className="bg-gradient-to-r from-gray-700 to-gray-600 h-screen"
      // initial={{backgroundColor: "white"}}
      // animate={{ backgroundColor: "grey"}}
      // exit={{ backgroundColor: "grey", transition: {duration: 2000}}}
    >
      <h1 className="text-white text-7xl relative left-64 top-64">AlgoBlock</h1>
    </motion.div>
  );
}

export default Home;
