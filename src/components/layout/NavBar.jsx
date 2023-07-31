import NavBarItem from "../NavBarItem";

import { AiFillHome } from "react-icons/ai";
import { BsPeopleFill, BsTools } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";
import { useUserContext } from "../UserContext";
import { FaBook } from "react-icons/fa";

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
            <button
              onClick={() => {
                if (props.isSignUpActive) {
                  props.toggleSignUp();
                }
                props.toggleLogin();
              }}
              className="flex justify-start items-center group active:bg-shaded-500 sm:active:bg-transparent duration-300 w-full"
            >
              <div className="sidebar-icon pointer-events-auto">
                <BsTools className="w-8 h-8 sm:w-12 sm:h-12" />
                <span className="sidebar-tooltip group-hover:scale-100">
                  Strategies
                </span>
              </div>
              <span className="ml-2 min-w-max inline sm:hidden text-green-600 font-bold">
                Strategies
              </span>
            </button>
          )}
          <NavBarItem
            to="/tutorial"
            toggleActive={props.toggleActive}
            icon={<FaBook className="w-6 h-6 sm:w-10 sm:h-10" />}
            tooltip="Tutorial"
          />
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
