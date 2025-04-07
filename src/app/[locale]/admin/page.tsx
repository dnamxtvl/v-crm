"use client";

import { useTranslations } from "next-intl";
import { Link } from "../../../../i18n.config";
 
export default function HomePage() {
  const t = useTranslations('homePage');
  return (
    <div>
      <h1>{ t('title') }</h1>
      <Link href="/about">{t('about')}</Link>
    </div>
  );
}