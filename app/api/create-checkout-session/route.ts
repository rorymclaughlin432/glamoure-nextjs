import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    console.log("Received items:", items);
    // Transform cart items into Stripe line items
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}