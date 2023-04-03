import { Link } from "react-router-dom";
import NavBarItem from "../NavBarItem";

import { AiFillHome } from "react-icons/ai";
import { BsTools } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa"

function NavBar(props) {
  return (
    <div
      className={
        props.isActive
          ? "background bg-shaded-500 transition-all duration-500 ease-in pointer-events-auto z-10"
          : "background bg-transparent transition-all duration-500 ease-in pointer-events-none z-10"
      }
    onClick={props.toggleActive}
    >
      <div
        id="navBar"
        className={
          props.isActive
            ? "translate-x-20 transition-all duration-500 ease-out pointer-events-auto top-20"
            : "-translate-x-20 transition-all duration-500 ease-in pointer-events-auto top-20"
        }
      >
        <ul>
          <NavBarItem to="/" toggleActive={props.toggleActive} icon={<AiFillHome size="3rem" />} tooltip="Home" />
          <NavBarItem to="/strategies" toggleActive={props.toggleActive} icon={<BsTools size="3rem" />} tooltip="Strategies" />
          <NavBarItem to="/marketplace" toggleActive={props.toggleActive} icon={<FaShoppingCart size="3rem" />} tooltip="Marketplace" />
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
