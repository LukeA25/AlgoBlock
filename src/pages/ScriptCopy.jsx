import { useEffect, useRef, useState } from "react";
import { AiFillCopy } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useStrategyContext } from "../components/strategyContext";
import convertScript from "../StrategyConverter";
import { CopyToClipboard } from "react-copy-to-clipboard";

function ScriptCopy() {
  const { strategy, getPurchased } = useStrategyContext();
  const [script, setScript] = useState("");
  const [copied, setCopied] = useState(false);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    if (strategy.name && getPurchased()) {
      setPurchased(true);
      const newScript = convertScript(strategy);
      setScript(newScript);
    }
  }, []);

  if (!purchased) {
    return (
      <div className="w-screen min-h-[calc(100vh-12.6rem)] sm:min-h-[calc(100vh-13.6rem)] relative pt-20">
        <h1 className="text-white text-6xl sm:text-7xl text-center font-semibold pt-20">
          Oops...
        </h1>
        <h3 className="text-white text-3xl sm:text-5xl text-center pt-6 m-auto w-2/3">
          You're not supposed to be here yet. Visit the{" "}
          <Link
            to="/"
            replace
            className="font-semibold text-green-600 hover:text-green-500 active:text-green-800 duration-300"
          >
            home page
          </Link>{" "}
          instead.
        </h3>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div
        className={`w-56 h-12 fixed bg-gray-700 z-50 rounded-full left-[calc(50vw-7rem)] top-32 p-4 duration-500 flex justify-center items-center text-white text-xl ${
          !copied && "scale-x-50 scale-y-0 -translate-y-[8rem]"
        }`}
      >
        Copied to Clipboard!
      </div>
      <CopyToClipboard text={script}>
        <div className="w-[90%] sm:w-2/3 max-w-4xl bg-gray-800 rounded-lg m-auto my-10 border-2 border-white overflow-hidden">
          <div className="flex justify-between items-center bg-green-600 rounded-t-md p-2 border-b-2 border-white">
            <p className="text-white font-semibold text-3xl">
              "<b className="font-bold">{strategy.name}</b>"{" Script"}
            </p>
            <button
              onClick={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              <AiFillCopy
                size="40"
                className="text-gray-200 hover:text-white active:text-gray-400 cursor-pointer"
              />
            </button>
          </div>
          <pre className="text-white p-4 w-full whitespace-pre-wrap overflow-auto">
            {script}
          </pre>
        </div>
      </CopyToClipboard>
    </div>
  );
}

export default ScriptCopy;
