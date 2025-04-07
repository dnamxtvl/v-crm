// middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from '../i18n.config';

// Next-Intl Middleware
const intlMiddleware = createMiddleware({
  defaultLocale,
  locales,
  localeDetection: false,
  localePrefix: 'as-needed',
});

const PUBLIC_ROUTES = ['/auth/login', '/auth/register', '/auth/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.some((path) => pathname.startsWith(path))) {
    return intlMiddleware(request);
  }

  if (request.cookies.get('isLoggedIn')?.value !== 'true' && !pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
