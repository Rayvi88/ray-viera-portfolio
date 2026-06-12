import { getTranslations, getLocale } from "next-intl/server";
import StrategicExplorations from "@/components/StrategicExplorations";

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "strategicExplorations" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default function StrategicExplorationsPage() {
  return <StrategicExplorations />;
}