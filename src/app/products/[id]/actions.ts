"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db/prisma";

export async function incrementProductQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const cartItem = cart.Items.find((item) => item.productId === productId);

  if (cartItem) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        Items: {
          update: {
            where: { id: cartItem.id },
            data: { quantity: { increment: 1 } },
          },
        },
      },
    });
  } else {
    await prisma.cart.update({
      where: { id: cart.id },
      data: { Items: { create: { productId, quantity: 1 } } },
    });
  }

  revalidatePath("/products/[id]");
}
