import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="w-screen min-h-[calc(100vh-12.6rem)] sm:min-h-[calc(100vh-13.6rem)] relative pt-20">
      <h1 className="text-white text-6xl sm:text-7xl text-center font-semibold pt-20">
        404...
      </h1>
      <h3 className="text-white text-3xl sm:text-5xl text-center pt-6 m-auto w-2/3">
        This page could not be found. Visit the{" "}
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

export default Error;
