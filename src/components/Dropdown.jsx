function Dropdown(props) {
  return (
    <>
      <div
        style={{ top: `${props.top}rem`, left: `${props.left}` }}
        className={`w-48 max-h-96 overflow-y-scroll bg-gray-600 absolute rounded-lg pb-2 overflow-x-hidden ${
          !props.noPt && "pt-2"
        } transition-transform duration-300 origin-top z-10 ${
          props.isDropdownActive ? "scale-y-100" : "scale-y-0"
        } ${
          props.left
            ? props.left
            : props.right
            ? props.right
            : "left-[calc(50vw-6rem)]"
        }`}
      >
        <ul>{props.children}</ul>
      </div>
      {props.isDropdownActive && (
        <div
          onClick={props.toggleDropdown}
          className="w-screen h-screen fixed top-0 left-0"
        />
      )}
    </>
  );
}

export default Dropdown;
