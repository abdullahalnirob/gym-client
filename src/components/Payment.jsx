// Payment.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm"; // Your payment form
const key = import.meta.env.VITE_SRTIPE_KEY;
const stripePromise = loadStripe(key);

const Payment = () => {
  const { id } = useParams();

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm id={id} />
      </Elements>
    </div>
  );
};

export default Payment;
