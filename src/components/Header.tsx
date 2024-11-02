import React from "react";
import LangSwitcher from "./LangSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ShoppingBasket, User } from "lucide-react";

const Header = () => {
  const t = useTranslations();

  return (
    <header className="flex justify-between p-3 h-12 w-full shadow-md text-green-700 dark:bg-white dark:shadow-[#eaeaea]">
      <div className="rightDiv flex items-center justify-center gap-3"></div>
      <div className="middleDiv">
        <ul className="flex gap-3">
          <li>
            <Link href="/">{t("home")}</Link>
          </li>
          <li>
            <Link href="/about">{t("about")}</Link>
          </li>
        </ul>
      </div>
      <div className="leftDiv flex gap-3 items-center">
        <User size={24} />
        <ShoppingBasket size={24} />
        <LangSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
