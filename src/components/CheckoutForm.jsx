import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAut from "../hook/useAuth";
const CheckoutForm = ({ id }) => {
  const { user } = useAut();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const trinerName = localStorage.getItem("trainerName");
  const skills = localStorage.getItem("skills");
  const selectedSlot = localStorage.getItem("selectedSlot");
  const price = localStorage.getItem("price");
  const intPrice = parseInt(price);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) {
      setMessage("Card info not found");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://server-7skmkpztr-abdullah-al-nirobs-projects.vercel.app/api/create-payment-intent",
        {
          amount: intPrice * 100,
          id: id,
        }
      );

      const clientSecret = data.clientSecret;

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
          },
        }
      );

      if (error) {
        setMessage(error.message);
        toast.error("ayment failed!");
      } else if (paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");
        toast.success("Payment completed!");
        axios
          .post("https://server-7skmkpztr-abdullah-al-nirobs-projects.vercel.app/api/paymenthistory", {
            id: id,
            email: user.email,
            amount: intPrice,
            status: "paid",
            trinerName: trinerName,
            selectedSlot: selectedSlot,
            classInfo: skills
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setMessage("Payment error occurred");
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-md lexend mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">
          Payment for <span className="text-blue-600">{id}</span>
        </h3>
        <p className="text-gray-600 text-sm mb-4 text-center">
          Total Amount: <span className="font-semibold">${price}</span>
        </p>

        <div className="p-3 ring-1 ring-gray-300 rounded-md bg-gray-50">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": {
                    color: "#a0aec0",
                  },
                },
                invalid: {
                  color: "#fa755a",
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="w-full cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          Pay Now
        </button>

        {message && (
          <div className="text-sm mt-2 text-center text-red-500">{message}</div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
