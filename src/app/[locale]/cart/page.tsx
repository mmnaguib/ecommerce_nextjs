'use client'
import Heading from "@/components/global/Heading";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import React from "react";

const CartPage = () => {
  const {cartItems, cartTotalQty} = useCart();
  return (
    <div>
      <Heading title="Shopping Cart"/>
      
      <table style={{width:'100%'}} border={1}>
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
          <tr key={item.id}>
            <td style={{display: 'flex',alignItems: 'center'}}><Image src={item.image.image} alt="" width={50} height={50}/>{item.name}</td>
            <td>{item.price}</td>
            <td>{cartTotalQty}</td>
            <td>{item.price * item.quantity}</td>
          </tr>

          ))}
        </tbody>

      </table>
    </div>
  );
};

export default CartPage;
