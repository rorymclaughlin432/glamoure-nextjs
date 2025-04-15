"use server";

import { createCart, getCart } from "@/src/lib/db/cart";
import { prisma } from "@/src/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: { items: { delete: { id: articleInCart.id } } },
      });
    }
    return;
  } else {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: { items: { update: { where: { id: articleInCart.id }, data: { quantity } } } },
      });
    } else {
      await prisma.cart.update({
        where: { id: cart.id },
        data: { items: { create: { productId, quantity } } },
      });
    }
  }

  revalidatePath("/cart");
}

export async function clearCart(setCartCount: (count: number) => void) {
  const cart = await getCart();

  if (!cart) {
    console.error("No cart found to clear.");
    return;
  }

  await prisma.cart.update({
    where: { id: cart.id },
    data: { items: { deleteMany: {} } }, // Deletes all items in the cart
  });

  setCartCount(0);

  revalidatePath("/cart"); // Revalidate the cart page to reflect the changes
}

export async function removeItem(productId: string) {
  const cart = await getCart();

  if (!cart) {
    throw new Error("No cart found for the current user");
  }

  const cartItem = cart.items.find((item) => item.productId === productId);

  if (!cartItem) {
    throw new Error("Item not found in the cart");
  }

  // Remove the item from the cart
  await prisma.cart.update({
    where: { id: cart.id },
    data: { items: { delete: { id: cartItem.id } } },
  });

  revalidatePath("/cart");
}
