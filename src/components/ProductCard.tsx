import { IProduct } from "@/interfaces";
import Image from "next/image";
import React from "react";

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <div className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm">
      <div className="flex flex-col items-center w-full gap-1">
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            fill
            className="w-full h-full object-contain"
            src={product?.images[0]?.image}
            alt=""
          />
        </div>
        <div>{product.name}</div>
        <div>{product.reviews?.length}</div>
        <div>{product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
