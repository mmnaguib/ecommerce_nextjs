import React from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import LeftSide from "./LeftSide";

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
        <LeftSide />
      </div>
    </header>
  );
};

export default Header;
