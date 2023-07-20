import NavBarItem from "../NavBarItem";

import { AiFillHome } from "react-icons/ai";
import { BsPeopleFill, BsTools } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useUserContext } from "../UserContext";

function NavBar(props) {
  const { currentUser } = useUserContext();
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
            ? "translate-x-[5rem] sm:translate-x-20 transition-all duration-700 sm:duration-500 ease-out pointer-events-auto top-20"
            : "-translate-x-[7rem] sm:-translate-x-20 transition-all duration-700 sm:duration-500 ease-in pointer-events-auto top-20"
        }
      >
        <ul>
          <NavBarItem
            to="/"
            toggleActive={props.toggleActive}
            icon={<AiFillHome className="w-8 h-8 sm:w-12 sm:h-12" />}
            tooltip="Home"
          />
          {currentUser ? (
            <NavBarItem
              to="/strategies"
              toggleActive={props.toggleActive}
              icon={<BsTools className="w-8 h-8 sm:w-12 sm:h-12" />}
              tooltip="Strategies"
            />
          ) : (
            <div className="flex justify-start items-center">
              <button
                className="sidebar-icon group pointer-events-auto"
                onClick={() => {
                  if (props.isSignUpActive) {
                    props.toggleSignUp();
                  }
                  props.toggleLogin();
                }}
              >
                <BsTools className="w-8 h-8 sm:w-12 sm:h-12" />
                <span className="sidebar-tooltip group-hover:scale-100">
                  Strategies
                </span>
              </button>
              <span className="ml-2 min-w-max inline sm:hidden text-green-600 font-bold">
                Strategies
              </span>
            </div>
          )}
          <NavBarItem
            to="/about-us"
            toggleActive={props.toggleActive}
            icon={<BsPeopleFill className="w-8 h-8 sm:w-12 sm:h-12" />}
            tooltip="About Us"
          />
          <NavBarItem
            to="/contact-us"
            toggleActive={props.toggleActive}
            icon={<IoIosMail className="w-8 h-8 sm:w-12 sm:h-12" />}
            tooltip="Contact Us"
          />
          {/* <div className="sidebar-icon group pointer-events-auto">
            <FaShoppingCart size="50" />
            <span className="sidebar-tooltip group-hover:scale-100">
              Marketplace (Coming Soon!)
            </span>
          </div> */}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
