import { NextIntlClientProvider } from "next-intl";
import AntdProvider from "@/providers/antdProvider";
import { ReduxProviders } from "@/providers/reduxProvider";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryProvider } from "@/providers/queryProvider";
import '../../assets/globals.scss'
import { getMessages } from "next-intl/server";


export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  const messages = await getMessages();

  return (
    <ReduxProviders>
      <html lang={locale}>
        <body>
          <QueryProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <AntdProvider>
                {children}
              </AntdProvider>
            </NextIntlClientProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryProvider>
        </body>
      </html>
    </ReduxProviders>
  );
}
