import { Link } from "react-router-dom";

function NavBarItem(props) {
    return <Link to={props.to} className="sidebar-icon" onClick={props.toggleActive}>
        {props.icon}
        <span className="sidebar-tooltip group-hover:scale-100">{props.tooltip}</span>
    </Link>
}

export default NavBarItem;