import React from "react";
import { getCurrentUser } from "../../../actions/getCurrentUser";
import LeftSideClient from "./LeftSide.client";

const LeftSide = async () => {
  const currentUser = await getCurrentUser();
  return <LeftSideClient currentUser={currentUser} />;
};

export default LeftSide;
