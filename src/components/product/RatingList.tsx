import { IProduct, IReview } from "@/interfaces";
import React from "react";
import Heading from "../global/Heading";
import moment from "moment";
import RatingStar from "../global/RatingStar";
import Image from "next/image";
import { FaUser, FaUserCircle } from "react-icons/fa";

export interface IProps {
  product: IProduct;
}
const RatingList = ({ product }: IProps) => {
  return (
    <div>
      <Heading title="Reviews" />
      {product.reviews.map((review: IReview) => (
        <div key={review.id} className="max-w-[300px]">
          <div className="flex gap-2 items-center">
            <div>
              {review.avatar ? (
                <Image
                  src={review.avatar}
                  alt="user image"
                  className="rounded-full w-8 h-8"
                />
              ) : (
                <FaUserCircle size={24} />
              )}
            </div>
            <div className="font-semibold">{review.useId}</div>
            <div className="font-light">
              {moment(review?.createAt).fromNow()}
            </div>
          </div>
          <div className="mt-2">
            <RatingStar rating={review.rating} />
            <div className="ml-2">{review.comment}</div>
            <hr className="mt-4 mb-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RatingList;
