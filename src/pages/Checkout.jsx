import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaStripe } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StripeCheckout from "../components/StripeCheckout";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useUserContext } from "../components/UserContext";
import ReactPixel from "react-facebook-pixel";

async function initStripe() {
  const res = await axios.get(
    "https://algoblock-backend-5df4fb859f35.herokuapp.com/publishable-key"
  );
  const publishableKey = await res.data.publishable_key;

  return loadStripe(publishableKey);
}

function Checkout() {
  const stripePromise = initStripe();
  const { getCustomerId, currentUser } = useUserContext();
  const navigate = useNavigate();
  // const location = useLocation();
  // const [isSubscription, setIsSubscription] = useState(
  //   location.hash === "#algoblock-plus"
  // );

  const [clientSecretSettings, setClientSecretSettings] = useState({
    clientSecret: "",
    loading: true,
  });

  useEffect(() => {
    async function createSetupIntent() {
      const customerId = await getCustomerId();
      const response = await axios.post(
        `https://algoblock-backend-5df4fb859f35.herokuapp.com/create-subscription`,
        {
          customerId: customerId,
        }
      );

      setClientSecretSettings({
        clientSecret: response.data.clientSecret,
        subscriptionId: response.data.subscriptionId,
        loading: false,
      });
    }

    createSetupIntent();

    ReactPixel.track("InitiateCheckout", {
      contents: ["AlgoBlock+ Subscription"],
      currency: "USD",
      num_items: 1,
      value: 19.99,
    });
  }, []);

  if (!currentUser) {
    return (
      <div className="w-screen min-h-[calc(100vh-12.6rem)] sm:min-h-[calc(100vh-13.6rem)] relative pt-20">
        <h1 className="text-white text-6xl sm:text-7xl text-center font-semibold pt-20">
          Oops...
        </h1>
        <h3 className="text-white text-3xl sm:text-5xl text-center pt-6 m-auto w-2/3">
          You're not supposed to be here yet. Visit the{" "}
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

  return (
    <div className="w-screen min-h-[calc(100vh-12.6rem)] sm:min-h-[calc(100vh-13.6rem)] relative pt-20">
      {/* <div className="flex gap-4 items-center justify-center mt-6">
        <button
          className={`border-b-2 text-2xl px-4 py-4 duration-300 ${
            !isSubscription
            ? "text-white border-green-600 active:text-gray-300"
            : "text-gray-500 border-gray-500 hover:text-gray-300 active:text-gray-700"
          }`}
        >
          One Time Purchase
        </button>
        <button
          className={`border-b-2 text-2xl px-4 py-4 duration-300 ${
            isSubscription
              ? "text-white border-green-600 active:text-gray-300"
              : "text-gray-500 border-gray-500 hover:text-gray-300 active:text-gray-700"
          }`}
        >
          AlgoBlock+
        </button>
      </div>
      <hr className="w-[80%] mb-4 m-auto" /> */}
      <div className="p-8 sm:p-20 flex flex-col sm:flex-row justify-between min-h-[70vh]">
        <div className="w-full sm:w-1/2 flex-grow flex flex-col justify-end">
          <button
            onClick={() => navigate(-1)}
            className="flex gap-2 items-center group"
          >
            <AiOutlineArrowLeft className="text-green-600 text-lg group-hover:text-green-400 duration-300 group-active:text-green-700" />
            <p className="text-green-600 text-lg group-hover:text-green-400 duration-300 group-active:text-green-700">
              Go Back
            </p>
          </button>
          <h3 className="text-xl mt-4 text-gray-400">AlgoBlock+</h3>
          <h1 className="text-5xl text-white">$9.99</h1>
          <div className="flex justify-between mt-8">
            <div className="flex flex-col">
              <h3 className="text-white min-w-max">
                <b className="font-semibold text-green-600">AlgoBlock+</b>{" "}
                Subscription
              </h3>
              <h4 className="text-gray-400">Qty: 1</h4>
            </div>
            <h3 className="text-white">$9.99 / month</h3>
          </div>
          <div className="flex items-end flex-grow">
            <div className="flex gap-1 items-center">
              <p className="text-lg text-white">Powered by</p>
              <FaStripe size="50" color="white" />
            </div>
          </div>
        </div>
        <div className="w-full h-[0.1rem] sm:w-[0.1rem] sm:h-auto sm:flex-grow my-4 sm:my-0 sm:mx-12 bg-gray-600 shadow-gray-500" />
        <div className="bg-white rounded-lg p-8 mt-4 sm:my-auto w-full sm:w-3/4 mx-auto">
          {clientSecretSettings.loading ? (
            <h1>Loading ...</h1>
          ) : (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret: clientSecretSettings.clientSecret,
                appearance: { theme: "stripe" },
              }}
            >
              <StripeCheckout
                subscriptionId={clientSecretSettings.subscriptionId}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
