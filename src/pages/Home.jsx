import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import stocks from "../assets/Stocks.png";
import InfoCard from "../components/InfoCard";
import ScrollInfo from "../components/ScrollInfo";

import { TbShieldLockFilled } from "react-icons/tb";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { AiFillDollarCircle } from "react-icons/ai";

function Home() {
  const [changingTitle, setChangingTitle] = useState("");
  const [pos, setPos] = useState(0);
  const words = ["simpler", "faster", "smarter"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const target = window.screen.height / 2 - 80;
      const scrollTo3 = document.getElementById("scrollTo-3");
      const scrollTo2 = document.getElementById("scrollTo-2");
      const scrollTo1 = document.getElementById("scrollTo-1");
      const scrollTo0 = document.getElementById("scrollTo-0");

      if (
        scrollTo3.getBoundingClientRect().top - scrollTo3.scrollHeight / 2 <
        target
      ) {
        setPos(4);
      } else if (
        scrollTo2.getBoundingClientRect().top - scrollTo2.scrollHeight / 2 <
        target
      ) {
        setPos(3);
      } else if (
        scrollTo1.getBoundingClientRect().top - scrollTo1.scrollHeight / 2 <
        target
      ) {
        setPos(2);
      } else if (
        scrollTo0.getBoundingClientRect().top - scrollTo0.scrollHeight / 2 <
        target
      ) {
        setPos(1);
      } else {
        setPos(0);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const word = words[currentWordIndex];
    const intervalId = setInterval(() => {
      setChangingTitle((prevTitle) => {
        if (prevTitle === word) {
          clearInterval(intervalId);
          setTimeout(() => {
            let deletedTitle = prevTitle;
            const deleteIntervalId = setInterval(() => {
              deletedTitle = deletedTitle.slice(0, -1);
              setChangingTitle(deletedTitle);
              if (deletedTitle === "") {
                clearInterval(deleteIntervalId);
                setCurrentWordIndex(
                  (prevIndex) => (prevIndex + 1) % words.length
                );
              }
            }, 100);
          }, 1000);
          return prevTitle;
        } else {
          return prevTitle + word[prevTitle.length];
        }
      });
    }, 400);

    return () => clearInterval(intervalId);
  }, [currentWordIndex]);

  return (
    <motion.div
      className="pt-20"
      // initial={{backgroundColor: "white"}}
      // animate={{ backgroundColor: "grey"}}
      // exit={{ backgroundColor: "grey", transition: {duration: 2000}}}
    >
      <section
        id="home"
        className="w-screen h-[calc(100vh-5rem)] bg-black overflow-y-hidden"
      >
        <article className="h-full w-full rounded-2xl overflow-hidden aspect-[27/20] m-auto">
          <div className="w-full h-[calc(100vh-5rem)] bg-black bg-opacity-75 absolute z-10 border-b-2 border-white">
            <div className="w-2/3 mt-[30vh] mx-auto">
              <h1 className="text-white text-5xl sm:text-8xl mb-2 sm:mb-4">
                AlgoBlock
              </h1>
              <p className="text-white text-2xl sm:text-4xl">
                Making algorithmic
              </p>
              <div className="flex">
                <p className="text-white text-2xl sm:text-4xl">
                  trading&nbsp;
                  <b className="font-semibold text-green-600">
                    {changingTitle}
                  </b>
                </p>
                <div className="h-[1.25rem] sm:h-8 aspect-[4/7] bg-white relative sm:top-[0.15rem] left-[0.1rem] sm:left-1 my-auto animate-cursor-flash" />
              </div>
              <button
                className="bg-green-600 hover:bg-green-500 active:bg-green-800 transition-colors duration-300 border-white border-2 w-36 h-8 sm:w-48 sm:h-12
          rounded-lg text-white sm:text-2xl font-semibold my-4"
                id="Step-1"
                onClick={() => window.location.replace("/#what-is-it")}
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="m-auto h-full w-full relative">
            <img src={stocks} alt="Stocks" className="h-full w-full absolute" />
          </div>
          <div className="bg-black w-full h-full relative -top-full animate-stock-cover" />
        </article>
      </section>

      <section id="what-is-it" className="bg-gray-900 w-screen py-10 px-[10%]">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 text-4xl sm:text-6xl font-semibold mb-4 sm:mb-8">
          What is it?
        </h1>
        <p className="text-white text-lg sm:text-2xl" id="Step-2">
          AlgoBlock allows you create a strategy for TradingView without any
          coding experience. This is perfect for those looking to dive deeper
          into technical analysis. Rather than learning how to code, you can
          focus on the logic behind the strategies and backtest them on
          TradingView to evaluate their performance.
        </p>
      </section>

      <hr className="border-white m-auto w-5/6 sm:w-1/2" />

      <section id="how-does-it-work" className="w-screen py-10 -z-20 px-[10%]">
        <div className="w-2 h-[75rem] ml-4 sm:ml-[calc(40vw-0.25rem)] absolute -z-10 bg-black" />
        <div className="w-2 h-20 absolute ml-4 sm:ml-[calc(40vw-0.25rem)] -mt-10 bg-gray-900" />
        <div className="w-2 h-16 ml-4 sm:ml-[calc(40vw-0.25rem)] mt-[2.5rem] absolute bg-gradient-to-b from-gray-900 to-transparent" />
        <h1 className="text-green-600 -mt-6 bg-clip-text absolute bg-gradient-to-br from-green-400 via-green-600 to-gray-500 text-4xl sm:text-6xl font-semibold z-30">
          How does it work?
        </h1>
        <ScrollInfo
          isActive={pos}
          index={0}
          title="Step 1 - Create a "
          boldTitle="Strategy"
          description="Use built-in TradingView indicators, community TradingView indicators, and the simple user interface to create your own trading strategy."
        />
        <ScrollInfo
          isActive={pos}
          index={1}
          title="Step 2 - Download Your "
          boldTitle="Script"
          description="After building your strategy, AlgoBlock will convert it into Pine script, which can be copied and pasted into TradingView for further use."
        />
        <ScrollInfo
          isActive={pos}
          index={2}
          title="Step 3 - Backtest Your "
          boldTitle="Strategy"
          description="Backtesting is essential to estimate a strategy's future performance. TradingView makes this easy, and you can fine tune the specifics of your strategy."
        />
        <ScrollInfo
          isActive={pos}
          index={3}
          title="Step 4 - Run Your "
          boldTitle="Script"
          description="Using TradingView's built in Trading Panel, you can easily connect your broker and start using your strategy."
        />
        <div className="w-2 ml-4 sm:ml-[calc(40vw-0.25rem)] -mt-4 h-[3.5rem] m-auto absolute bg-gray-900" />
        <div className="w-2 ml-4 sm:ml-[calc(40vw-0.25rem)] -mt-20 h-16 m-auto absolute bg-gradient-to-t from-gray-900 to-transparent" />
      </section>

      <hr className="border-white m-auto w-5/6 sm:w-1/2" />

      <section
        id="why-algoblock"
        className="bg-gray-900 w-screen py-10 px-[10%]"
      >
        <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 h-10 sm:h-20 text-4xl sm:text-6xl font-semibold mb-8">
          Why AlgoBlock?
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-16 sm:gap-[10vw] mb-4">
          <InfoCard
            icon={
              <TbShieldLockFilled
                color="rgb(22, 163, 74)"
                className="w-24 h-24 sm:w-36 sm:h-36"
              />
            }
            title="Security"
            key="Security"
            description="AlgoBlock doesn't require any of your financial data to be used, keeping our users safe."
          />
          <InfoCard
            icon={
              <BsFillLightningChargeFill
                color="rgb(22, 163, 74)"
                className="w-24 h-24 sm:w-36 sm:h-36"
              />
            }
            title="Speed"
            key="Speed"
            description="With AlgoBlock's simple user interface, strategies can be created and downloaded extremely quickly."
          />
          <InfoCard
            icon={
              <AiFillDollarCircle
                color="rgb(22, 163, 74)"
                className="w-24 h-24 sm:w-36 sm:h-36"
              />
            }
            title="Low Price"
            key="Low Price"
            description="AlgoBlock provides these services at a low price so that you can spend less and gain more."
          />
        </div>
      </section>
      <div className="fixed w-2 h-1/2 right-0 top-0 ml-[3.44rem] sm:ml-[calc(50vw-0.25rem)] left-0 -z-10 bg-gradient-to-t from-green-600 to-gray-600" />
    </motion.div>
  );
}

export default Home;
