"use client";

import { User, User2 } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import LangSwitcher from "./global/LangSwitcher";
import ThemeSwitcher from "./global/ThemeSwitcher";
import { signOut } from "next-auth/react";
import BackDrop from "./global/BackDrop";

export default function UserList() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const locale = useLocale();
  return (
    <>
      <div className="relative inline-block text-left">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-1 justify-center w-full border border-gray-300 shadow-sm p-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none rounded-full"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <User2 size={20} />
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            className="z-10 origin-top-right absolute right-0 mt-2 w-[170px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="p-2" role="none">
              <Link
                className="w-full block p-2"
                href={`/${locale}/login`}
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                className="w-full block p-2"
                href={`/${locale}/register`}
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
              <Link
                className="w-full block p-2"
                href={`/${locale}/orders`}
                onClick={() => setIsOpen(false)}
              >
                Your Orders
              </Link>
              <Link
                className="w-full block p-2"
                href={`/${locale}/admin-dashboard`}
                onClick={() => setIsOpen(false)}
              >
                Admin Dashboard
              </Link>
              <Link
                className="w-full block p-2"
                href={`/${locale}/admin-dashboard`}
                onClick={() => {
                  setIsOpen(false);
                  signOut();
                }}
              >
                Sign Out
              </Link>
              <hr className="my-3 bg-slate-700" />
              <div className="flex justify-between">
                <LangSwitcher />
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        )}
        {isOpen ? <BackDrop onClick={toggleDropdown} /> : null}
      </div>
    </>
  );
}
