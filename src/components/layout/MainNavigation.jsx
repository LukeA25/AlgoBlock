import logo from "../../assets/AlgoBlock.png";
import { CgProfile, CgMenu } from "react-icons/cg";
import { useContext } from "react";
import UserContext from "../UserContext";

function MainNavigation(props) {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <header
      className="h-20 flex justify-between items-center 
    bg-black py-0 px-[1%] border-b-2 border-b-white fixed w-screen z-50"
    >
      <button onClick={props.toggleNavBar}>
        <CgMenu size="40" color="white" />
      </button>
      <button onClick={() => window.location.replace("/#home")}>
        <img src={logo} className="h-12" />
      </button>
      {isLoggedIn ? (
        <div className="flex">
          <p className="text-xl text-white pt-1 pr-2">Welcome, <b>Luke</b>!</p>
          <CgProfile size="40" color="white" className="mr-1" />
        </div>
      ) : (
        <button onClick={props.toggleLogin} className="flex">
          <p className="text-xl text-white pt-1 pr-2">Login or Sign Up</p>
          <CgProfile size="40" color="white" className="mr-1" />
        </button>
      )}
    </header>
  );
}

export default MainNavigation;
