"use client";

import { CartItemWithProduct } from "@/src/lib/db/cart";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/src/lib/format";
import { useTransition } from "react";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>; // Add removeItem prop
}

export default function CartEntry({
  cartItem,
  setProductQuantity,
  removeItem,
 }: CartEntryProps) {
  const [isPending, startTransition] = useTransition();
  const handleQuantityChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    const newQuantity: number = Math.max(1, Number(event.target.value));
    await setProductQuantity(cartItem.product.id, newQuantity);
    redirect("/cart"); // Reload the page to reflect changes
  };

  const handleRemove = async () => {
    await removeItem(cartItem.product.id);
    redirect("/cart"); // Reload the page to reflect changes
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
      <Image
          src={cartItem.product.imageUrl}
          alt={cartItem.product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <Link href={"/products/" + cartItem.product.id} className="font-bold">
            {cartItem.product.name}
          </Link>
        <p className="text-sm text-gray-500">{cartItem.product.description}</p>

      </div>
      <div className="flex items-center gap-4">
      <div>{formatPrice(Number(cartItem.product.price))}</div>
        <input
          type="number"
          defaultValue={cartItem.quantity}
          onChange={handleQuantityChange}
          className="w-16 p-2 border rounded-lg"
          min={1}
        />
        <button className="btn btn-error btn-sm mt-2"
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                handleRemove();
              });
            }}>
          Remove
        </button>
      </div>
    </div>
  );
}
