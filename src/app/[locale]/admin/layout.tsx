import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav>
      <ul>
        <li>Summary</li>
        <li>Add Product</li>
        <li>Manage Products</li>
        <li>Manage Orders</li>
      </ul>
      <main>{children}</main>
    </nav>
  );
};

export default AdminLayout;
