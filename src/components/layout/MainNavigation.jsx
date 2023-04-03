import logo from "../../assets/AlgoBlock.png";
import { CgProfile, CgMenu } from "react-icons/cg";

function MainNavigation(props) {
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
      <button onClick={props.toggleLogin}>
        <CgProfile size="40" color="white" className="mr-1" />
      </button>
    </header>
  );
}

export default MainNavigation;