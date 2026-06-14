"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { trackHeroCtaClick } from "@/lib/analytics/events";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="flex-1 flex items-center px-4 sm:px-10 lg:px-20">
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          {t("headline1")}
          <br />
          {t("headline2")} <span className="text-[#00C3D0]">{t("highlight")}</span>
        </h1>

        <p className="mt-4 lg:mt-6 text-sm sm:text-base text-gray-600">
          {t("subheadline")}
        </p>

        <div className="mt-6 lg:mt-8 flex gap-3 lg:gap-4">
          <Link
            href="/contact"
            onClick={() => trackHeroCtaClick("contact")}
            className="border border-black rounded-full px-5 sm:px-6 py-2 text-sm sm:text-base hover:bg-[#00C3D0] hover:text-white hover:border-[#00C3D0] transition"
          >
            {t("contactMe")}
          </Link>

          <Link
            href="/selected-works"
            onClick={() => trackHeroCtaClick("selected_works")}
            className="border border-black rounded-full px-5 sm:px-6 py-2 text-sm sm:text-base hover:bg-[#00C3D0] hover:text-white hover:border-[#00C3D0] transition"
          >
            {t("selectedWorks")}
          </Link>
        </div>
      </div>
    </section>
  );
}