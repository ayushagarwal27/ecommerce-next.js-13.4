import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Product - Shopzinga",
};

const AddProductPage = () => {
  return (
    <div className="py-3">
      <form>
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
          type="number"
          className="input-bordered input mb-3 w-full"
        />
        <button type="submit" className="btn-primary btn-block btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
