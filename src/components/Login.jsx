import { useState, useRef, useContext } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

function Login(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);
  const { setUserKey, setIsLoggedIn } = useContext(UserContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  function loginHandler(loginData) {
    fetch("https://algoblock-4a1c4-default-rtdb.firebaseio.com/userData.json").then((response) => {
        return response.json();
    }).then((data) => {
        for (const key in data) {
          if (JSON.stringify(data[key]["loginData"]) == JSON.stringify(loginData["loginData"])) {
            setIsLoggedIn(true);
            setUserKey(key);
            return true;
          }
        }
      return false;
    }).then((key) => {
        if (key) {
          props.toggleLogin();
          navigate("/strategies", { replace: true });
        } else {
          setFailedLogin(true);
          return false;
        }
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    setFailedLogin(false);

    const loginData = {
      loginData: {
        email: emailRef.current.value.toLowerCase(),
        password: passwordRef.current.value,
      },
    };

    return loginHandler(loginData);
  }

  return (
    <form className="flex flex-col" onSubmit={submitHandler}>
      {failedLogin ? <p className="text-lg text-red-600 text-center">Incorrect email or password. Please try again.</p> : null}
      <div className="flex flex-row w-full justify-between mt-4">
        <label htmlFor="email-input" className="text-xl font-semibold">
          E-mail
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
        className="border-black border-2 focus:border-[3px] bg-white focus:bg-green-100 transition-colors duration-300 mx-auto text-black w-96 h-16 rounded-lg text-xl pl-2 py-2 mb-4 mt-1 z-10"
        required
        ref={emailRef}
      />
      <div className="flex flex-row w-full justify-between">
        <label htmlFor="password-input" className="text-xl font-semibold">
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
        className="border-black border-2 focus:border-[3px] bg-white focus:bg-green-100 transition-colors duration-300 m-auto text-black w-96 h-16 rounded-lg text-xl pl-2 py-2 mb-2 mt-1 z-10"
        required
        ref={passwordRef}
      />
      <div className="flex gap-8 mt-8">
        <button
          type="button"
          className="w-48  h-12 m-auto bg-gray-600 hover:bg-gray-500 active:bg-gray-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-2xl font-medium"
          onClick={props.toggleLogin}
        >
          Cancel
        </button>
        <button className="w-48 h-12 m-auto bg-green-600 hover:bg-green-500 active:bg-green-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-2xl font-medium">
          Submit
        </button>
      </div>
    </form>
  );
}

export default Login;
