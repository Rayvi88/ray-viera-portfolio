"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="text-center text-xs sm:text-sm pb-4 sm:pb-6 px-4 text-[#1a1a1a]/50">
          {t("copy")}
    </footer>
  );
}