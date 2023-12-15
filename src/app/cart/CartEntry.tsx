"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useTransition } from "react";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

const quantityOptions: JSX.Element[] = [];

for (let i = 1; i <= 99; i++) {
  quantityOptions[i] = (
    <option value={i} key={i}>
      {i}
    </option>
  );
}
const CartEntry: FC<CartEntryProps> = ({
  cartItem: { product, quantity },
  setProductQuantity,
}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div>
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
          <div>Price: {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:{" "}
            <select
              className="select-bordered select w-full max-w-[80px]"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = e.currentTarget.value;
                startTransition(async () => {
                  await setProductQuantity(product.id, parseInt(newQuantity));
                });
              }}
            >
              <option value={0}>0 (Remove)</option>
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-2">
            Total: {formatPrice(product.price * quantity)}
            {isPending && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </div>
        </div>
      </div>
      <div className="h-[0.2px] bg-gray-400 w-full mb-3" />
    </div>
  );
};

export default CartEntry;
