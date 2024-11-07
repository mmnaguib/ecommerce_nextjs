import React from "react";
import { getAllProducts } from "../../actions/productsActions";
import { IProduct } from "@/interfaces";
import ProductCard from "./product/ProductCard";

const HomeProducts = async () => {
  const products: IProduct[] = await getAllProducts();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {products.map((product: IProduct) => (
        <div className="product" key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default HomeProducts;
