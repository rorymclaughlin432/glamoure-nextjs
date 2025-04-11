import { useCart } from "@/app/cart/CartContext";

export default function CartBadge() {
  const { cartCount } = useCart();

  return (
    <div className="cart-badge">
      {cartCount > 0 && <span className="badge">{cartCount}</span>}
    </div>
  );
}