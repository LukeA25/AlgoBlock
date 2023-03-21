import { motion } from "framer-motion";

function Home() {
  async function typeTitle() {
    var ascending = true;
    const title = "AlgoBlock";
    var changingTitle = "";
    var second = new Date().getSeconds();
    while (true) {
      if (changingTitle.length == 0 || changingTitle.length == title.length) {
        while (new Date().getTime() < second + 1500) {
          continue;
        }
      }
      if (new Date().getTime() > second + 300) {
        second = new Date().getTime();
        if (ascending) {
          if (changingTitle.length + 1 == title.length) {
            ascending = false;
          }
          changingTitle = title.substring(0, changingTitle.length + 1);
          return changingTitle;
        } else {
          if (changingTitle.length - 1 == 0) {
            ascending = true;
          }
          changingTitle = changingTitle.substring(0, changingTitle.length - 1);
          return changingTitle;
        }
      }
    }
  }

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
        <h1 className="text-white text-9xl">{typeTitle}</h1>
        <div className="h-[7rem] w-16 bg-white relative top-[0.8rem] left-2 animate-cursor-flash transition-all"></div>
      </div>
      <div className="relative left-28 top-64">
        <p className="text-white text-4xl relative top-8">
          Automatic stock trading
          <br />
          made simple.
        </p>
        <button
          className="bg-green-600 hover:bg-green-500 active:bg-green-800 transition-all duration-300 border-white border-4 w-48 h-12 rounded-lg relative top-12 text-white text-2xl font-semibold"
          onClick={function () {
            scrollTo({ left: 0, top: 1000, behavior: "smooth" });
          }}
        >
          Learn More
        </button>
      </div>

      <div className="bg-black w-screen h-[64rem] absolute top-[60rem]">
        <div className="relative bg-gradient-to-t from-black to-transparent -top-48 h-48 w-screen" />
        <h1 className="text-white relative -top-32 ml-24 text-8xl ">
          What is it?
        </h1>
        <p className="text-white text-4xl relative -top-20 ml-24 text leading-relaxed">
          AlgoBlock allows you to buy and sell stocks automatically by creating
          <br /> your own strategy. This is known as <b>
            algorithmic trading.
          </b>{" "}
          This normally
          <br /> requires programming experience, but AlgoBlock makes it simple.
        </p>
      </div>
      <div className="relative left-2/4 -top-36 w-[54rem] h-[40rem] rounded-2xl bg-gray-800">
        <h1 className="text-white text-center relative top-1/2 text-4xl">
          random stock stuff
        </h1>
      </div>
    </motion.div>
  );
}

export default Home;
