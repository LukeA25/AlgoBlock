import { useState, useEffect, useRef, useContext } from "react";

import { AiFillCaretDown } from "react-icons/ai";
import StrategyContext from "../strategyContext";
import MiniDropdown from "./MiniDropdown";
import blocks from "../../blocks.json";

function InputButton(props) {
  const [isButtonActive, setIsButtonActive] = props.icon
    ? useState(false)
    : useState(true);
  const [loadedItems, setLoadedItems] = useState([]);
  const leftRef = useRef();
  const [left, setLeft] = useState(0.0);
  const [isLoading, setIsLoading] = useState(true);
  const { strategy, setStrategy } = useContext(StrategyContext);

  function convertToVariableName(title) {
    const words = title.split(" ");
    const capitalizedWords = words.map((word, index) =>
      index === 0 ? word.toLowerCase() : capitalize(word)
    );
    return capitalizedWords.join("");
  }

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  useEffect(() => {
    setLeft(
      leftRef.current.offsetLeft * 0.0625 +
        (leftRef.current.offsetWidth * 0.0625 - 12) / 2
    );
    const items = [];

    for (const piece in blocks[convertToVariableName(props.object.name)].info.items) {
      const item = {
        ...blocks[convertToVariableName(props.object.name)].info.items[piece],
      };
      items.push(item);
    }
    setLoadedItems(items);
    setIsLoading(false);
  }, [blocks[convertToVariableName(props.object.name)].info.items, leftRef, props.updateStrategy]);

  return (
    <button
      ref={leftRef}
      onClick={props.toggleDropdown}
      className={`w-64 h-min flex-grow-0 p-4 mt-4 border-2 ${
        props.auto
      } border-white rounded-lg bg-green-600 text-white flex flex-col justify-start  gap-4 ${
        isButtonActive && "hover:bg-green-500 active:bg-green-800 duration-300"
      }`}
      disabled={!isButtonActive}
    >
      <div className="flex justify-center items-center gap-2 w-[95%]">
        <h2 className="text-white text-xl font-semibold w-full leading-tight">
          {props.object.name}
        </h2>
        {props.icon ? (
          <div
            onClick={() => {
              const updatedStrategy = { ...strategy };
              if (!props.isSell) {
                updatedStrategy.entryConditions.splice(props.index, 1);
              } else {
                updatedStrategy.exitConditions.splice(props.index, 1);
              }
              setStrategy(updatedStrategy);
              props.updateStrategy();
            }}
            className="bg-shaded-500 hover:bg-shaded-750 hover:cursor-pointer active:bg-black duration-300 p-2 rounded-lg"
          >
            {props.icon}
          </div>
        ) : (
          <AiFillCaretDown size="30" color="white" />
        )}
      </div>
      <div
        onMouseEnter={() => setIsButtonActive(false)}
        onMouseLeave={() => {
          props.icon ? null : setIsButtonActive(true);
        }}
        className="bg-shaded-500 border-2 border-white rounded-lg w-full p-4 flex flex-col gap-2"
      >
        <h3 className="text-xl font-semibold">If</h3>
        {!isLoading &&
          loadedItems.map((item, index) => (
            <>
              {"time".localeCompare(item.prompt) != 0 && (
                <MiniDropdown
                  left={left}
                  item={item}
                  index={index}
                  updateStrategy={props.updateStrategy}
                  object={props.object}
                  path={`${props.path}.values[${index}]`}
                />
              )}
              {index === 0 && (
                <h3
                  className={`text-xl font-semibold leading-tight ${
                    "time" === item.prompt && "-mt-2"
                  }`}
                >
                  {("time" === item.prompt ? "time " : "") +
                    blocks[convertToVariableName(props.object.name)].info.text}
                </h3>
              )}
            </>
          ))}
      </div>
      {props.dropdown}
    </button>
  );
}

export default InputButton;
