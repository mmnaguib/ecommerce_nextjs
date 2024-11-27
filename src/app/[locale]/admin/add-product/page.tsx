import FormWrap from "@/components/global/FormWrap";
import AddProductForm from "@/components/product/AddProductForm";
import React from "react";
import { getCurrentUser } from "../../../../../actions/getCurrentUser";

const ProductPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <p>Opps, Access Denied</p>;
  }
  return (
    <div className="p-8 container mx-auto">
      <FormWrap>
        <AddProductForm />
      </FormWrap>
    </div>
  );
};

export default ProductPage;
