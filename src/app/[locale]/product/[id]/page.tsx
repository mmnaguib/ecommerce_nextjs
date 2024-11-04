import React from "react";
import { getAllProducts } from "../../../../../actions/productsActions";
import { IProduct, IReview } from "@/interfaces";
import RatingStar from "@/components/RatingStar";

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const products: IProduct[] = await getAllProducts();
  const product = products.find((product) => product.id === params.id);
  const rateAverage =
    product?.reviews.reduce(
      (acc: number, item: IReview) => item.rating + acc,
      0
    ) / (product?.reviews.length ? product?.reviews.length : 1);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>images</div>
        <div className="flex flex-col gap-1 text-slate-500 text-sm">
          <h2 className="text-3xl font-medium text-slate-700">
            {product?.name}
          </h2>
          <hr className="w-[30%] my-2" />
          <div className="flex items-center gap-2">
            <RatingStar rating={rateAverage} />
            <div>{product?.reviews.length}</div>
          </div>
          <div className="text-justify">{product?.description}</div>
          <div className="font-semibold">
            <span>Category: </span>
            <span>{product?.categoryId}</span>
          </div>
          <div className={product?.stock ? "text-teal-400" : "text-rose-400"}>
            {product?.stock ? "In Stock" : "Out Stock"}
          </div>
          <hr className="w-[30%] my-2" />
          <div className="">
            <span>Colors</span>
          </div>
          <hr className="w-[30%] my-2" />
          <div className="">
            <span>Quantity:</span>
          </div>
          <hr className="w-[30%] my-2" />
          <div className="">add to cart</div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
