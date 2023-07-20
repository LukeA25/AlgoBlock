import { useState, useRef } from "react";
import { useUserContext } from "./UserContext";

function ResetPassword(props) {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { resetPassword } = useUserContext();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value.toLowerCase());
      setMessage("Check your inbox for further instructions.");
    } catch (error) {
      console.error("Password Reset Error:", error);
      setError("Unable to reset password.");
    }
    setLoading(false);
  }

  return (
    <form className="flex flex-col" onSubmit={submitHandler}>
      {error && (
        <div className="border-2 mb-2 border-red-600 w-full h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
          {error}
        </div>
      )}
      {message && (
        <div className="border-2 mb-2 border-green-600 w-full h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
          {message}
        </div>
      )}
      <div className="flex flex-row w-full justify-between">
        <label htmlFor="email-input" className="text-xl font-semibold">
          Email
        </label>
      </div>
      <input
        id="email-input"
        type="email"
        className="border-black border-2 focus:border-[3px] bg-white focus:bg-green-100 transition-colors duration-300 mx-auto text-black w-96 rounded-lg text-xl pl-2 py-2 mb-4 mt-1 z-10"
        required
        ref={emailRef}
      />
      <div className="flex gap-8 mt-4">
        <button
          type="button"
          className="w-48  h-12 m-auto bg-gray-600 hover:bg-gray-500 active:bg-gray-700 transition-all duration-300 border-black border-2 rounded-lg text-white text-2xl font-medium"
          onClick={() => {
            props.toggleResetPassword();
            props.toggleLogin();
          }}
        >
          Cancel
        </button>
        <button
          disabled={loading}
          className={`w-48 h-12 m-auto ${
            loading
              ? "bg-green-300"
              : "bg-green-600 hover:bg-green-500 active:bg-green-700"
          } transition-all duration-300 border-black border-2 rounded-lg text-white text-2xl font-semibold`}
        >
          Reset
        </button>
      </div>
      <button
        type="button"
        className="text-green-600 font-bold hover:text-green-400 duration-300 active:text-green-700 mt-4"
        onClick={props.toggleResetPassword}
      >
        Login
      </button>
    </form>
  );
}

export default ResetPassword;
