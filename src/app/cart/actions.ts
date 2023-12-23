"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db/prisma";

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());
  const articlesInCart = cart.Items.find(
    (item) => item.productId === productId
  );

  if (quantity === 0) {
    if (articlesInCart) {
      await prisma?.cart.update({
        where: { id: cart.id },
        data: { Items: { delete: { id: articlesInCart.id } } },
      });
    }
  } else {
    if (articlesInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          Items: {
            update: { where: { id: articlesInCart.id }, data: { quantity } },
          },
        },
      });
    } else {
      await prisma.cart.update({
        where: { id: cart.id },
        data: { Items: { create: { productId, quantity } } },
      });
    }
  }

  revalidatePath("/cart");
}
