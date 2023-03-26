import logo from "../../assets/AlgoBlock.png";
import { CgProfile, CgMenu } from "react-icons/cg";

import { Link } from "react-router-dom";

function MainNavigation(props) {
  return (
    <header
      className="h-20 flex justify-between items-center 
    bg-black py-0 px-[1%] border-b-2 border-b-white fixed w-screen z-50"
    >
      <button onClick={props.toggleNavBar}>
        <CgMenu size="40" color="white" />
      </button>
      <Link to="/">
        <img src={logo} className="h-12" />
      </Link>
      <Link to="/login">
        <CgProfile size="40" color="white" className="mr-1" />
      </Link>
    </header>
  );
}

export default MainNavigation;