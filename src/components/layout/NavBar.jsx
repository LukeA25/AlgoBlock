import NavBarItem from "../NavBarItem";
import { useContext } from "react";
import UserContext from "../UserContext";

import { AiFillHome } from "react-icons/ai";
import { BsTools } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";

function NavBar(props) {
  const { isLoggedIn } = useContext(UserContext);
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
          <NavBarItem
            to="/"
            toggleActive={props.toggleActive}
            icon={<AiFillHome size="50" />}
            tooltip="Home"
          />
          {isLoggedIn ? (
            <NavBarItem
              to="/strategies"
              toggleActive={props.toggleActive}
              icon={<BsTools size="50" />}
              tooltip="Strategies"
            />
          ) : (
            <button
              className="sidebar-icon group pointer-events-auto"
              onClick={() => {
                if (props.isSignUpActive) {
                  props.toggleSignUp();
                }
                props.toggleLogin();
              }}
            >
              <BsTools size="50" />
              <span className="sidebar-tooltip group-hover:scale-100">
                Strategies
              </span>
            </button>
          )}
          <NavBarItem
            to="/marketplace"
            toggleActive={props.toggleActive}
            icon={<FaShoppingCart size="50" />}
            tooltip="Marketplace (Coming Soon!)"
          />
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
