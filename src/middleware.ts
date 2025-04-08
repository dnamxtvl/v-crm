// middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { defaultLang, locales } from '../i18n.config';
import { ROUTE_APP } from './constants/config/route';

const PUBLIC_ROUTES = ['/auth/register', '/auth/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let defaultLocale = request.cookies.get('lang')?.value as 'en' | 'vi' ?? defaultLang;

  // Next-Intl Middleware
  const intlMiddleware = createMiddleware({
    defaultLocale,
    locales,
    localeDetection: false,
    localePrefix: "as-needed",
  });

  if (PUBLIC_ROUTES.some((path) => pathname.startsWith(path))) {
    return intlMiddleware(request);
  }

  if (request.cookies.get('isLogined')?.value !== 'true' && !pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
