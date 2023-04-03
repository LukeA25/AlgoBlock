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

  return (
    <motion.div
      className="bg-gradient-to-b lg:bg-gradient-to-r from-green-600 to-green-800 h-screen pt-20"
      // initial={{backgroundColor: "white"}}
      // animate={{ backgroundColor: "grey"}}
      // exit={{ backgroundColor: "grey", transition: {duration: 2000}}}
    >
      <section id="home" className="flex flex-col justify-center md:flex-row px-16 items-center gap-8 h-[calc(100vh-5rem)]">
        <article className="sm:w-1/3 sm:min-w-[22rem] lg:min-w-[32rem]">
          <div className="flex mb-4">
            <h1 className="text-white lg:text-8xl text-7xl">{changingTitle}</h1>
            <div className="h-16 lg:h-20 aspect-[4/7] bg-white relative top-1 left-2 my-auto animate-cursor-flash"></div>
          </div>
          <p className="text-white text-2xl lg:text-3xl">
            Automatic stock trading
            <br />
            made simple.
          </p>
          <button
            className="bg-green-600 hover:bg-green-500 active:bg-green-800 transition-colors duration-300 border-white border-4 w-48 h-12
          rounded-lg text-white text-2xl font-semibold my-2"
            onClick={() => window.location.replace("/#what-is-it")}
          >
            Learn More
          </button>
        </article>

        <article className="w-full md:w-1/2 rounded-2xl bg-gray-800 overflow-hidden aspect-[27/20] z-10">
          <div className="h-[6%] w-[4.5%] border-green-600 border-4 rounded-full relative top-[74.6%] left-[10.8%] z-10 animate-buy-flash">
            <h1 className="text-green-600 font-semibold text-[150%] relative top-[80%] left-[80%]">
              BUY
            </h1>
          </div>
          <div className="h-[6%] w-[4.5%] border-red-600 border-4 rounded-full relative top-[20.5%] left-[90.2%] z-10 animate-sell-flash">
            <h1 className="text-red-600 font-semibold text-[150%] absolute -top-10 -right-8">
              SELL
            </h1>
          </div>
          <img
            src={stocks}
            className="m-auto h-[95%] w-[90%] relative -top-[10%]"
          />
          <div className="bg-gray-800 w-[95%] h-full ml-[2%] rounded-r-2xl relative mt-1 -top-[107%] animate-stock-cover transition-all" />
        </article>
      </section>

      <section id="what-is-it" className="bg-black w-screen h-[40rem]">
        <div className="bg-gradient-to-t from-black to-transparent h-48 w-screen relative -top-48" />
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
      </section>

      <div className="w-screen h-[64rem] absolute top-[100rem] -z-20 bg-black">
        <h1 className="text-white relative ml-24 text-8xl ">
          How does it work?
        </h1>
        <div className="w-8 h-8 m-auto top-0 bg-gradient-to-b from-black to-transparent" />
        <div className="relative w-8 h-8 m-auto top-4 -left-2 rounded-full bg-red-500 in-range:bg-gray-700" />
        <div className="relative w-2 h-[36rem] m-auto -left-2 -top-16 -z-20 bg-gray-900" />
        <div className="fixed w-2 h-1/2 left-0 right-0 m-auto top-0 -z-10 bg-gradient-to-t from-green-600 to-gray-600" />
      </div>
    </motion.div>
  );
}

export default Home;
