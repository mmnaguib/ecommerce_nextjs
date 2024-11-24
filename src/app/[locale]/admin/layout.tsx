import AdminNav from "@/components/admin/AdminNav";
import Link from "next/link";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav>
        <AdminNav />
      </nav>
      <main>{children}</main>
    </>
  );
};

export default AdminLayout;
