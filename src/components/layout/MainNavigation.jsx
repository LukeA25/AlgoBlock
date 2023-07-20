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
          <CgMenu color="white" className="h-8 w-8 ml-2 sm:m-0 sm:h-10 sm:w-10" />
        </button>
      </div>
      <HashLink replace to="/#top">
        <img src={logo} className="w-48 sm:h-12 sm:w-auto" />
      </HashLink>
      {currentUser ? (
        <div className="w-1/3 flex justify-end">
          <button
            onClick={toggleUserDropdown}
            className="flex justify-end group"
          >
            <CgProfile
              size="40"
              className="mr-2 text-gray-200 group-hover:text-white group-active:text-gray-400 duration-300 hidden sm:inline"
            />
            <p className="text-sm sm:text-xl text-gray-200 group-hover:text-white group-active:text-gray-400 duration-300 pt-1 sm:mr-1 text-right">
              Welcome, <b>{username}</b>!
            </p>
          </button>
        </div>
      ) : (
        <div className="flex w-1/3 items-center sm:items-start justify-end">
          <CgProfile color="white" className="mr-1 sm:mr-2 h-6 w-6 sm:h-10 sm:w-10" />
          <button
            onClick={() => {
              if (props.isSignUpActive) {
                props.toggleSignUp();
              }
              if (!props.isLoginActive) {
                props.toggleLogin();
              }
            }}
            className="text-sm sm:text-xl text-white sm:pt-1 mr-2 sm:mb-2 font-semibold hover:text-green-600 active:text-green-700 duration-300"
          >
            Login
          </button>
          <p className="sm:text-xl text-white hidden sm:inline pt-1 mr-2">or</p>
          <button
            onClick={() => {
              if (!props.isSignUpActive) {
                props.toggleSignUp();
              }
              if (!props.isLoginActive) {
                props.toggleLogin();
              }
            }}
            className="sm:text-xl text-white hidden sm:inline sm:pt-1 sm:mr-1 sm:mb-2 font-semibold hover:text-green-600 active:text-green-700 duration-300"
          >
            Sign Up
          </button>
        </div>
      )}
      <Dropdown
        isDropdownActive={isUserDropdownActive}
        toggleDropdown={toggleUserDropdown}
        right=" right-[2rem]"
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
