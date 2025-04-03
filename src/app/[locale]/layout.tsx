import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ReduxProviders } from "@/providers/provider";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryProvider } from "@/providers/queryProvider";
import '../../assets/globals.css'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <ReduxProviders>
      <html lang={locale}>
        <body>
          <QueryProvider>
            <NextIntlClientProvider>
              <AntdRegistry>{children}</AntdRegistry>
            </NextIntlClientProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryProvider>
        </body>
      </html>
    </ReduxProviders>
  );
}
