import { Link } from "react-router-dom";
import logo from "../../assets/AlgoBlock.png"

function MainNavigation() {
  return (
    <header class="h-20 w-screen flex justify-between items-center 
    bg-black py-0 px-[1%]">
      <button>
        <img src={logo} className="h-12" />
      </button>
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