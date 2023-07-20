function Popup(props) {
  if (props.getActive) {
    return (
      <div className="background z-50 bg-shaded-500 transition-opacity duration-500 ease-in pointer-events-auto block">
        <div className={`rounded-lg bg-white h-auto m-auto z-[1] py-6 px-6 sm:px-12 max-h-[70vh] overflow-y-scroll ${props.large ? "mt-[15vh] w-[80vw]" : "mt-[20vh] w-[22rem] sm:w-[30rem]"}`}>
          <h1 className="text-black text-center text-4xl sm:text-5xl mb-4 font-semibold">
            {props.title}
          </h1>
          {props.children}
        </div>
        <div className="background -z-50" onClick={props.toggle} />
      </div>
    );
  } else {
    return null;
  }
}

export default Popup;
