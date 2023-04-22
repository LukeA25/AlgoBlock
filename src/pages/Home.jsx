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
      className="bg-black h-screen pt-20"
      // initial={{backgroundColor: "white"}}
      // animate={{ backgroundColor: "grey"}}
      // exit={{ backgroundColor: "grey", transition: {duration: 2000}}}
    >
      <section id="home" className="w-screen h-[calc(100vh-5rem)]">
        <article className="h-full w-full rounded-2xl overflow-hidden aspect-[27/20] m-auto">
          <div className="w-full h-[calc(100vh-5rem)] bg-black bg-opacity-75 absolute z-10">
            <div className="w-2/3 mt-[30vh] mx-auto">
              <div className="flex mb-4">
                <h1 className="text-white lg:text-8xl text-7xl">
                  {changingTitle}
                </h1>
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
            </div>
          </div>
          <div className="m-auto h-full w-full relative">
            <img src={stocks} className="h-full w-full absolute" />
            <div className="h-10 w-10 border-green-600 border-4 rounded-full relative left-[7.6vw] top-[69vh] animate-buy-flash">
              <h1 className="text-green-600 font-semibold text-[150%] relative top-[80%] left-[80%]">
                BUY
              </h1>
            </div>
            <div className="h-10 w-10 border-red-600 border-4 rounded-full relative top-[19vh] left-[95.8vw] animate-sell-flash">
              <h1 className="text-red-600 font-semibold text-[150%] absolute -top-10 -right-5">
                SELL
              </h1>
            </div>
          </div>
          <div className="bg-black w-full h-full relative -top-full animate-stock-cover" />
        </article>
      </section>

      <section id="what-is-it" className="bg-gray-900 w-screen h-96">
        <div className="bg-gradient-to-t from-gray-900 to-transparent h-48 w-screen relative -top-48 z-20" />
        <h1 className="text-green-600 relative -top-32 ml-24 text-6xl font-semibold">
          What is it?
        </h1>
        <p className="text-white text-2xl relative -top-28 ml-24">
          AlgoBlock allows you to buy and sell stocks automatically by creating
          <br /> your own strategy. This is known as <b>
            algorithmic trading.
          </b>{" "}
          This normally
          <br /> requires programming experience, but AlgoBlock makes it simple.
        </p>
      </section>

      <section id="how-does-it-work" className="w-screen h-[64rem]">
        <div className="w-full h-full bg-gray-900 absolute -z-20" />
        <h1 className="text-green-600 absolute ml-24 text-6xl font-semibold">
          How does it work?
        </h1>
        <div className="w-8 h-16 m-auto -top-20 bg-gradient-to-b from-gray-900 to-transparent" />
        <div className="relative w-2 h-[36rem] m-auto -top-20 -z-20 bg-black" />
        <div className="w-8 h-8 m-auto rounded-full z-10 bg-red-500" />
        <div className="fixed w-2 h-1/2 right-0 m-auto top-0 left-0 -z-10 bg-gradient-to-t from-green-600 to-gray-600" />
      </section>
    </motion.div>
  );
}

export default Home;
