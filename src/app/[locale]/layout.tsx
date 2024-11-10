/* eslint-disable @next/next/no-css-tags */
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/global/Header";
import "@/app/[locale]/globals.css";
import Footer from "@/components/global/Footer";
import type { Metadata } from "next";
import CartProvider from "@/providers/CartProvider";

export const metadata: Metadata = {
  title: "Tia Store",
  description: "e-commerce App",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ar" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {locale === "en" ? (
          <link rel="stylesheet" href="/styles/ltr.css" />
        ) : (
          <link rel="stylesheet" href="/styles/rtl.css" />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white">
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <Header />
            <main className="container mx-auto flex-grow">{children}</main>
            <Footer />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
