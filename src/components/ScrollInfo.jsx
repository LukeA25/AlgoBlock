function ScrollInfo(props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-12 mx-auto my-16">
      <h1
        className="text-3xl sm:text-4xl ml-12 sm:ml-0 text-white sm:w-[38vw] transition-all duration-300 sm:text-right"
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
      <div className="flex gap-4 items-center">
        <div className="w-8 h-8 ml-1 sm:ml-0 rounded-full relative z-10 transition-all duration-300 bg-gray-900">
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
        <div
          className={`inline sm:hidden h-1 w-24 duration-300 ${
            props.isActive <= props.index ? "bg-gray-800" : "bg-green-600"
          }`}
        />
      </div>
      <p
        className="sm:text-lg ml-12 sm:ml-0 text-white sm:w-[38vw] transition-all duration-300"
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
