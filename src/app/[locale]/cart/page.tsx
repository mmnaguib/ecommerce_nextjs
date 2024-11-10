import Heading from "@/components/global/Heading";
import React from "react";

const CartPage = () => {
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
          <tr>
            <td></td>
            <td>$550</td>
            <td></td>
            <td>$550</td>
          </tr>
        </tbody>

      </table>
    </div>
  );
};

export default CartPage;
