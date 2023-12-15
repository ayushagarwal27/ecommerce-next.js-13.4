"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());
  const articlesInCart = cart.Items.find(
    (item) => item.productId === productId
  );

  if (quantity === 0) {
    if (articlesInCart) {
      await prisma?.cartItem.delete({ where: { id: articlesInCart.id } });
    }
  } else {
    if (articlesInCart) {
      await prisma?.cartItem.update({
        where: { id: articlesInCart.id },
        data: { quantity },
      });
    } else {
      await prisma?.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
      });
    }
  }

  revalidatePath("/cart");
}
