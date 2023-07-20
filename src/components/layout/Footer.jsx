import logo from "../../assets/AlgoBlock.png";
import { FaTiktok } from "react-icons/fa";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useRef, useState } from "react";

function Footer() {
  const [formValue, setFormValue] = useState("");
  const emailRef = useRef();

  function addEmailHandler(email) {
    var emails = [];
    fetch("https://algoblock-4a1c4-default-rtdb.firebaseio.com/emailList.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (const key in data) {
          emails = data[key];
        }
      })
      .then(() => {
        var alreadyExists = false;
        for (var i in emails) {
          if (emails[i] == email) {
            alreadyExists = true;
          }
        }
        if (!alreadyExists) {
          emails.push(email);
        }
      })
      .then(() => {
        fetch(
          "https://algoblock-4a1c4-default-rtdb.firebaseio.com/emailList.json",
          {
            method: "PUT",
            body: JSON.stringify({ emails: emails }),
            headers: {
              "Content-Type": "appliation/json",
            },
          }
        );
      });
  }

  function submitHandler(event) {
    setFormValue("");
    scrollTo(top);
    event.preventDefault();
    const email = emailRef.current.value.toLowerCase();
    return addEmailHandler(email);
  }

  return (
    <footer className="bg-black w-screen py-10 px-[10%] border-t-2 border-t-white flex relative justify-between gap-8">
      <div className="flex flex-col gap-4">
        <HashLink to="/#top" required>
          <img src={logo} className="w-32 sm:w-64" />
        </HashLink>
        <div className="flex justify-center gap-[16.6%]">
          <a href="https://instagram.com" target="_blank">
            <AiOutlineInstagram color="rgb(22, 163, 74)" className="h-8 w-8 sm:h-10 sm:w-10" />
          </a>
          <a href="https://twitter.com" target="_blank">
            <AiOutlineTwitter color="rgb(22, 163, 74)" className="h-8 w-8 sm:h-10 sm:w-10" />
          </a>
          <a href="https://tiktok.com" target="_blank">
            <FaTiktok color="rgb(22, 163, 74)" className="h-8 w-8 sm:h-10 sm:w-10" />
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-30 justify-between sm:justify-start">
        <Link
          to="/about-us"
          className="text-gray-300 hover:text-white active:text-gray-500 sm:text-xl"
        >
          About Us
        </Link>
        <Link
          to="/contact-us"
          className="text-gray-300 hover:text-white active:text-gray-500 sm:text-xl"
        >
          Contact Us
        </Link>
        <Link
          to="/terms-of-service"
          className="text-gray-300 hover:text-white active:text-gray-500 sm:text-xl"
        >
          Terms of Service
        </Link>
        <Link
          to="/privacy-policy"
          className="text-gray-300 hover:text-white active:text-gray-500 sm:text-xl"
        >
          Privacy Policy
        </Link>
      </div>
      <div className="hidden sm:flex flex-col gap-2">
        <div className="flex gap-2">
          <IoIosMail color="white" size="30" />
          <h2 className="text-white text-xl">Stay up to date with AlgoBlock</h2>
        </div>
        <form onSubmit={submitHandler}>
          <input
            id="email-input"
            type="email"
            placeholder="Enter your email..."
            ref={emailRef}
            onChange={(event) => {
              setFormValue(event.target.value);
            }}
            value={formValue}
            required
            className="bg-transparent border-b-2 border-b-gray-400 w-full text-lg py-1 text-gray-200"
          />
          <button
            className="bg-green-600 hover:bg-green-500 active:bg-green-800 transition-colors duration-300 border-white border-2 w-36 h-10
    rounded-md text-white text-lg font-semibold mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </footer>
  );
}

export default Footer;
