"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const cartItem = cart.Items.find((item) => item.productId === productId);

  if (cartItem) {
    await prisma?.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma?.cartItem.create({
      data: { cartId: cart.id, productId, quantity: 1 },
    });
  }

  revalidatePath("/products/[id]")
}
