import { getTranslations, getLocale } from "next-intl/server";
import CaseStudyLuxuryBrand from "@/components/CaseStudyLuxuryBrand";

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "caseStudyLuxuryBrand" });

  return {
    title: t("overview.title"),
    description: t("overview.desc"),
  };
}

export default function LuxuryBrandPage() {
  return <CaseStudyLuxuryBrand />;
}