"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";
import { trackLocaleSwitch } from "@/lib/analytics/events";
import { FOCUS_RING, TRANSITION_MICRO } from "@/components/interaction/tokens";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const nextLocale = locale === "en" ? "es" : "en";
    trackLocaleSwitch(locale, nextLocale);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className={`relative text-sm font-medium border border-[#E8E4DC] rounded-full px-3 py-1 before:absolute before:-inset-3 before:content-[''] ${TRANSITION_MICRO} ${FOCUS_RING} ${
        isPending
          ? "text-gray-300 border-gray-200"
          : "text-gray-500 hover:text-[#00C3D0] hover:border-[#00C3D0]"
      }`}
    >
      {locale === "en" ? "ES" : "EN"}
    </button>
  );
}