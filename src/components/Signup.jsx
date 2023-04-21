import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  function signupHandler(signupData) {
    fetch("https://algoblock-4a1c4-default-rtdb.firebaseio.com/userData.json", {
      method: "POST",
      body: JSON.stringify(signupData),
      headers: {
        "Content-Type": "appliation/json",
      },
    }).then(() => {
      props.toggleLogin();
      navigate("/strategies", { replace: true });
    });
  }

  function submitHandler(event) {
    event.preventDefault();

    const loginData = {
      loginData: {
        email: emailRef.current.value.toLowerCase(),
        password: passwordRef.current.value,
      },
    };

    signupHandler(loginData);
  }

  return (
    <form className="flex flex-col" onSubmit={submitHandler}>
      <div className="flex flex-row w-full justify-between mt-4">
        <label htmlFor="email-input" className="text-xl font-semibold">
          E-mail
        </label>
        <p>
          {"Already have an account? "}
          <button
            type="button"
            className="text-green-600 font-bold hover:text-green-400 duration-300 transition-colors active:text-green-700"
            onClick={props.toggleSignUp}
          >
            Login
          </button>
        </p>
      </div>
      <input
        id="email-input"
        type="email"
        className="border-black border-2 focus:border-[3px] bg-white focus:bg-green-100 transition-colors duration-300 mx-auto text-black w-96 h-16 rounded-lg text-xl pl-2 py-2 mt-1 z-10"
        required
        ref={emailRef}
      />
      <label htmlFor="username-input" className="text-xl font-semibold mt-4">
        Username
      </label>
      <input
        id="username-input"
        type="text"
        className="border-black border-2 focus:border-[3px] bg-white focus:bg-green-100 transition-colors duration-300 mx-auto text-black w-96 h-16 rounded-lg text-xl pl-2 py-2 mb-4 mt-1 z-10"
        required
        ref={null}
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

export default Signup;
