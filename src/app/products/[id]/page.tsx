import React, { FC, cache } from "react";
import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import PriceTag from "@/components/PriceTag";
import { Metadata } from "next";
import AddToCartButton from "./AddToCartButton";

interface ProductPageProps {
  params: { id: string };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    notFound();
  }
  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: product.name + "-Shopzinga",
    description: product.description,
    openGraph: { images: [{ url: product.imageUrl }] },
  };
}

const ProductPage: FC<ProductPageProps> = async ({ params: { id } }) => {
  const product = await getProduct(id);
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <AddToCartButton productId={id} />
      </div>
    </div>
  );
};

export default ProductPage;
