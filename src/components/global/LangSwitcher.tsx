"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import enFlag from "@/../public/images/en.jpg";
import arFlag from "@/../public/images/ar.svg";
import Image from "next/image";
const LangSwitcher = () => {
  const router = useRouter();
  const localActive = useLocale();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const nextLocale = localActive === "en" ? "ar" : "en"; // Switch between "en" and "ar"
    startTransition(() => {
      router.replace(`./${nextLocale}`);
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={toggleLanguage}
      className="cursor-pointer"
    >
      {localActive === "en" ? (
        <div className="w-8 h-8">
          <Image src={arFlag} alt="" />
        </div>
      ) : (
        <div className="w-8 h-8">
          <Image src={enFlag} alt="" />
        </div>
      )}
    </button>
  );
};

export default LangSwitcher;
