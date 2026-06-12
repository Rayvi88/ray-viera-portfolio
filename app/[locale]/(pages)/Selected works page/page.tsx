import { getTranslations, getLocale } from "next-intl/server";
import SelectedWorksPage from "@/components/SelectedWorksPage";

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "selectedWorks" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default function SelectedWorksPageRoute() {
  return <SelectedWorksPage />;
}