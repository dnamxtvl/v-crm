import { NextResponse, NextRequest } from "next/server";

const defaultLocale = "vi";
const locales = ["en", "vi"];

export default function middleware(request: NextRequest) {
//   if (request.cookies.get('isLogined')?.value !== 'true') {
//     if (!request.nextUrl.pathname.includes('/auth/login')) {
//         return NextResponse.redirect(new URL('/auth/login', request.url));
//     }
//   }

  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
