import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import stocks from "../assets/Stocks.png";
import InfoCard from "../components/InfoCard";
import ScrollInfo from "../components/ScrollInfo";

import logo from "../assets/AlgoBlock.png";
import { TbShieldLockFilled } from "react-icons/tb";
import { FaTiktok } from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";
import {
  AiFillDollarCircle,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";

function Home() {
  const [changingTitle, setChangingTitle] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [pos, setPos] = useState(0);
  const title = "AlgoBlock";
  const emailRef = useRef();

  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      const target = screen.height / 2 - 80;
      console.log("Screen hieght: " + screen.height);
      if (
        document.getElementById("scrollTo-3").getBoundingClientRect().top -
          document.getElementById("scrollTo-2").scrollHeight / 2 <
        target
      ) {
        setPos(4);
      } else if (
        document.getElementById("scrollTo-2").getBoundingClientRect().top -
          document.getElementById("scrollTo-2").scrollHeight / 2 <
        target
      ) {
        setPos(3);
      } else if (
        document.getElementById("scrollTo-1").getBoundingClientRect().top -
          document.getElementById("scrollTo-1").scrollHeight / 2 <
        target
      ) {
        setPos(2);
      } else if (
        document.getElementById("scrollTo-0").getBoundingClientRect().top -
          document.getElementById("scrollTo-0").scrollHeight / 2 <
        target
      ) {
        setPos(1);
      } else {
        setPos(0);
      }
    });
  }, []);

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

  function addEmailHandler(email) {
    var emails = [];
    fetch("https://algoblock-4a1c4-default-rtdb.firebaseio.com/emailList.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (const key in data) {
          emails = data[key];
        }
      })
      .then(() => {
        var alreadyExists = false;
        for (var i in emails) {
          if (emails[i] == email) {
            alreadyExists = true;
          }
        }
        if (!alreadyExists) {
          emails.push(email);
        }
      })
      .then(() => {
        fetch(
          "https://algoblock-4a1c4-default-rtdb.firebaseio.com/emailList.json",
          {
            method: "PUT",
            body: JSON.stringify({ emails: emails }),
            headers: {
              "Content-Type": "appliation/json",
            },
          }
        );
      });
  }

  function submitHandler(event) {
    scrollTo(top);
    event.preventDefault();
    const email = emailRef.current.value.toLowerCase();
    return addEmailHandler(email);
  }

  return (
    <motion.div
      className="bg-black h-screen pt-20"
      // initial={{backgroundColor: "white"}}
      // animate={{ backgroundColor: "grey"}}
      // exit={{ backgroundColor: "grey", transition: {duration: 2000}}}
    >
      <section id="home" className="w-screen h-[calc(100vh-5rem)]">
        <article className="h-full w-full rounded-2xl overflow-hidden aspect-[27/20] m-auto">
          <div className="w-full h-[calc(100vh-5rem)] bg-black bg-opacity-75 absolute z-10 border-b-2 border-white">
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
            {/* <div className="h-10 w-10 border-green-600 border-4 rounded-full relative left-[7.6vw] top-[69vh] animate-buy-flash">
              <h1 className="text-green-600 font-semibold text-[150%] relative top-[80%] left-[80%]">
                BUY
              </h1>
            </div>
            <div className="h-10 w-10 border-red-600 border-4 rounded-full relative top-[19vh] left-[95.8vw] animate-sell-flash">
              <h1 className="text-red-600 font-semibold text-[150%] absolute -top-10 -right-5">
                SELL
              </h1>
            </div> */}
          </div>
          <div className="bg-black w-full h-full relative -top-full animate-stock-cover" />
        </article>
      </section>

      <section id="what-is-it" className="bg-gray-900 w-screen py-10 px-[10%]">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 text-6xl font-semibold mb-8">
          What is it?
        </h1>
        <p className="text-white text-2xl">
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
        <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 text-6xl font-semibold z-10">
          How does it work?
        </h1>
        <ScrollInfo
          isActive={pos}
          index={0}
          title="Step 1 - Create a "
          boldTitle="Strategy"
          description="Use technical indicators to create your own algorithim using the
        workshop. Alternatively, you can use the community algorithims."
        />
        <ScrollInfo
          isActive={pos}
          index={1}
          title="Step 2 - Download Your "
          boldTitle="Program"
          description="After purchasing your program, download your program, log into your account, and select which strategy you would like to use."
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
            description="AlgoBlock only requires user data on the client-side, meaning that it is not stored or used online. This makes AlgoBlock's users immune to data breeches, keeping our users safe."
          />
          <InfoCard
            icon={
              <BsFillLightningChargeFill size="150" color="rgb(22, 163, 74)" />
            }
            title="Speed"
            description="AlgoBlock only requires user data on the client-side, meaning that it is not stored or used online. This makes AlgoBlock's users immune to data breeches, keeping our users safe."
          />
          <InfoCard
            icon={<AiFillDollarCircle size="150" color="rgb(22, 163, 74)" />}
            title="Low Price"
            description="AlgoBlock only requires user data on the client-side, meaning that it is not stored or used online. This makes AlgoBlock's users immune to data breeches, keeping our users safe."
          />
        </div>
      </section>

      <section
        id="footer"
        className="bg-black w-screen py-10 px-[10%] border-t-2 border-t-white flex justify-center gap-[25%]"
      >
        <div className="flex flex-col gap-4">
          <img src={logo} className="w-64" />
          <div className="flex justify-center gap-[16.6%]">
            <a href="https://instagram.com" target="_blank">
              <AiOutlineInstagram size="40" color="rgb(22, 163, 74)" />
            </a>
            <a href="https://twitter.com" target="_blank">
              <AiOutlineTwitter size="40" color="rgb(22, 163, 74)" />
            </a>
            <a href="https://tiktok.com" target="_blank">
              <FaTiktok size="40" color="rgb(22, 163, 74)" />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            to="/about-us"
            className="text-gray-300 hover:text-white active:text-gray-500 text-xl duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact-us"
            className="text-gray-300 hover:text-white active:text-gray-500 text-xl"
          >
            Contact Us
          </Link>
          <Link
            to="/terms-of-service"
            className="text-gray-300 hover:text-white active:text-gray-500 text-xl"
          >
            Terms of Service
          </Link>
          <Link
            to="/return-policy"
            className="text-gray-300 hover:text-white active:text-gray-500 text-xl"
          >
            Return Policy
          </Link>
          <Link
            to="/privacy-policy"
            className="text-gray-300 hover:text-white active:text-gray-500 text-xl"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <IoIosMail color="white" size="30" />
            <h2 className="text-white text-xl">
              Stay up to date with AlgoBlock
            </h2>
          </div>
          <form onSubmit={submitHandler}>
            <input
              id="email-input"
              type="email"
              placeholder="Enter your email..."
              ref={emailRef}
              required
              className="bg-transparent border-b-2 border-b-gray-400 w-full text-lg py-1 text-gray-200"
            />
            <button
              className="bg-green-600 hover:bg-green-500 active:bg-green-800 transition-colors duration-300 border-white border-2 w-36 h-10
          rounded-md text-white text-lg font-semibold mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      <div className="fixed w-2 h-1/2 right-0 top-0 ml-[calc(50vw-0.25rem)] left-0 -z-10 bg-gradient-to-t from-green-600 to-gray-600" />
    </motion.div>
  );
}

export default Home;
