function InfoCard(props) {
  return (
    <div className="flex flex-col items-center w-72 gap-2">
      {props.icon}
      <h1 className="text-green-600 text-5xl font-semibold mb-2">{props.title}</h1>
      <p className="text-white text-xl text-center">{props.description}</p>
    </div>
  );
}

export default InfoCard;
