"use client";

import { CartItemWithProduct } from "@/src/lib/db/cart";
import { formatPrice } from "@/src/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>; // Add removeItem prop
}

export default function CartEntry({
  cartItem: { product, quantity },
  setProductQuantity,
  removeItem,
}: CartEntryProps) {
  const [isPending, startTransition] = useTransition();

  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 xs:flex-col sm:flex-col md:flex-row lg:flex-row">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
          <Link href={"/products/" + product.id} className="font-bold">
            {product.name}
          </Link>
          <div>Price: {formatPrice(Number(product.price))}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select
              className="select-bordered select w-full max-w-[80px]"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                startTransition(async () => {
                  await setProductQuantity(product.id, newQuantity);
                });
              }}
            >
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-3">
            Total: {formatPrice(Number(product.price) * quantity)}
            {isPending && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </div>
          <button
            className="btn btn-error btn-sm mt-2"
            onClick={() => {
              startTransition(async () => {
                await removeItem(product.id);
              });
            }}
          >
            Remove Item
          </button>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}