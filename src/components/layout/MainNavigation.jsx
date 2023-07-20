import logo from "../../assets/AlgoBlock.png";
import { CgProfile, CgMenu } from "react-icons/cg";
import { useState } from "react";
import { useUserContext } from "../UserContext";
import { HashLink } from "react-router-hash-link";
import Dropdown from "../Dropdown";
import DropdownButton from "../DropdownButton";
import { useNavigate } from "react-router";

function MainNavigation(props) {
  const { username, currentUser, logout } = useUserContext();
  const [isUserDropdownActive, setUserDropdownActive] = useState(false);
  const navigate = useNavigate();

  function toggleUserDropdown() {
    setUserDropdownActive(!isUserDropdownActive);
  }

  return (
    <header
      className="h-20 flex justify-between items-center 
    bg-black py-0 px-[1%] border-b-2 border-b-white fixed w-screen z-50"
    >
      <div className="w-1/3">
        <button onClick={props.toggleNavBar}>
          <CgMenu size="40" color="white" />
        </button>
      </div>
      <HashLink replace to="/#top">
        <img src={logo} className="h-12" />
      </HashLink>
      {currentUser ? (
        <div className="w-1/3 flex justify-end">
          <button
            onClick={toggleUserDropdown}
            className="flex justify-end group"
          >
            <CgProfile
              size="40"
              className="mr-2 text-gray-200 group-hover:text-white group-active:text-gray-400 duration-300"
            />
            <p className="text-xl text-gray-200 group-hover:text-white group-active:text-gray-400 duration-300 pt-1 mr-1 ">
              Welcome, <b>{username}</b>!
            </p>
          </button>
        </div>
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
      <Dropdown
        isDropdownActive={isUserDropdownActive}
        toggleDropdown={toggleUserDropdown}
        left="85vw"
        top="4"
      >
        <DropdownButton
          onClick={() => {
            toggleUserDropdown();
            navigate("/dashboard", { replace: true });
          }}
          name="Dashboard"
          lineBreak={true}
        />
        <DropdownButton
          onClick={() => {
            toggleUserDropdown();
          }}
          name="Settings"
          lineBreak={false}
        />
        <DropdownButton
          onClick={() => {
            toggleUserDropdown();
            logout();
            window.location.replace("/#top");
          }}
          name="Logout"
          lineBreak={true}
        />
      </Dropdown>
    </header>
  );
}

export default MainNavigation;
