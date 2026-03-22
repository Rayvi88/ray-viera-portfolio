import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function ByTheNumbers() {
  const t = await getTranslations("byTheNumbers");

  const stats = [
    { img: t("stat1number"), label: t("stat1label") },
    { img: t("stat2number"), label: t("stat2label") },
    { img: t("stat3number"), label: t("stat3label") },
  ];

  return (
    <section className="flex-1 flex items-center px-4 sm:px-10 lg:px-20 py-12 lg:py-20 bg-[#FFFCF6]">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Columna izquierda — título + párrafos */}
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00C3D0]">
            {t("title")}
          </h1>
          <div className="flex flex-col gap-5 text-sm sm:text-base text-gray-700 leading-relaxed">
            <p>
              <span className="font-bold text-black">{t("p1bold")}</span>
              {t("p1")}
            </p>
            <p>
              <span className="font-bold text-black">{t("p2bold")}</span>
              {t("p2")}
            </p>
            <p>
              <span className="font-bold text-black">{t("p3bold")}</span>
              {t("p3")}
            </p>
            <p>
              <span className="font-bold text-black">{t("p4bold")}</span>
              {t("p4")}
            </p>
          </div>
        </div>

        {/* Columna derecha — stats */}
        <div className="flex flex-col gap-8 lg:gap-10">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Image
                src={stat.img}
                alt={stat.label}
                width={200}
                height={160}
                className="object-contain max-h-[140px] sm:max-h-[160px]"
              />
              <p className="text-sm font-semibold text-[#00C3D0] text-center">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}