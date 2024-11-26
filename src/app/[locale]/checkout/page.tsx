import FormWrap from "@/components/global/FormWrap";
import React from "react";
import CheckoutClient from "./checkoutClient";

const CheckoutPage = () => {
  return (
    <div className="container mx-auto">
      <FormWrap>
        <CheckoutClient />
      </FormWrap>
    </div>
  );
};

export default CheckoutPage;
