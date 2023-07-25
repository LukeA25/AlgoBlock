import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaStripe } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useStrategyContext } from "../components/strategyContext";
import StripeCheckout from "../components/StripeCheckout";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const initStripe = async () => {
  const res = await axios.get("/api/publishable-key");
  const publishableKey = await res.data.publishable_key;

  return loadStripe(publishableKey);
};

function Checkout() {
  const stripePromise = initStripe();
  const { strategy } = useStrategyContext();

  const [clientSecretSettings, setClientSecretSettings] = useState({
    clientSecret: "",
    loading: true,
  });

  useEffect(() => {
    async function createPaymentIntent() {
      const response = await axios.post(`/api/create-payment-intent`, {});

      setClientSecretSettings({
        clientSecret: response.data.client_secret,
        loading: false,
      });
    }

    createPaymentIntent();
  }, []);

  if (!strategy.name) {
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
      <div className="p-8 sm:p-20 flex flex-col sm:flex-row justify-between min-h-[70vh]">
        <div className="w-full sm:w-1/2 flex-grow flex flex-col justify-end">
          <Link to="/workspace" className="flex gap-2 items-center group">
            <AiOutlineArrowLeft className="text-green-600 text-lg group-hover:text-green-400 duration-300 group-active:text-green-700" />
            <p className="text-green-600 text-lg group-hover:text-green-400 duration-300 group-active:text-green-700">
              Back to <b>Workspace</b>
            </p>
          </Link>
          <h3 className="text-xl mt-4 text-gray-400">AlgoBlock Script</h3>
          <h1 className="text-5xl text-white">$9.99</h1>
          <div className="flex justify-between mt-8">
            <div className="flex flex-col">
              <h3 className="text-white min-w-max">{strategy.name}</h3>
              <h4 className="text-gray-400">Qty: 1</h4>
            </div>
            <h3 className="text-white">$9.99</h3>
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
              <StripeCheckout />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
