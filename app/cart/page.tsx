import { getCart } from "@/src/lib/db/cart";
import CartEntry from "./CartEntry";
import { setProductQuantity, removeItem } from "./actions";
import { formatPrice } from "@/src/lib/format";
import { CheckoutButton } from "@/components/CheckoutButton";
import { getUser } from "@/src/lib/db/user";

export const metadata = {
  title: "Your Cart - Glamouré",
};

export default async function cartPage() {
  const currentUser = await getUser();
  if (!currentUser) {
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
      <div className="flex flex-col items-end items-center">
        <p className="mt-4 mb-3 font-bold">
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
            currentUser && currentUser.email
              ? { id: currentUser.id, email: currentUser.email }
              : null
          }
        />
        <p className="text-sm text-gray-500">
          *You will be redirected to Stripe to complete your purchase.
        </p>
      </div>
    </div>
  );
}