"use server";

import { createCart, getCart } from "@/src/lib/db/cart";
import { prisma } from "@/src/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if(quantity === 0) {
    if(articleInCart) {
      
      //routed over cart model
      await prisma.cart.update({
        where: { id: cart.id },
        data: { items: { delete: { id: articleInCart.id } } },
      })

      //solely routed over cartItem model
      /* await prisma.cartItem.delete({
        where: { id: articleInCart.id },
      }); */

    }
    return;
  } else {
    if(articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: { items: { update: { where: { id: articleInCart.id }, data: { quantity } } } },
      })
      /* await prisma.cartItem.update({
        where: { id: articleInCart.id },
        data: { quantity },
      }); */
    } else {
      await prisma.cart.update({
        where: { id: cart.id },
        data: { items: { create: { productId, quantity } } },
      })
      /* await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      }); */
    }
  }

  revalidatePath("/cart");
}
