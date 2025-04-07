import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "vi"] as const;
export const defaultLocale = "vi";
export type Locale = (typeof locales)[number];
export const { Link, usePathname, useRouter } =
    createSharedPathnamesNavigation({ locales });

export const LANGUAGES = {
    vi: 'vi',
    en: 'en',
}