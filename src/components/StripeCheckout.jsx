import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useStrategyContext } from "./strategyContext";
import axios from "axios";
import { useUserContext } from "./UserContext";
import { AiOutlineLoading } from "react-icons/ai";

function StripeCheckout() {
  const stripe = useStripe();
  const elements = useElements();

  const [tos, setTos] = useState(false);
  const navigate = useNavigate();
  const { strategyKey } = useStrategyContext();
  const { currentUser } = useUserContext();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    if (!tos) {
      setErrorMessage("Please accept the Terms of Service.");
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:4242/scriptcopy",
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setIsLoading(false);
      await axios.post("/api/purchaseStrategy", {
        uid: currentUser.uid,
        strategyKey: strategyKey,
      });
      navigate("/scriptcopy", { replace: true });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="flex flex-col mt-4 gap-4">
        <div className="flex items-center gap-2">
          <input
            value={tos}
            onChange={(event) => {
              setTos(event.target.checked);
              setErrorMessage("");
            }}
            type="checkbox"
          />
          <p>
            I agree to AlgoBlock's{" "}
            <Link
              to="/terms-of-service"
              className="text-green-600 font-bold hover:text-green-400 duration-300 transition-colors active:text-green-700"
            >
              Terms of Service.
            </Link>
          </p>
        </div>
        {isLoading ? (
          <AiOutlineLoading size="24" color="rgb(22, 163, 74)" className="animate-spin" />
        ) : (
          <button
            className="px-4 py-2 w-min bg-green-600 hover:bg-green-500 active:bg-green-800 duration-300 rounded-lg text-white border-2 border-gray-800"
            disabled={!stripe}
          >
            Submit
          </button>
        )}
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      </div>
    </form>
  );
}

export default StripeCheckout;
