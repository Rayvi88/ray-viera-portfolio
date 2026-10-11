import { getTranslations, getLocale } from "next-intl/server";
import HowIThinkInteractive from "@/components/how-i-think/HowIThinkInteractive";
import SystemicDesignExperience from "@/components/how-i-think/systemic-design/SystemicDesignExperience";

interface Paragraph { bold: string; rest: string; }
interface IconCopy { label: string; desc: string; }

const ICON_SRC: Record<string, string> = {
  see: "/aboutme-01.svg",
  observe: "/aboutme-02.svg",
  understand: "/aboutme-03.svg",
  design: "/aboutme-04.svg",
};

const ICON_KEYS = ["see", "observe", "understand", "design"] as const;

export default async function HowIThink() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "howIThinkPage" });
  const tAbout = await getTranslations({ locale, namespace: "aboutMe" });

  const paragraphs = tAbout.raw("paragraphs") as Paragraph[];
  const iconsRaw = tAbout.raw("icons") as Record<string, IconCopy>;
  const icons = ICON_KEYS.map((key) => ({
    key,
    src: ICON_SRC[key],
    label: iconsRaw[key].label,
    desc: iconsRaw[key].desc,
  }));

  return (
    <section className="flex-1 flex flex-col px-4 sm:px-10 lg:px-20 py-6 lg:py-8 bg-[#FFFCF6] md:justify-center">
      {/* ── Cabecera — título + acceso secundario About me. En desktop en
          una sola fila; en móvil apilados. Margen inferior ajustado para
          que la composición quepa en el viewport en desktop. ── */}
      <div className="flex flex-col gap-4 mb-6 lg:mb-8 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00C3D0]">
          {t("title")}
        </h1>

        <HowIThinkInteractive
          aboutLabel={tAbout("openButton")}
          greeting={tAbout("greeting")}
          paragraphs={paragraphs}
          icons={icons}
        />
      </div>

      {/* ── Contenido principal — Ecosistemas integrada directamente en el
          flujo de la página, sin overlay, diálogo ni tarjeta contenedora.
          Sidebar, canvas y navegación forman parte del home. ── */}
      <SystemicDesignExperience />
    </section>
  );
}
