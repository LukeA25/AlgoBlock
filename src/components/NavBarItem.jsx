import { Link } from "react-router-dom";

function NavBarItem(props) {
  return (
    <Link
      to={props.to}
      onClick={props.toggleActive}
      className="flex justify-start items-center group active:bg-shaded-500 sm:active:bg-transparent duration-300"
    >
      <div className="sidebar-icon pointer-events-auto">
        {props.icon}
        <span className="sidebar-tooltip group-hover:scale-100">
          {props.tooltip}
        </span>
      </div>
      <span className="ml-2 min-w-max inline sm:hidden text-green-600 font-bold">
        {props.tooltip}
      </span>
    </Link>
  );
}

export default NavBarItem;
