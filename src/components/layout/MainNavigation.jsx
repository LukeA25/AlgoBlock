import { Link } from "react-router-dom";
import logo from "../../assets/AlgoBlock.png"

function MainNavigation() {
  return (
    <header class="h-20 w-screen flex justify-between items-center 
    bg-black py-0 px-[1%] border-b-2 border-b-white">
      <Link to="/">
        <img src={logo} className="h-12" />
      </Link>
      <nav> 
        <ul>
          <li class="text-white font-bold">
            <Link to="/workspace">Workspace</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;