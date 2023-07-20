import { Link } from "react-router-dom";

function NavBarItem(props) {
  return (
    <div className="flex justify-start items-center">
      <Link
        to={props.to}
        className="sidebar-icon group pointer-events-auto"
        onClick={props.toggleActive}
      >
        {props.icon}
        <span className="sidebar-tooltip group-hover:scale-100">
          {props.tooltip}
        </span>
      </Link>
      <span className="ml-2 min-w-max inline sm:hidden text-green-600 font-bold">
        {props.tooltip}
      </span>
    </div>
  );
}

export default NavBarItem;
