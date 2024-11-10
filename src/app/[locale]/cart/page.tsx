'use client'
import Heading from "@/components/global/Heading";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import React from "react";

const CartPage = () => {
  const {cartItems} = useCart();
  return (
    <div>
      <Heading title="Shopping Cart"/>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems?.map(item=> (
          <tr>
            <td><Image src={item.image.image} alt="" width={50} height={50}/>{item.name}</td>
            <td>{item.price}</td>
            <td></td>
            <td>{item.price * item.quantity}</td>
          </tr>

          ))}
        </tbody>

      </table>
    </div>
  );
};

export default CartPage;
