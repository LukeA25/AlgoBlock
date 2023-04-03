import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";

function Login(props) {
  const [showPassword, setShowPassword] = useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <form className="flex flex-col">
      <div className="flex flex-row w-full justify-between">
        <label for="email-input" className="text-xl font-semibold">
          E-mail
        </label>
        <p>
          {props.accountQuestion}
          <button
            type="button"
            className="text-green-600 font-bold hover:text-green-400 duration-300 transition-colors active:text-green-700"
            onClick={props.toggleSignUp}
          >
            {props.switchButton}
          </button>
        </p>
      </div>
      <input
        id="email-input"
        type="email"
        className="border-black border-2 focus:border-[3px] bg-white focus:bg-green-100 transition-colors duration-300 mx-auto text-black w-96 h-16 rounded-lg text-xl pl-2 py-2 my-2 z-10"
        required
      />
      <div className="flex flex-row w-full justify-between">
        <label for="password-input" className="text-xl font-semibold">
          Password
        </label>
        <button
          type="button"
          className="flex flex-row"
          onClick={togglePassword}
        >
          {showPassword ? (
            <BiHide size="30" className="flex-shrink-0 mr-1 [color:white]" />
          ) : (
            <BiShow size="30" color="black" className="flex-shrink-0 mr-1" />
          )}
          <p className="pt-[0.2rem]">{showPassword ? "Hide" : "Show"}</p>
        </button>
      </div>
      <input
        type={showPassword ? "text" : "password"}
        id="password-input"
        className="border-black border-2 focus:border-[3px] bg-white focus:bg-green-100 transition-colors duration-300 m-auto text-black w-96 h-16 rounded-lg text-xl pl-2 py-2 my-2 z-10"
        required
      />
      <div className="flex gap-8 mt-8">
        <button
          type="button"
          className="w-48  h-12 m-auto bg-gray-600 hover:bg-gray-500 active:bg-gray-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-2xl font-semibold"
          onClick={props.toggleLogin}
        >
          Cancel
        </button>
        <button className="w-48 h-12 m-auto bg-green-600 hover:bg-green-500 active:bg-green-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-2xl font-semibold">
          Submit
        </button>
      </div>
    </form>
  );
}

export default Login;
