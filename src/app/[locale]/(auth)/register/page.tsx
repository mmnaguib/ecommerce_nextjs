import RegisterForm from "@/components/auth/RegisterForm";
import Heading from "@/components/global/Heading";
import React, { useState } from "react";
import { getCurrentUser } from "../../../../../actions/getCurrentUser";

const RegisterPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <RegisterForm currentUser={currentUser} />
    </div>
  );
};

export default RegisterPage;
