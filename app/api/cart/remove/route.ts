import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db/prisma";
import { getCart } from "@/src/lib/db/cart";

export async function POST(req: Request) {
  try {
    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const cart = await getCart();

    if (!cart) {
      return NextResponse.json(
        { error: "No cart found for the current user" },
        { status: 404 }
      );
    }

    const cartItem = cart.items.find((item) => item.productId === productId);

    if (!cartItem) {
      return NextResponse.json(
        { error: "Item not found in the cart" },
        { status: 404 }
      );
    }

    // Remove the item from the cart
    await prisma.cart.update({
      where: { id: cart.id },
      data: { items: { delete: { id: cartItem.id } } },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return NextResponse.json(
      { error: "An error occurred while removing the item" },
      { status: 500 }
    );
  }
}