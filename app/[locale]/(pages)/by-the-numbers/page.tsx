import { getTranslations } from "next-intl/server";
import ByTheNumbers from "@/components/ByTheNumbers";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "byTheNumbers" });
  return { title: t("title") };
}

export default function ByTheNumbersPage() {
  return <ByTheNumbers />;
}