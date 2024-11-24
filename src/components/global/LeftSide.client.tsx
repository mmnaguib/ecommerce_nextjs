"use client";

import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "next-intl";
import UserList from "../UserList";

const LeftSideClient = ({ currentUser }: { currentUser: any }) => {
  const { cartItems } = useCart();
  const locale = useLocale();
  return (
    <>
      {currentUser ? (
        <Link href={`/${locale}/cart`} className="relative">
          <span className="absolute -top-[10px] bg-[#f03328] rounded-[50%] w-[20px] h-[20px] text-center text-[13px] text-[#fff] -left-[15px]">
            {cartItems?.length}
          </span>{" "}
          <ShoppingBasket size={24} />
        </Link>
      ) : (
        <></>
      )}
      <UserList currentUser={currentUser} />
    </>
  );
};

export default LeftSideClient;
