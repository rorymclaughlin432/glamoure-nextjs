"use client";

import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import { setProductQuantity } from "./../app/cart/actions";
import { incrementProductQuantity } from "./../app/products/[id]/actions";

export default function QuantitySelector({
  productId,
  initialQuantity = 1,
}: {
  productId: string;
  initialQuantity?: number;
}) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
    incrementProductQuantity(productId);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      setProductQuantity(productId, newQty);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleDecrement} className="btn btn-secondary btn-sm">
        -
      </button>
      <span>{quantity}</span>
      <button onClick={handleIncrement} className="btn btn-secondary btn-sm">
        +
      </button>
      <AddToCartButton
        productId={productId}
        incrementProductQuantity={incrementProductQuantity}
      />
    </div>
  );
}
