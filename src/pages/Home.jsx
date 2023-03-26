import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import stocks from "../assets/Stocks.png";

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
      <div className="absolute left-28 top-96 z-10">
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
      <div className="bg-gradient-to-r from-gray-600 to-transparent absolute h-screen w-1/4 left-[40%]" />
      <div className="bg-gradient-to-r from-gray-700 to-gray-600 absolute left-0 h-screen w-[40%]" />
      <div className="relative left-28 top-64 flex">
        <h1 className="text-white text-9xl">{changingTitle}</h1>
        <div className="h-[7rem] w-16 bg-white relative top-[0.8rem] left-2 animate-cursor-flash transition-all"></div>
      </div>

      <div className="bg-black w-screen h-[40rem] relative top-[52rem]">
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
        <div className="relative w-8 h-8 m-auto top-4 -left-2 rounded-full bg-red-500 in-range:bg-gray-700" />
        <div className="relative w-2 h-[36rem] m-auto -left-2 -top-16 -z-20 bg-gray-900" />
        <div className="fixed w-2 h-1/2 left-0 right-0 m-auto top-0 -z-10 bg-gradient-to-t from-green-600 to-gray-600" />
      </div>
      <div className="absolute right-10 top-24 w-[54rem] h-[40rem] rounded-2xl bg-gray-800 overflow-hidden">
        <div className="h-10 w-10 border-green-600 border-4 rounded-full relative top-[74.6%] left-[10.7%] z-10 animate-buy-flash transition-all">
          <h1 className="text-green-600 font-bold text-3xl relative top-full left-full">
            BUY
          </h1>
        </div>
        <div className="h-10 w-10 border-red-600 border-4 rounded-full relative top-[20.5%] left-[90.1%] z-10 animate-sell-flash transition-all">
          <h1 className="text-red-600 font-bold text-3xl relative -top-[130%] left-[40%]">
            SELL
          </h1>
        </div>
        <img
          src={stocks}
          className="m-auto h-[95%] w-[90%] relative -top-[10%]"
        />
        <div className="bg-gray-800 w-[95%] h-[95%] ml-[2%] rounded-r-2xl relative mt-1 -top-[105%] animate-stock-cover transition-all" />
      </div>
    </motion.div>
  );
}

export default Home;
