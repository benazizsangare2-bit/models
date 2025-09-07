import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import ClientTransition from "../components/ClientTransition";
import { getMessages } from "next-intl/server";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Models & Hostesses",
  description: "Professional models and hostesses for your events",
};

// 🔑 params must be a Promise in v4.3.5
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // ✅ Await the params
  const { locale } = await params;

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <Header locale={locale} />
      <ClientTransition locale={locale}>{children}</ClientTransition>
    </NextIntlClientProvider>
  );
}
