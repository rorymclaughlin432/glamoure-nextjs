import { prisma } from "@/src/lib/db/prisma";
import { cookies } from "next/dist/client/components/headers";
import { Cart, Prisma } from "@prisma/client";

export type CartWithProducts = Prisma.CartGetPayload<{
    include  : { items: { include: { product: true } }}
}>

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include: { product: true };
}>

export type ShoppingCart = CartWithProducts & {
    size: number;
    subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
    const localCartId = cookies().get("localCartId")?.value;
    const cart = localCartId ? 
    await prisma.cart.findUnique({
        where: { id: localCartId}, 
        include  : { items: { include: { product: true } }}
    }) : null;

    if (!cart) {
        return null;
    }

    return {
        ...cart,
        size: cart.items.reduce((total, item) => total + item.quantity, 0),
        subtotal: cart.items.reduce((total, item) => total + item.quantity * Number(item.product.price), 0),
 /*        items: cart.items.map((item) => ({
            ...item,
            product: {
                ...item.product,
                price: item.product.price.toString(),
            },
        })) */
    }

}
export async function createCart(): Promise<ShoppingCart> {

    const newCart = await prisma.cart.create({
        data: {
        // ...
        },
    });
    
    //TODO encryption and security for settings in real prod app
    cookies().set("localCartId", newCart.id);
    
    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0,
        
    };

}