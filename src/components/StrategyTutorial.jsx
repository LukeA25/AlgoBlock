import { useEffect, useState } from "react";

function StrategyTutorial(props) {
  const [step, setStep] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const steps = [
    {
      title: "Create a New Strategy",
      desc: "Click here to create a new strategy.",
    },
    {
      title: "Strategy Name",
      desc: `This is called the "Bollinger Bands Crossover", but you can name it whatever you'd like. Press "Submit" when finished.`,
    },
    {
      title: "Edit Strategy",
      desc: `Hover over the strategy, and click "Edit" to begin creating the strategy.`,
    },
  ];

  useEffect(() => {
    const element = document.getElementById(props.id[step]);
    if (element) {
      const clickHandler = () => {
        if (step < 2) {
          setStep(step + 1);
        }
      };
      if (step == 1) {
        element.addEventListener("submit", clickHandler);
      } else {
        element.addEventListener("click", clickHandler);
      }
      const { width, height, top, left } = element.getBoundingClientRect();
      setWidth(width);
      setHeight(height);
      setTop(top);
      setLeft(left);
      return () => {
        if (element) {
          element.removeEventListener("click", clickHandler);
        }
      };
    }
  }, [props.id, step, setStep]);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <div
        style={{ width: left - 16 + "px" }}
        className="bg-shaded-500 fixed left-0 h-screen pointer-events-auto"
      />
      <div
        style={{
          width: screen.width - width - left - 16 + "px",
          left: width + left + 16 + "px",
        }}
        className="bg-shaded-500 fixed h-screen pointer-events-auto"
      />
      <div
        style={{
          height: top - 16 + "px",
          width: width + 32 + "px",
          left: left - 16 + "px",
        }}
        className="bg-shaded-500 fixed top-0 w-screen pointer-events-auto"
      />
      <div
        style={{
          height: screen.height - height - top - 16 + "px",
          top: height + top + 16 + "px",
          width: width + 32 + "px",
          left: left - 16 + "px",
        }}
        className="bg-shaded-500 fixed pointer-events-auto"
      />
      <div className="fixed w-96 bg-white rounded-lg top-[70%] left-[calc(80vw-12rem)] p-4 z-50">
        <h1 className="text-green-600 font-semibold text-4xl text-center">
          {steps[step].title}
        </h1>
        <p className="text-black text-xl text-center mt-2">
          {steps[step].desc}
        </p>
        <p className="text-gray-600 text-center mt-2">
          {step + 1 + " / " + steps.length}
        </p>
      </div>
    </div>
  );
}

export default StrategyTutorial;
