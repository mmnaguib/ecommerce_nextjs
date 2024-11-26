import { IProduct, IReview } from "@/interfaces";
import { formatPrice } from "@/utils/formatMony";
import { truncateTxt } from "@/utils/truncateTxt";
import Image from "next/image";
import React from "react";
import RatingStar from "../global/RatingStar";
import Link from "next/link";
import { useLocale } from "next-intl";

const ProductCard = ({ product }: { product: IProduct }) => {
  const rateAverage = product.reviews
    ? product?.reviews?.reduce(
        (acc: number, item: IReview) => item.rating + acc,
        0
      ) / (product.reviews?.length ? product.reviews?.length : 1)
    : 0;

  const locale = useLocale();
  return (
    <Link href={`${locale}/product/${product.id}`}>
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
          <div className="mt-4">{truncateTxt(product.name)}</div>
          <RatingStar rating={rateAverage} />
          <div>{product.reviews?.length + " reviews"}</div>
          <div className="font-semibold">{formatPrice(product.price)}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
