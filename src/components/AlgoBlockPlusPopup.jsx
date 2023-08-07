import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Banner from "../assets/AlgoBlockPlusBanner.png";
import { useUserContext } from "./UserContext";

function AlgoBlockPlusPopup(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const { currentUser } = useUserContext();
  const navigate = useNavigate();

  if (props.getActive) {
    return (
      <div className="background z-50 bg-shaded-500 transition-opacity duration-500 ease-in pointer-events-auto text-black block">
        <div
          className={`w-72 h-12 fixed bg-gray-700 z-50 rounded-full left-[calc(50vw-9rem)] top-32 p-4 duration-500 flex justify-center items-center text-white text-xl ${
            !loggedIn && "scale-x-50 scale-y-0 -translate-y-[8rem]"
          }`}
        >
          You must be logged in first!
        </div>
        <div className="rounded-lg bg-white h-auto m-auto z-[1] max-h-[70vh] overflow-y-scroll mt-[15vh] w-[22rem] sm:w-[30rem]">
          <img src={Banner} className="mx-auto mt-2 rounded-lg w-[97%]" />
          <h1 className="text-black text-left text-2xl sm:text-3xl mb-4 font-semibold pt-4 px-6 sm:px-12">
            Unleash your potential with{" "}
            <b className="text-green-600 font-semibold text-4xl sm:text-5xl">
              AlgoBlock+
            </b>
          </h1>
          <p className="px-6 sm:px-12 text-lg sm:text-xl mb-2">
            Generate powerful trading strategies without needing to code.
          </p>
          <p className="px-6 sm:px-12 text-lg sm:text-xl">
            Create and backtest unlimited algorithmic trading strategies today.
          </p>
          <p className="px-6 sm:px-12 text-lg sm:text-xl my-2">
            Cancel anytime.
          </p>
          <div className="w-full flex items-center justify-center my-6">
            <button
              onClick={() => {
                if (currentUser) {
                  navigate("/checkout", { replace: true });
                } else {
                  setLoggedIn(true);
                  setTimeout(() => setLoggedIn(false), 2000);
                }
              }}
              className="w-48 h-12 bg-green-600 hover:bg-green-500 active:bg-green-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-xl sm:text-2xl font-semibold"
            >
              Join Now
            </button>
          </div>
        </div>
        <div className="background -z-50" onClick={props.toggle} />
      </div>
    );
  } else {
    return null;
  }
}

export default AlgoBlockPlusPopup;
