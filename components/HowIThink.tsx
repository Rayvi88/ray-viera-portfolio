import { getTranslations, getLocale } from "next-intl/server";

const icons = [
  <svg key="search" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#00C3D0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>,
  <svg key="ui" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#00C3D0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="3" width="7" height="18" rx="1"/><line x1="6" y1="7" x2="7" y2="7"/><line x1="6" y1="10" x2="7" y2="10"/><line x1="6" y1="13" x2="7" y2="13"/><path d="M13 5l4 4-6 6H7v-4l6-6z"/></svg>,
  <svg key="grid" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#00C3D0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  <svg key="stack" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#00C3D0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><ellipse cx="12" cy="6" rx="9" ry="3"/><path d="M3 6v4c0 1.657 4.03 3 9 3s9-1.343 9-3V6"/><path d="M3 10v4c0 1.657 4.03 3 9 3s9-1.343 9-3v-4"/></svg>,
  <svg key="star" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#00C3D0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z"/></svg>,
  <svg key="trend" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#00C3D0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
];

export default async function HowIThink() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "howIThinkPage" });

  const cards = [
    { icon: icons[0], title: t("card1title"), desc: t("card1desc") },
    { icon: icons[1], title: t("card2title"), desc: t("card2desc") },
    { icon: icons[2], title: t("card3title"), desc: t("card3desc") },
    { icon: icons[3], title: t("card4title"), desc: t("card4desc") },
    { icon: icons[4], title: t("card5title"), desc: t("card5desc") },
    { icon: icons[5], title: t("card6title"), desc: t("card6desc") },
  ];

  return (
    <section className="flex-1 flex flex-col px-4 sm:px-10 lg:px-20 py-12 lg:py-20 bg-[#FFFCF6]">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00C3D0] mb-10 lg:mb-14">
        {t("title")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {cards.map((card, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-transparent transition-all duration-300 hover:bg-[#F7F4EE] hover:shadow-md hover:-translate-y-1"
          >
            <div className="mb-2">{card.icon}</div>
            <h3 className="text-base font-bold text-gray-800">{card.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}