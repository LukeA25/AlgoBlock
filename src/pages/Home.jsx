import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Home() {
  const [changingTitle, setChangingTitle] = useState("");
  const title = "AlgoBlock";

  useEffect(() => {
    const intervalId = setInterval(() => {
      setChangingTitle((prevTitle) => {
        if (prevTitle === title) {
          clearInterval(intervalId);
          return prevTitle;
        } else {
          return prevTitle + title[prevTitle.length];
        }
      });
    }, 400);

    return () => clearInterval(intervalId);
  }, [title]);

  // var currentTitle = typeTitle();
  // console.log("TITLE: " + currentTitle);

  return (
    <motion.div
      className="bg-gradient-to-r from-green-600 to-green-800 h-screen relative top-20"
      // initial={{backgroundColor: "white"}}
      // animate={{ backgroundColor: "grey"}}
      // exit={{ backgroundColor: "grey", transition: {duration: 2000}}}
    >
      <div className="bg-gradient-to-r from-gray-600 to-transparent absolute h-screen w-1/4 left-[40%]" />
      <div className="bg-gradient-to-r from-gray-700 to-gray-600 absolute left-0 h-screen w-[40%]" />
      <div className="relative left-28 top-64 flex">
        <h1 className="text-white text-9xl">{changingTitle}</h1>
        <div className="h-[7rem] w-16 bg-white relative top-[0.8rem] left-2 animate-cursor-flash transition-all"></div>
      </div>
      <div className="absolute left-28 top-96">
        <p className="text-white text-4xl relative top-8">
          Automatic stock trading
          <br />
          made simple.
        </p>
        <button
          className="bg-green-600 hover:bg-green-500 active:bg-green-800 transition-all duration-300 border-white border-4 w-48 h-12 
          rounded-lg relative top-12 text-white text-2xl font-semibold"
          onClick={function () {
            scrollTo({ left: 0, top: 1000, behavior: "smooth" });
          }}
        >
          Learn More
        </button>
      </div>

      <div className="bg-black w-screen h-[40rem] absolute top-[60rem]">
        <div className="relative bg-gradient-to-t from-black to-transparent -top-48 h-48 w-screen" />
        <h1 className="text-white relative -top-32 ml-24 text-8xl ">
          What is it?
        </h1>
        <p className="text-white text-4xl relative -top-28 ml-24 text leading-relaxed">
          AlgoBlock allows you to buy and sell stocks automatically by creating
          <br /> your own strategy. This is known as <b>
            algorithmic trading.
          </b>{" "}
          This normally
          <br /> requires programming experience, but AlgoBlock makes it simple.
        </p>
        <h1 className="text-white relative ml-24 text-8xl ">
          How does it work?
        </h1>
      </div>
      <div className="w-screen h-[64rem] absolute top-[100rem] -z-20 bg-black">
        <div className="w-8 h-8 m-auto top-0 bg-gradient-to-b from-black to-transparent" />
        <div className="relative w-8 h-8 m-auto top-10 -left-2 rounded-full bg-red-500 in-range:bg-gray-700" />
        <div className="relative w-2 h-[36rem] m-auto -left-2 -top-8 -z-20 bg-gray-900" />
        <div className="fixed w-2 h-1/2 left-0 right-0 m-auto top-0 -z-10 bg-gradient-to-t from-green-600 to-gray-600" />
      </div>
      <div className="absolute left-1/2 top-24 w-[54rem] h-[40rem] rounded-2xl bg-gray-800">
        <h1 className="text-white text-center relative top-1/2 text-4xl">
          random stock stuff
        </h1>
      </div>
    </motion.div>
  );
}

export default Home;
