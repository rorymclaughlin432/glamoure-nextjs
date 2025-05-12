import { getCart } from "@/src/lib/db/cart";
import CartEntry from "./CartEntry";
import { setProductQuantity, removeItem } from "./actions";
import { formatPrice } from "@/src/lib/format";
import { CheckoutButton } from "@/components/CheckoutButton";
import { authOptions } from "@/src/lib/auth/authOptions";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Your Cart - Glamouré",
};

export default async function cartPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-bold">
          You must be logged in to view your cart.
        </p>
      </div>
    );
  }

  const cart = await getCart();

  return (
    <div className="container mx-auto flex flex-col rounded-lg bg-gray-100 p-4 shadow-md">
      <h1 className="mb-6 text-3xl font-bold">
        Your Cart:{" "}
        {cart?.items.length === 1
          ? "1 Item"
          : `${cart?.items.length || 0} Items`}
      </h1>
      {cart?.items.map((cartItem) => (
        <div key={cartItem.id}>
          <CartEntry
            cartItem={cartItem}
            setProductQuantity={setProductQuantity}
            removeItem={removeItem}
          />
        </div>
      ))}
      {!cart?.items.length && <p>Your cart is empty</p>}
      <div className="flex flex-col items-center">
        <p className="mb-3 mt-4 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <CheckoutButton
          cartItems={
            cart?.items?.map(({ id, quantity, product: { price, name } }) => ({
              id,
              quantity,
              price: Number(price),
              name: name,
            })) || []
          }
          user={
            session.user && session.user.email
              ? {
                  id: session.user.id,
                  email: session.user.email,
                }
              : null
          }
        />
        <p className="mt-5 text-sm text-gray-500">
          *You will be redirected to Stripe to complete your purchase.
        </p>
      </div>
    </div>
  );
}
