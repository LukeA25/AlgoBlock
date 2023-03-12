import { Link } from "react-router-dom";
import logo from "../../assets/AlgoBlock.png"

function MainNavigation() {
  return (
    <header class="h-20 w-screen flex justify-between items-center 
    bg-black py-0 px-[5%]">
      <img src={logo} className="h-48"></img>
      <nav> 
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/workspace">Workspace</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
