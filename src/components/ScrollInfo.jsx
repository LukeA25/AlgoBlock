function ScrollInfo(props) {
  return (
    <article className={"relative " + props.position}>
      <h1
        className={
          "text-4xl text-white font-semibold mb-4 transition-all duration-300" +
          props.left
        }
        style={
          props.isActive <= props.index
            ? { color: "rgb(55, 65, 81)" }
            : { color: "white" }
        }
      >
        {props.title}
      </h1>
      <p
        className={
          "text-lg text-white w-[38vw] transition-all duration-300" + props.left
        }
        style={
          props.isActive <= props.index
            ? { color: "rgb(55, 65, 81)" }
            : { color: "white" }
        }
      >
        {props.description}
      </p>
      <div
        className="w-8 h-8 m-auto rounded-full relative -top-24 z-10 transition-all duration-300"
        id={"scrollTo-" + props.index.toString()}
        style={
          props.isActive <= props.index
            ? { backgroundColor: "rgb(7, 54, 25)" }
            : { backgroundColor: "rgb(22, 163, 74)" }
        }
      />
    </article>
  );
}

export default ScrollInfo;
