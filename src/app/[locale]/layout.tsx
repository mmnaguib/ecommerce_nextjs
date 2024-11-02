/* eslint-disable @next/next/no-css-tags */
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import "@/app/[locale]/globals.css";

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
      <body className="h-screen bg-white text-black dark:bg-black dark:text-white">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className="p-10">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
