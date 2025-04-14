import { getCart } from "@/src/lib/db/cart";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
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
    <div>
      <h1 className="txt=3xl mb-6 font-bold">Your Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && <p>Your cart is empty</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
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
