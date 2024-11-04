import React from "react";
import LangSwitcher from "./LangSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { ShoppingBasket, User } from "lucide-react";

const Header = () => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <header className="flex justify-between items-center px-11 mb-10 h-12 w-full shadow-md text-green-700 dark:bg-white dark:shadow-[#eaeaea]">
      <div className="rightDiv flex items-center justify-start gap-3">
        <ul className="flex gap-3">
          <li>
            <Link href="/">{t("home")}</Link>
          </li>
          <li>
            <Link href={`/${locale}/about`}>{t("about")}</Link>
          </li>
        </ul>
      </div>
      <div className="middleDiv">
        <form className="flex items-center">
          <input
            type="search"
            placeholder="Search ....."
            className="w-full px-2 py-1 border-2 border-[#f03328] rounded-l focus:outline-0"
          />
          <button className="btn bg-[#f03328] px-2 py-1 border-2 rounded-r border-[#f03328] text-white -ml-.5">
            Search
          </button>
        </form>
      </div>
      <div className="leftDiv flex gap-3 items-center justify-end ">
        <Link href={`/${locale}/cart`} className="relative">
          <span className="absolute -top-[10px] bg-[#f03328] rounded-[50%] w-[20px] h-[20px] text-center text-[13px] text-[#fff] -left-[15px]">
            2
          </span>{" "}
          <ShoppingBasket size={24} />
        </Link>
        <User size={24} />
        <LangSwitcher />
        <ThemeSwitcher />
        {/* <UserList /> */}
      </div>
    </header>
  );
};

export default Header;
