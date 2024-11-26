import FormWrap from "@/components/global/FormWrap";
import React from "react";
import CheckoutClient from "./CheckoutClient";

const CheckoutPage = () => {
  return (
    <div className="container my-10 mx-auto">
      <FormWrap>
        <CheckoutClient />
      </FormWrap>
    </div>
  );
};

export default CheckoutPage;
