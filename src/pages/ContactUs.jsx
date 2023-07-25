import React, { useState } from "react";
import axios from "axios";

function ContactUs() {
  const [submitMessage, setSubmitMessage] = useState("");

  async function submitHandler(event) {
    event.preventDefault();

    const inputs = event.target.elements;
    const data = {};

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        data[inputs[i].name] = inputs[i].value;
      }
    }

    try {
      await axios.post("/api/send-email", data);
      setSubmitMessage("Thanks for your feedback!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  return (
    <div className="w-screen min-h-[calc(100vh-12.6rem)] sm:min-h-[calc(100vh-13.6rem)] relative pt-20">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-600 to-gray-500 h-16 sm:h-24 font-semibold text-5xl sm:text-7xl text-center relative top-8">
        Contact Us
      </h1>
      <div className="w-5/6 sm:w-1/2 p-10 pb-6 border-2 border-white bg-shaded-500 rounded-lg m-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="mb-3 pt-0">
            <input
              type="text"
              placeholder="Your name"
              name="name"
              className="bg-white focus:bg-green-100 transition-colors duration-300 m-auto text-black w-full rounded-md sm:text-xl pl-2 py-2 mb-2 mt-1 z-10"
              required
            />
          </div>
          <div className="mb-3 pt-0">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="bg-white focus:bg-green-100 transition-colors duration-300 m-auto text-black w-full rounded-md sm:text-xl pl-2 py-2 mb-2 mt-1 z-10"
              required
            />
          </div>
          <div className="mb-3 pt-0">
            <textarea
              placeholder="Your message"
              name="message"
              className="min-h-[10rem] bg-white focus:bg-green-100 transition-colors duration-300 m-auto text-black w-full rounded-md sm:text-xl pl-2 py-2 mb-2 mt-1 z-10"
              required
            />
          </div>
          <div className="flex items-center">
            <button
              className="w-48 h-12 m-auto bg-green-600 hover:bg-green-500 active:bg-green-700 duration-300 border-white border-2 rounded-lg text-white text-xl sm:text-2xl font-semibold"
              type="submit"
            >
              Submit
            </button>
          </div>
          {submitMessage && (
            <div className="text-center text-green-600 bg-green-200 border-2 border-green-600 rounded-md m-auto mt-4 sm:text-xl py-2">
              {submitMessage}
            </div>
          )}
        </form>
      </div>
      <p className="text-lg mb-10 text-white text-center">
        Alternatively, you can email us at{" "}
        <a
          className="text-green-600 hover:text-green-500 active:text-green-800 font-bold duration-300"
          href="mailto:info@algoblock.net"
        >
          info@algoblock.net
        </a>
        .
      </p>
    </div>
  );
}

export default ContactUs;
