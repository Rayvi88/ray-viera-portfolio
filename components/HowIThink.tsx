import { getTranslations, getLocale } from "next-intl/server";
import PhotoReveal from "@/components/PhotoReveal";

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

  const systems = t.raw("systems") as string[];

  return (
    <section className="flex-1 flex flex-col px-4 sm:px-10 lg:px-20 py-12 lg:py-20 bg-[#FFFCF6]">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00C3D0] mb-10 lg:mb-14">
        {t("title")}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 items-stretch">
        {/* ── Columna izquierda — texto ── */}
        <div className="flex flex-col">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] leading-tight mb-1">
            {tAbout("greeting")}
          </h2>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#00C3D0] leading-tight mb-6">
            Ray Viera.
          </h2>

          <div className="w-8 h-[2px] bg-[#00C3D0] mb-6" />

          <div className="space-y-3 mb-10">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-sm sm:text-base text-[#1a1a1a]/70 leading-relaxed">
                {p.bold && <span className="font-semibold text-[#1a1a1a]/90">{p.bold} </span>}
                {p.rest}
              </p>
            ))}
          </div>

          {/* ── Flujo de 4 pasos ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10 w-full">
            {icons.map((icon, i) => (
              <div key={icon.key} className="flex items-center gap-2 min-w-0">
                <div className="group flex flex-col items-center justify-center text-center gap-2.5 px-3 sm:px-4 py-4 sm:py-5 rounded-2xl border border-[#E8E4DC] bg-white/50 w-full h-full min-w-0 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#00C3D0]/50 hover:bg-white hover:shadow-md">

                  {/* Icon */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex-shrink-0 flex items-center justify-center bg-[#00C3D0]/10 transition-transform duration-300 ease-out group-hover:scale-105">
                    <img
                      src={icon.src}
                      alt={icon.label}
                      className="w-6 h-6 sm:w-7 sm:h-7"
                    />
                  </div>

                  {/* Label */}
                  <span className="text-xs sm:text-sm font-bold text-[#1a1a1a] leading-tight">
                    {icon.label}
                  </span>

                  {/* Description */}
                  <span className="text-[10px] sm:text-xs text-gray-500 leading-snug max-w-[120px]">
                    {icon.desc}
                  </span>
            </div>

      {/* Arrow — desktop only */}
      {i < icons.length - 1 && (
        <span className="text-[#00C3D0]/50 text-lg flex-shrink-0 hidden lg:inline">
          →
        </span>
      )}
    </div>
  ))}
</div>

          {/* ── Tres sistemas ── */}
          <p className="text-xs sm:text-sm text-[#1a1a1a]/60 mb-3">
            {t("systemsIntro")}
          </p>
          <div className="flex flex-wrap gap-3">
            {systems.map((label, i) => (
              <span
                key={i}
                className="px-4 py-2 text-[10px] sm:text-xs font-mono tracking-[0.1em] uppercase rounded-full bg-[#1a1a1a] text-[#FFFCF6] transition-colors duration-300 hover:bg-[#00C3D0] cursor-default"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Columna derecha — Photo Reveal, sin guías ── */}
        {/* ── Columna derecha — Photo Reveal, sin guías ── */}
        <div className="relative w-full h-[495px] sm:h-[530px] lg:h-[72vh] max-h-[570px] rounded-2xl overflow-hidden">
          <PhotoReveal
            front="/profile-01.jpg"
            back="/profile-02.png"
            showHandle={false}
          />
        </div>
      </div>
    </section>
  );
}