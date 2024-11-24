"use client";
import React from "react";
import AdminNavItem from "./AdminNavItem";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import Link from "next/link";
import { useLocale } from "next-intl";

const AdminNav = () => {
  const pathName = usePathname();
  const locale = useLocale();
  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <div className="container mx-auto">
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href={`/${locale}/admin`}>
            <AdminNavItem
              label="Summary"
              icon={MdDashboard}
              selected={pathName === `/${locale}/admin`}
            />
          </Link>
          <Link href={`/${locale}/admin/add-product`}>
            <AdminNavItem
              label="Add Product"
              icon={MdLibraryAdd}
              selected={pathName === `/${locale}/admin/add-product`}
            />
          </Link>
          <Link href={`/${locale}/admin/manage-products`}>
            <AdminNavItem
              label="Manage Products"
              icon={MdDns}
              selected={pathName === `/${locale}/admin/manage-products`}
            />
          </Link>
          <Link href={`/${locale}/admin/manage-orders`}>
            <AdminNavItem
              label="Manage Orders"
              icon={MdFormatListBulleted}
              selected={pathName === `/${locale}/admin/manage-orders`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
