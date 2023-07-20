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
      <section id="home" className="w-screen h-[calc(100vh-5rem)] bg-black">
        <article className="h-full w-full rounded-2xl overflow-hidden aspect-[27/20] m-auto">
          <div className="w-full h-[calc(100vh-5rem)] bg-black bg-opacity-75 absolute z-10 border-b-2 border-white">
            <div className="w-2/3 mt-[30vh] mx-auto">
              <h1 className="text-white text-8xl h-24 mb-4">AlgoBlock</h1>
              <p className="text-white text-4xl">Making algorithmic</p>
              <div className="flex">
                <p className="text-white text-4xl">
                  trading&nbsp;
                  <b className="font-semibold text-green-600">
                    {changingTitle}
                  </b>
                </p>
                <div className="h-8 aspect-[4/7] bg-white relative top-[0.15rem] left-1 my-auto animate-cursor-flash" />
              </div>
              <button
                className="bg-green-600 hover:bg-green-500 active:bg-green-800 transition-colors duration-300 border-white border-2 w-48 h-12
          rounded-lg text-white text-2xl font-semibold my-4"
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
        <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 text-6xl font-semibold mb-8">
          What is it?
        </h1>
        <p className="text-white text-2xl" id="Step-2">
          AlgoBlock allows you to buy and sell stocks automatically by creating
          your own strategy. This is known as <b>algorithmic trading.</b> This
          normally requires programming experience, but AlgoBlock makes it
          simple. By creating a simple user interface, AlgoBlock makes it easier
          to understand advanced trading concepts, and allows the users to have
          creative freedom even with limited trading experience.
        </p>
      </section>

      <hr className="border-white m-auto w-1/2" />

      <section id="how-does-it-work" className="w-screen py-10 -z-20 px-[10%]">
        <div className="w-2 h-full ml-[calc(40vw-0.25rem)] absolute -z-10 bg-black" />
        <div className="w-2 h-28 absolute ml-[calc(40vw-0.25rem)] -mt-10 bg-gray-900" />
        <div className="w-2 h-16 ml-[calc(40vw-0.25rem)] mt-[4.5rem] absolute bg-gradient-to-b from-gray-900 to-transparent" />
        <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 text-6xl font-semibold z-50">
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
          boldTitle="Program"
          description="After building your strategy, "
        />
        <ScrollInfo
          isActive={pos}
          index={2}
          title="Step 3 - Connect to Your "
          boldTitle="Broker"
          description="After purchasing your program, download your program, log into your account, and select which strategy you would like to use."
        />
        <ScrollInfo
          isActive={pos}
          index={3}
          title="Step 4 - Run Your "
          boldTitle="Program"
          description="After purchasing your program, download your program, log into your account, and select which strategy you would like to use."
        />
        <div className="w-2 ml-[calc(40vw-0.25rem)] -mt-4 h-[3.5rem] m-auto absolute bg-gray-900" />
        <div className="w-2 ml-[calc(40vw-0.25rem)] -mt-20 h-16 m-auto absolute bg-gradient-to-t from-gray-900 to-transparent" />
      </section>

      <hr className="border-white m-auto w-1/2" />

      <section
        id="why-algoblock"
        className="bg-gray-900 w-screen py-10 px-[10%]"
      >
        <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 h-20 text-6xl font-semibold mb-8">
          Why AlgoBlock?
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-[10vw]">
          <InfoCard
            icon={<TbShieldLockFilled size="150" color="rgb(22, 163, 74)" />}
            title="Security"
            key="Security"
            description="AlgoBlock only requires user data on the client-side, meaning that it is not stored or used online. This makes AlgoBlock's users immune to data breeches, keeping our users safe."
          />
          <InfoCard
            icon={
              <BsFillLightningChargeFill size="150" color="rgb(22, 163, 74)" />
            }
            title="Speed"
            key="Speed"
            description="AlgoBlock only requires user data on the client-side, meaning that it is not stored or used online. This makes AlgoBlock's users immune to data breeches, keeping our users safe."
          />
          <InfoCard
            icon={<AiFillDollarCircle size="150" color="rgb(22, 163, 74)" />}
            title="Low Price"
            key="Low Price"
            description="AlgoBlock only requires user data on the client-side, meaning that it is not stored or used online. This makes AlgoBlock's users immune to data breeches, keeping our users safe."
          />
        </div>
      </section>
      <div className="fixed w-2 h-1/2 right-0 top-0 ml-[calc(50vw-0.25rem)] left-0 -z-10 bg-gradient-to-t from-green-600 to-gray-600" />
    </motion.div>
  );
}

export default Home;
