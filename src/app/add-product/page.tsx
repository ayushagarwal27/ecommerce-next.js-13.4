import { Metadata } from "next";
import React from "react";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import FormSubmitButton from "@/components/FormSubmitButton";

export const metadata: Metadata = {
  title: "Add Product - Shopzinga",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw new Error("Missing required fields");
  }

  await prisma.product.create({ data: { name, description, imageUrl, price } });

  redirect("/");
}

const AddProductPage = () => {
  return (
    <div className="py-3">
      <form action={addProduct}>
        <input
          required
          type="text"
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
        />
        <input
          required
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          min={0}
          type="number"
          className="input-bordered input mb-3 w-full"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
};

export default AddProductPage;
