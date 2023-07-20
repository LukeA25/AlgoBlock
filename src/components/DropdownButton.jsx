function DropdownButton(props) {
  if (
    props.searchValue == null ||
    (props.searchValue != null &&
      props.name.toLowerCase().startsWith(props.searchValue.toLowerCase()))
  ) {
    return (
      <>
        <li key={props.name}>
          <div
            onClick={props.onClick}
            id={props.name}
            className="w-full px-2 py-1 hover:cursor-pointer hover:bg-gray-400 active:bg-gray-600 duration-300 flex items-center gap-2 group"
          >
            {props.icon}
            <p className="text-white text-left">{props.name}</p>
          </div>
        </li>
        {!props.lineBreak && <hr key={props.name + "hr"} />}
      </>
    );
  } else {
    return null;
  }
}

export default DropdownButton;
