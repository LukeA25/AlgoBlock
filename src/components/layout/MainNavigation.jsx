import logo from "../../assets/AlgoBlock.png";
import { CgProfile, CgMenu } from "react-icons/cg";
import { useContext, useState } from "react";
import UserContext from "../UserContext";
import { HashLink } from "react-router-hash-link";

function MainNavigation(props) {
  const { isLoggedIn, username, setIsLoggedIn, setUserKey } = useContext(UserContext);
  const [isUserDropdownActive, setUserDropdownActive] = useState(false);

  function toggleUserDropdown() {
    setUserDropdownActive(!isUserDropdownActive);
  }

  return (
    <header
      className="h-20 flex justify-between items-center 
    bg-black py-0 px-[1%] border-b-2 border-b-white fixed w-screen z-50"
    >
      <button onClick={props.toggleNavBar} className="w-1/3">
        <CgMenu size="40" color="white" />
      </button>
      <HashLink replace to="/#top">
        <img src={logo} className="h-12" />
      </HashLink>
      {isLoggedIn ? (
        <button
          onClick={toggleUserDropdown}
          className="flex w-1/3 justify-end group"
        >
          <CgProfile
            size="40"
            className="mr-2 text-gray-200 group-hover:text-white group-active:text-gray-400 duration-300"
          />
          <p className="text-xl text-gray-200 group-hover:text-white group-active:text-gray-400 duration-300 pt-1 mr-1 ">
            Welcome, <b>{username}</b>!
          </p>
        </button>
      ) : (
        <div className="flex w-1/3 justify-end">
          <CgProfile size="40" color="white" className="mr-2" />
          <button
            onClick={() => {
              if (props.isSignUpActive) {
                props.toggleSignUp();
              }
              if (!props.isLoginActive) {
                props.toggleLogin();
              }
            }}
            className="text-xl text-white pt-1 mr-2 mb-2 font-semibold hover:text-green-600 active:text-green-700 duration-300"
          >
            Login
          </button>
          <p className="text-xl text-white pt-1 mr-2">or</p>
          <button
            onClick={() => {
              if (!props.isSignUpActive) {
                props.toggleSignUp();
              }
              if (!props.isLoginActive) {
                props.toggleLogin();
              }
            }}
            className="text-xl text-white pt-1 mr-1 mb-2 font-semibold hover:text-green-600 active:text-green-700 duration-300"
          >
            Sign Up
          </button>
        </div>
      )}
      <div
        className={`w-40 text-lg text-white absolute -top-4 left-[86vw] bg-gray-500 rounded-lg py-2 duration-300 ${
          isUserDropdownActive
            ? "translate-y-20 scale-y-100"
            : "translate-y-0 scale-y-0"
        }`}
      >
        <ul>
          <li>
            <button className="w-full px-2 py-1 text-left hover:bg-gray-400 active:bg-gray-600 duration-300">
              Dashboard
            </button>
          </li>
          <li>
            <button className="w-full px-2 py-1 text-left hover:bg-gray-400 active:bg-gray-600 duration-300">
              Settings
            </button>
          </li>
          <li>
            <button className="w-full px-2 py-1 text-left hover:bg-gray-400 active:bg-gray-600 duration-300">
              Subscription
            </button>
          </li>
        </ul>
        <hr className="w-full my-2 border-gray-400" />
        <div>
          <button onClick={() => { toggleUserDropdown(); setIsLoggedIn(false); setUserKey(""); window.location.replace("/#top") }} className="w-full px-2 py-1 text-left hover:bg-gray-400 active:bg-gray-600 duration-300">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default MainNavigation;
