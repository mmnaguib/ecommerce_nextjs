import Image from "next/image";
import React from "react";
import bannerImage from "@/../public/images/banner.png";
const Banner = () => {
  return (
    <div className="container mx-auto mt-10 relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Summer Sale
          </h1>
          <p className="text-lg md:text-xl text-white mb-2">
            Enjoy discounts on selected items
          </p>
          <p className="text-2xl md:text-5xl text-[#f03328] font-bold">
            GET 50% OFFER
          </p>
        </div>
        <div className="w-1/3 relative aspect-video">
          <Image
            src={bannerImage}
            fill
            alt="banner image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
