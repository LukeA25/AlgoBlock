import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

function CommunityIndicatorMiniDropdown(props) {
  const [name, setName] = useState(props.indicator.name);

  return (
    <>
      <div className="flex-grow">
        <input
          onMouseEnter={() => {
            props.setDisabled(true);
          }}
          onMouseLeave={() => {
            props.setDisabled(false);
          }}
          onChange={(event) => {
            setName(event.target.value);
            props.indicator.name = event.target.value;
            props.updateStrategy();
          }}
          className={`h-8 ${
            name
              ? "bg-green-600 hover:bg-green-400 active:bg-green-700 border-white text-white"
              : "bg-white border-gray-700 text-black"
          } border-2 rounded-md w-[6.5rem] p-1 duration-300`}
          value={name}
          placeholder="Name"
        />
      </div>
      <AiFillCaretDown size="30" color="white" />
    </>
  );
}

export default CommunityIndicatorMiniDropdown;
