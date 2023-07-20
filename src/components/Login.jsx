import { useState, useRef } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";

function Login(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useUserContext();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(
        emailRef.current.value.toLowerCase(),
        passwordRef.current.value
      );
      props.toggleLogin();
      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("Incorrect email or password");
      } else {
        console.error("Login Error:", error);
        setError("Unable to Log In");
      }
    }
    setLoading(false);
  }

  return (
    <form className="flex flex-col" onSubmit={submitHandler}>
      {error && (
        <div className="border-2 border-red-600 w-full h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
          {error}
        </div>
      )}
      <div className="flex flex-row w-full justify-between mt-4">
        <label htmlFor="email-input" className="text-lg sm:text-xl font-semibold">
          Email
        </label>
        <p>
          {"Need an account? "}
          <button
            type="button"
            className="text-green-600 font-bold hover:text-green-400 duration-300 transition-colors active:text-green-700"
            onClick={props.toggleSignUp}
          >
            Sign Up
          </button>
        </p>
      </div>
      <input
        id="email-input"
        type="email"
        className="border-black border-2 focus:border-[3px] bg-white focus:bg-green-100 transition-colors duration-300 mx-auto text-black w-full rounded-lg text-xl pl-2 py-2 mb-4 mt-1 z-10"
        required
        ref={emailRef}
      />
      <div className="flex flex-row w-full justify-between">
        <label htmlFor="password-input" className="text-lg sm:text-xl font-semibold">
          Password
        </label>
        <button
          type="button"
          className="flex flex-row"
          onClick={togglePassword}
        >
          {showPassword ? (
            <BiHide size="30" className="flex-shrink-0 mr-1" />
          ) : (
            <BiShow size="30" color="black" className="flex-shrink-0 mr-1" />
          )}
          <p className="pt-[0.2rem]">{showPassword ? "Hide" : "Show"}</p>
        </button>
      </div>
      <input
        type={showPassword ? "text" : "password"}
        id="password-input"
        className="border-black border-2 focus:border-[3px] bg-white focus:bg-green-100 transition-colors duration-300 m-auto text-black w-full rounded-lg text-xl pl-2 py-2 mb-2 mt-1 z-10"
        required
        ref={passwordRef}
      />
      <div className="flex gap-8 mt-4">
        <button
          type="button"
          className="w-48 h-12 m-auto bg-gray-600 hover:bg-gray-500 active:bg-gray-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-xl sm:text-2xl font-medium"
          onClick={props.toggleLogin}
        >
          Cancel
        </button>
        <button
          disabled={loading}
          className={`w-48 h-12 m-auto ${
            loading
              ? "bg-green-300"
              : "bg-green-600 hover:bg-green-500 active:bg-green-700"
          } transition-all duration-300 border-black border-2 rounded-lg text-white text-xl sm:text-2xl font-semibold`}
        >
          Submit
        </button>
      </div>
      <button
        type="button"
        className="text-green-600 font-bold hover:text-green-400 duration-300 active:text-green-700 mt-4"
        onClick={props.toggleResetPassword}
      >
        Forgot Password?
      </button>
    </form>
  );
}

export default Login;
