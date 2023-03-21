function Popup(props) {
  function click() {
    console.log("clicklelc");
  }

  return (
    <div
      className={
        props.getActive
          ? "background -top-20 bg-shaded-500 opacity-100 transition-all duration-500 ease-in pointer-events-auto"
          : "background -top-20 bg-shaded-500 opacity-0 transition-all duration-500 ease-in  pointer-events-none"
      }
    >
      <div className="background top-0" onClick={props.toggle} />
      <div className="rounded-xl bg-white w-[30rem] h-[20rem] m-auto mt-32 relative z-[1]">
        <h1 className="text-black text-center relative top-8 text-5xl">
          {props.title}
        </h1>
        <hr className="border-1 border-black w-[75%] m-auto relative top-12" />
        {props.children}
      </div>
    </div>
  );
}

export default Popup;
