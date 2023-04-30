function ScrollInfo(props) {
  return (
    <div className="flex flex-row items-center gap-12 mx-auto my-16">
      <h1
        className="text-4xl text-white w-[38vw] transition-all duration-300 text-right"
        style={
          props.isActive <= props.index
            ? { color: "rgb(55, 65, 81)" }
            : { color: "white" }
        }
      >
        {props.title}
        <b
          className="transition-all duration-300"
          style={
            props.isActive <= props.index
              ? { color: "rgb(31, 41, 55)" }
              : { color: "rgb(22, 163, 74)" }
          }
        >
          {props.boldTitle}
        </b>
      </h1>
      <div className="w-8 h-8 rounded-full relative z-10 transition-all duration-300 bg-gray-900">
        <div
          className="w-4 h-4 rounded-full m-2 z-10 transition-all duration-300"
          id={"scrollTo-" + props.index.toString()}
          style={
            props.isActive <= props.index
              ? { backgroundColor: "rgb(31, 41, 55)" }
              : { backgroundColor: "white" }
          }
        />
      </div>
      <p
        className="text-lg text-white w-[38vw] transition-all duration-300"
        style={
          props.isActive <= props.index
            ? { color: "rgb(55, 65, 81)" }
            : { color: "white" }
        }
      >
        {props.description}
      </p>
    </div>
  );
}

export default ScrollInfo;
