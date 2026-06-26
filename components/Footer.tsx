"use client";

import { useTranslations } from "next-intl";
import VenezuelaMoment from "@/components/VenezuelaMoment";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="text-center pb-4 sm:pb-6 px-4 flex flex-col items-center gap-3">
      <VenezuelaMoment />
      <span className="text-xs sm:text-sm text-[#1a1a1a]/50">
        {t("copy")}
      </span>
    </footer>
  );
}