import { getTranslations, getLocale } from "next-intl/server";
import CaseStudyOperationalUx from "@/components/CaseStudyOperationalUx";

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "caseStudyOperationalUx" });

  return {
    title: t("overview.title"),
    description: t("overview.desc"),
  };
}

export default function OperationalUxPage() {
  return <CaseStudyOperationalUx />;
}