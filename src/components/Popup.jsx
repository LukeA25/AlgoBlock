function Popup(props) {
  return (
    <div
      className={
        props.getActive
          ? "background z-40 bg-shaded-500 opacity-100 transition-opacity duration-500 ease-in pointer-events-auto"
          : "background z-40 bg-shaded-500 opacity-0 transition-opacity duration-500 ease-in  pointer-events-none"
      }
    >
      <div className="rounded-lg bg-white w-[30rem] h-auto m-auto z-[1] py-6 px-12 mt-[20vh]">
        <h1 className="text-black text-center text-5xl mb-8">{props.title}</h1>
        {props.children}
      </div>
      <div className="background -z-50" onClick={props.toggle} />
    </div>
  );
}

export default Popup;
