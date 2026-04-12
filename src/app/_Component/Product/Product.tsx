
import { log } from "console";
import React from "react";
import { getProduct } from "@/apis/Product.api";
import ProductItem from "../ProductItem/ProductItem";

export default async function Product() {
  const data = await getProduct();
  console.log(data);

  return (
    <>
    <h2 className="my-8 text-2xl font-semibold">
      Featured  <span className="text-green-500 underline">Products</span>
      </h2>

      <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-5 py-10">
        {data.map((prod) => (
          <ProductItem prod={prod} key={prod._id}></ProductItem>
        ))}
      </div>
    </>
  );
}
