import logo from "../../assets/AlgoBlock.png";
import { CgProfile, CgMenu } from "react-icons/cg";
import { useContext } from "react";
import UserContext from "../UserContext";
import { HashLink } from 'react-router-hash-link';

function MainNavigation(props) {
  const { isLoggedIn } = useContext(UserContext);

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
        <div className="flex w-1/3 justify-end">
          <CgProfile size="40" color="white" className="mr-2" />
          <p className="text-xl text-white pt-1 mr-1 ">Welcome, <b>Luke</b>!</p>
        </div>
      ) : (
        <button onClick={props.toggleLogin} className="flex w-1/3 justify-end">
          <CgProfile size="40" color="white" className="mr-2" />
          <p className="text-xl text-white pt-1 mr-1">Login or Sign Up</p>
        </button>
      )}
    </header>
  );
}

export default MainNavigation;
