"use client";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

import { FC } from "react";

interface CheckoutButtonProps {
  cartItems: Array<{ id: string; quantity: number }>;
}

export const CheckoutButton: FC<CheckoutButtonProps> = ({ cartItems }) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    console.log("Cart items sent to API:", cartItems);
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems }),
    });

    if (!response.ok) {
      console.error("Failed to create checkout session:", await response.text());
      return;
    }

    const { sessionId } = await response.json();
    if (!sessionId) {
      console.error("Invalid sessionId returned from API");
      return;
    }

    if (!stripe) {
      console.error("Stripe failed to initialize.");
      return;
    }

    const result = await stripe.redirectToCheckout({ sessionId });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <button
      className="btn btn-info btn-outline sm:w-[200px]"
      onClick={handleCheckout}
    >
      Checkout
    </button>
  );
};
