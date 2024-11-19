"use client";
import Button from "@/components/global/Button";
import Heading from "@/components/global/Heading";
import SetQuantity from "@/components/product/SetQauntity";
import { useCart } from "@/hooks/useCart";
import { ICartItem } from "@/interfaces";
import { formatPrice } from "@/utils/formatMony";
import { truncateTxt } from "@/utils/truncateTxt";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { MdArrowBack } from "react-icons/md";

const CartPage = () => {
  const {
    cartItems,
    cartTotalQty,
    handleRemoveFromCart,
    clearCart,
    handleIncreaseQty,
    handleDecreaseQty,
    totalProductsInCart,
  } = useCart();
  const locale = useLocale();
  return (
    <>
      {cartItems && cartItems.length === 0 ? (
        <div className="flex flex-col items-center">
          <div className="text-2xl">Your Cart Is Empty</div>
          <Link
            href={`/`}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      ) : (
        <>
          <Heading title="Shopping Cart" center />
          <div className="grid grid-cols-5 text-xs gap-4 pb-2 mt-8 items-center">
            <div className="col-span-2 justify-self-start">Product</div>
            <div className="justify-self-center">Price</div>
            <div className="justify-self-center">Quantity</div>
            <div className="justify-self-end">Total</div>
          </div>

          <div>
            {cartItems.length &&
              cartItems.map((item: ICartItem) => (
                <div
                  className="grid grid-cols-5 text-xs gap-4 mt-8 items-center md:text-sm border-t-[1.5px] border-slate-2 py-4"
                  key={item.id}
                >
                  <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                    <div
                      className="relative"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <Image
                        src={item.image.image}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex flex-col justify-between">
                        {truncateTxt(item.name)}
                        <div>{item?.image.color}</div>
                        <button
                          className="text-slate-500 underline"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="justify-self-center">
                    {formatPrice(item.price)}
                  </div>
                  <div className="flex gap-2 items-center justify-self-center">
                    <SetQuantity
                      cartCounter={true}
                      cartProduct={item}
                      handleIncrease={() => {
                        handleIncreaseQty(item);
                      }}
                      handleDecrease={() => {
                        handleDecreaseQty(item);
                      }}
                    />
                  </div>
                  <div className="justify-self-end">
                    {item.price * item.quantity}
                  </div>
                </div>
              ))}
          </div>

          <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
            <div className="w-[90px]">
              <Button
                label="Clear Cart"
                outline
                small
                onClick={() => clearCart()}
              />
            </div>
            <div className="text-sm flex flex-col gap-1 items-start">
              <>
                <div className="flex justify-between w-full text-base font-semibold">
                  <span>
                    SubTotal for{" "}
                    <span className="text-[#f03328]">
                      {totalProductsInCart}
                    </span>{" "}
                    products
                  </span>
                  <span>{formatPrice(cartTotalQty)}</span>
                </div>
                <p className="text-slate-500">
                  Taxs and shipping calculate at checkout
                </p>
              </>
              <Button label="Checkout" onClick={() => {}} />
              <Link
                href={`/`}
                className="text-slate-500 flex items-center gap-1 mt-2"
              >
                <MdArrowBack />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartPage;
