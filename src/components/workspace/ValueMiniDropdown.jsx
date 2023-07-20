import { useState, useRef } from "react";
import { AiFillCaretDown } from "react-icons/ai";

function ValueMiniDropdown(props) {
  const [currentNum, setNum] = useState(props.values.value);

  return (
    <>
      <div className="flex-grow">
        <input
          onMouseEnter={() => props.setDisabled(true)}
          onMouseLeave={() => props.setDisabled(false)}
          onTouchStart={() => setDisabled(true)}
          onTouchEnd={() => setDisabled(false)}
          value={currentNum}
          onChange={(event) => {
            setNum(event.target.value);
            props.values.value = event.target.value;
            props.updateStrategy();
          }}
          className={`h-8 ${
            currentNum
              ? "bg-green-600 hover:bg-green-400 active:bg-green-700 border-white text-white"
              : "bg-white border-gray-700 text-black"
          } border-2 rounded-md w-[6.5rem] p-1 duration-300`}
          type={
            props.values.name.substring(6, 10) === "Time" ? "time" : "number"
          }
        />
      </div>
      <AiFillCaretDown size="30" color="white" />
    </>
  );
}

export default ValueMiniDropdown;
