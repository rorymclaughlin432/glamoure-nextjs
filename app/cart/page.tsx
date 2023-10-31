import { getCart } from "@/src/lib/db/cart";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/src/lib/format";

export const metadata = {
  title: "Your Cart - Glamouré",
};

export default async function cartPage() {
  const cart = await getCart();
  return (
    <div>
      <h1 className="mb-6 txt=3xl font-bold">Your Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && ( <p>Your cart is empty</p>)}
      <div className="flex flex-col items-end sm:items-center">
      <p className="mb-3 font-bold">
        Total: {formatPrice(cart?.subtotal || 0)}
      </p>
      <button className="btn btn-outline btn-success sm:w-[200px]">Checkout</button>
      </div>
    </div>
  );
}
