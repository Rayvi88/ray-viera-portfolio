import { getTranslations, getLocale } from "next-intl/server";
import Projects from "@/components/Projects";

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "projects" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default function ProjectsPage() {
  return <Projects />;
}