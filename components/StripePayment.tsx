"use client";

import { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements, PaymentElement, CardNumberElement } from "@stripe/react-stripe-js";
import { errorToast, sucessToast } from "@/utils";
import { Button } from "./ui/button";
import Image from "next/image";

// ✅ Load Stripe with your Public Key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const CheckoutForm = ({ clientSecret, onClose, open }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);


  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside of it
  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    } as any);

    setLoading(false);

    console.log('paymentIntent', paymentIntent)

    if (error) {
      errorToast(error.message || "Payment failed");
    } else if (paymentIntent.status === "succeeded") {
      sucessToast("Payment successful!");
      onClose();
    }
  };

  return (
    // <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-md w-96">
    //   <CardElement className="border p-3 rounded-md" />
    //   <button
    //     type="submit"
    //     disabled={!stripe || loading}
    //     className="w-full mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
    //   >
    //     {loading ? "Processing..." : "Pay Now"}
    //   </button>
    // </form>
    <>
      {open &&
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleClickOutside} // Handle outside click
        >
          {/* <ApiState error={error} isSuccess={isSuccess}>
          <ApiState.ArthorizeCheck />
          </ApiState> */}
          <div
            ref={modalRef}
            className="bg-[#060A0E] text-white px-[48px] py-[30px] rounded-[20px] w-[501px] min-w-[501px] modelGradientBorder"
          >
            {/* Header */}
            <div className="flex justify-center flex-col items-center mb-8 text-center">
              <h2 className="text-[32px] font-medium leading-[130%] tracking-normal mb-3 text-white">
                Pay
              </h2>
              <span className="text-[#8F9DAC] font-normal text-[14px] leading-[20px] tracking-normal">
                Pay amount for credits
              </span>
              {/* <button className="text-gray-400 hover:text-white" onClick={onClose}>
            ✖
          </button> */}
            </div>

            {/* Form */}
            <div className="flex flex-col">
              <form onSubmit={handleSubmit} className="p-4 rounded-md w-96">

                <div className="flex flex-col mb-[32px]">
                  <label className="block text-white font-medium text-[14px] leading-[24px] tracking-normal mb-1.5">
                    Card details
                  </label>
                  <CardElement
                    className="bg-white rounded-sm p-4"
                  />
                </div>
                <Button
                  type="submit"
                  className="auth-button"
                // onClick={handleAddCredits}
                // disabled={isLoading}
                >
                  Pay via{" "}
                  <Image
                    src="/images/Strip.png"
                    height={24}
                    width={90}
                    className="!min-w-[90px] !w-[90px]"
                    alt="Jobs"
                  />
                </Button>
                {/* ✅ Show Stripe Payment Form if clientSecret exists */}
              </form>

            </div>
          </div>

        </div>
      }
    </>
  );
};

const StripePayment = ({ clientSecret, setClientSecret, parentModelClose }: any) => {

  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setClientSecret(null);
    setIsOpen(false);
    parentModelClose(false);
  }

  if (!clientSecret) return <p className="text-red-500">Client Secret not found.</p>;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm clientSecret={clientSecret} open={isOpen} onClose={onClose} />
    </Elements>
  );
};

export default StripePayment;
