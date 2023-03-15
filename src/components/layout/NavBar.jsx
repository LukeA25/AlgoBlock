import { Link } from "react-router-dom";
import NavBarItem from "../NavBarItem";

import { AiFillHome } from "react-icons/ai";
import { BsTools } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa"

function NavBar(props) {
  return (
    <div
      id="background"
      className={
        props.isActive
          ? "bg-shaded-500 transition-all duration-500 ease-in"
          : "bg-transparent transition-all duration-500 ease-in"
      }
    >
      <div
        id="navBar"
        className={
          props.isActive
            ? "translate-x-20 transition-all duration-500 ease-out"
            : "-translate-x-20 transition-all duration-500 ease-in"
        }
      >
        <ul>
          <NavBarItem to="/" toggleActive={props.toggleActive} icon={<AiFillHome size="40" />} tooltip="Home" />
          <NavBarItem to="/workspace" toggleActive={props.toggleActive} icon={<BsTools size="40" />} tooltip="Workspace" />
          <NavBarItem to="/marketplace" toggleActive={props.toggleActive} icon={<FaShoppingCart size="40" />} tooltip="Marketplace" />
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
