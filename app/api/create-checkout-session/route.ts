import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/src/lib/db/prisma";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    console.log("Received items:", items);
    const userId = items.userId;
    const cartItems = items.cartItems;
    if (!cartItems || cartItems.length === 0) {
      throw new Error("Cart items are missing in request body");
    }
    if (!userId) {
      throw new Error("User ID is missing in request body");
    }
    // Transform cart items into Stripe line items
    const lineItems = cartItems.map((item: any) => ({
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
      metadata: {
        userId,
        cartItems: JSON.stringify(cartItems),
      },
    });

    if (!userId) {
      throw new Error("User ID is missing in session metadata");
    }

    if (!cartItems || cartItems.length === 0) {
      throw new Error("Cart items are missing in session metadata");
    }

    // Save the order to the database
    await prisma.order.create({
      data: {
        userId,
        items: cartItems.map((item: any) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
        })),
        totalAmount: session.amount_total! / 100,
        paymentStatus: "Paid",
      },
    });

    console.log("Order saved successfully!");

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
