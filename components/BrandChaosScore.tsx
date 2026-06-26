"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

type Screen = "intro" | "question" | "email" | "results";

const DIM_KEYS = ["identity", "content", "assets", "processes", "scalability"] as const;
type DimKey = typeof DIM_KEYS[number];

const DIM_MAX: Record<DimKey, number> = {
  identity: 6,
  content: 6,
  assets: 9,
  processes: 9,
  scalability: 6,
};

const Q_DIM_MAP: DimKey[] = [
  "identity", "identity",
  "content", "content",
  "assets", "assets", "assets",
  "processes", "processes", "processes",
  "scalability", "scalability",
];

function getLevel(score: number): "chaotic" | "deficient" | "functional" | "scalable" {
  if (score <= 30) return "chaotic";
  if (score <= 55) return "deficient";
  if (score <= 75) return "functional";
  return "scalable";
}

function getLevelColor(level: string) {
  const map: Record<string, string> = {
    chaotic: "bg-red-50 text-red-700",
    deficient: "bg-amber-50 text-amber-700",
    functional: "bg-[#F1EFE8] text-[#5F5E5A]",
    scalable: "bg-[#E1F5EE] text-[#0F6E56]",
  };
  return map[level] || "";
}

export default function BrandChaosScore() {
  const t = useTranslations("nexaLab.lab01");
  const [screen, setScreen] = useState<Screen>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(12).fill(null));
  const [email, setEmail] = useState("");
  const [scores, setScores] = useState<{ score100: number; dimPct: Record<DimKey, number> } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<unknown>(null);

  const questions = t.raw("questions") as Array<{ dim: DimKey; text: string; options: string[] }>;

  function calcScores() {
    let total = 0;
    const dims: Record<DimKey, number> = {
      identity: 0, content: 0, assets: 0, processes: 0, scalability: 0,
    };
    answers.forEach((a, i) => {
      const pts = a ?? 0;
      total += pts;
      dims[Q_DIM_MAP[i]] += pts;
    });
    const score100 = Math.round((total / 36) * 100);
    const dimPct = {} as Record<DimKey, number>;
    DIM_KEYS.forEach(d => {
      dimPct[d] = Math.round((dims[d] / DIM_MAX[d]) * 100);
    });
    return { score100, dimPct };
  }

  function handleSelect(optionIndex: number) {
    const newAnswers = [...answers];
    newAnswers[current] = optionIndex;
    setAnswers(newAnswers);
  }

  function goNext() {
    if (answers[current] === null) return;
    if (current < 11) {
      setCurrent(current + 1);
    } else {
      setScreen("email");
    }
  }

  function goBack() {
    if (current > 0) setCurrent(current - 1);
  }

  function showResults() {
    const result = calcScores();
    setScores(result);
    setScreen("results");
  }

  useEffect(() => {
    if (screen !== "results" || !scores || !canvasRef.current) return;

    const buildChart = async () => {
      const { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler } = await import("chart.js");
      Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler);

      if (chartRef.current) {
        (chartRef.current as { destroy: () => void }).destroy();
      }

      const dims = t.raw("dimensions") as Record<DimKey, string>;
      chartRef.current = new Chart(canvasRef.current!, {
        type: "radar",
        data: {
          labels: DIM_KEYS.map(d => dims[d]),
          datasets: [{
            data: DIM_KEYS.map(d => scores.dimPct[d]),
            backgroundColor: "rgba(201,168,130,0.15)",
            borderColor: "#00C3D0",
            borderWidth: 2,
            pointBackgroundColor: "#00C3D0",
            pointRadius: 4,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: { legend: { display: false } },
          scales: {
            r: {
              min: 0,
              max: 100,
              ticks: { display: false, stepSize: 25 },
              grid: { color: "rgba(128,128,128,0.12)" },
              angleLines: { color: "rgba(128,128,128,0.12)" },
              pointLabels: { font: { size: 11 }, color: "#888" },
            },
          },
        },
      });
    };

    buildChart();
  }, [screen, scores]);

  const level = scores ? getLevel(scores.score100) : null;
  const risks = t.raw("risks") as Record<DimKey, string>;
  const priorities = t.raw("priorities") as Record<DimKey, { action: string; sub: string }>;
  const levelDescriptions = t.raw("levelDescriptions") as Record<string, string>;
  const ctaMessages = t.raw("ctaMessages") as Record<string, string>;
  const levels = t.raw("levels") as Record<string, string>;
  const dimensions = t.raw("dimensions") as Record<DimKey, string>;

  function getWeakDims(dimPct: Record<DimKey, number>) {
    return DIM_KEYS.filter(d => dimPct[d] < 50);
  }

  function getSortedPriorities(dimPct: Record<DimKey, number>) {
    return [...DIM_KEYS].sort((a, b) => dimPct[a] - dimPct[b]).slice(0, 3);
  }

  return (
    <div id="diagnostico" className="w-full max-w-xl mx-auto px-6 md:px-0 py-12">

      {/* INTRO */}
      {screen === "intro" && (
        <div className="text-center">
          <p className="text-xs tracking-[0.1em] uppercase text-[#888] mb-6">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-sm text-[#555] leading-relaxed mb-8 max-w-md mx-auto">
            {t("subtitle")}
          </p>
          <div className="flex justify-center gap-8 mb-10">
            {(["questions", "time", "cost"] as const).map((key) => (
              <div key={key} className="text-center">
                <span className="block text-2xl text-[#1a1a1a]" style={{ fontFamily: "Georgia, serif" }}>
                  {t(`meta.${key}`)}
                </span>
                <span className="text-xs text-[#888]">{t(`meta.${key}Label`)}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setScreen("question")}
            className="bg-[#1a1a1a] text-[#FFFCF6] px-8 py-3 text-sm tracking-wide hover:opacity-80 transition-opacity"
          >
            {t("startBtn")}
          </button>
        </div>
      )}

      {/* QUESTION */}
      {screen === "question" && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#888]">
              {current + 1} {t("progress")}
            </span>
          </div>
          <div className="h-0.5 bg-[#E8E4DC] mb-8 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00C3D0] transition-all duration-400"
              style={{ width: `${Math.round(((current + 1) / 12) * 100)}%` }}
            />
          </div>
          <p className="text-xs tracking-[0.1em] uppercase text-[#00C3D0] mb-3">
            {dimensions[questions[current].dim as DimKey]}
          </p>
          <p
            className="text-xl md:text-2xl font-light text-[#1a1a1a] leading-snug mb-8">
            {questions[current].text}
          </p>
          <div className="flex flex-col gap-3 mb-10">
            {questions[current].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`flex items-start gap-3 px-4 py-4 border text-left transition-all duration-150 rounded-lg text-sm text-[#1a1a1a] leading-snug w-full ${
                  answers[current] === i
                    ? "border-[#00C3D0] bg-[#F7F4EE]"
                    : "border-[#E8E4DC] bg-white hover:border-[#00C3D0] hover:bg-[#F7F4EE]"
                }`}
              >
                <span className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  answers[current] === i
                    ? "border-[#00C3D0] bg-[#00C3D0]"
                    : "border-[#C4BDB5]"
                }`}>
                  {answers[current] === i && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </span>
                <span>{opt}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={goBack}
              className={`text-sm text-[#888] border border-[#E8E4DC] px-4 py-2 rounded hover:bg-[#F7F4EE] transition-colors ${
                current === 0 ? "invisible" : ""
              }`}
            >
              {t("prev")}
            </button>
            <button
              onClick={goNext}
              disabled={answers[current] === null}
              className="bg-[#00C3D0] text-white px-8 py-3 text-sm tracking-wide hover:opacity-80 transition-opacity"
            >
              {current === 11 ? t("finish") : t("next")}
            </button>
          </div>
        </div>
      )}

      {/* EMAIL */}
      {screen === "email" && (
        <div className="text-center max-w-sm mx-auto">
          <div className="text-3xl text-[#00C3D0] mb-4">✉</div>
          <h2
           className="text-2xl font-bold text-[#1a1a1a] mb-3">
            {t("emailTitle")}
          </h2>
          <p className="text-sm text-[#555] mb-6 leading-relaxed">
            {t("emailSubtitle")}
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("emailPlaceholder")}
            className="w-full border border-[#E8E4DC] px-4 py-3 text-sm text-[#1a1a1a] bg-white mb-3 focus:outline-none focus:border-[#00C3D0] rounded-md"
          />
          <button
            onClick={showResults}
            className="w-full bg-[#1a1a1a] text-[#FFFCF6] py-3 text-sm tracking-wide hover:opacity-80 transition-opacity"
          >
            {t("emailBtn")}
          </button>
          <p className="text-xs text-[#888] mt-3">{t("emailPrivacy")}</p>
        </div>
      )}

      {/* RESULTS */}
      {screen === "results" && scores && level && (
        <div>
          <p className="text-xs tracking-[0.1em] uppercase text-[#888] text-center mb-6">
            {t("resultsEyebrow")}
          </p>

          {/* Score hero */}
          <div className="text-center border border-[#E8E4DC] rounded-xl bg-[#F7F4EE] p-8 mb-6">
            <div className="text-[#1a1a1a] mb-2" style={{ fontFamily: "Georgia, serif" }}>
              <span className="text-6xl">{scores.score100}</span>
              <span className="text-xl text-[#888]">/100</span>
            </div>
            <span className={`inline-block text-xs tracking-widest uppercase px-3 py-1 rounded mb-3 ${getLevelColor(level)}`}>
              {levels[level]}
            </span>
            <p className="text-sm text-[#555] leading-relaxed max-w-xs mx-auto">
              {levelDescriptions[level]}
            </p>
          </div>

          {/* Dimension bars */}
          <div className="border border-[#E8E4DC] rounded-xl p-5 mb-5">
            <p className="text-xs tracking-[0.1em] uppercase text-[#888] mb-4">
              {t("dimensionLabel")}
            </p>
            {DIM_KEYS.map(d => (
              <div key={d} className="mb-3">
                <div className="flex justify-between text-xs text-[#555] mb-1">
                  <span>{dimensions[d]}</span>
                  <span>{scores.dimPct[d]}/100</span>
                </div>
                <div className="h-1 bg-[#E8E4DC] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00C3D0] rounded-full transition-all duration-700"
                    style={{ width: `${scores.dimPct[d]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Radar */}
          <div className="border border-[#E8E4DC] rounded-xl p-5 mb-5">
            <p className="text-xs tracking-[0.1em] uppercase text-[#888] mb-4">
              {t("profileLabel")}
            </p>
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="Radar chart showing brand profile by dimension"
              style={{ maxHeight: "260px" }}
            />
          </div>

          {/* Risks */}
          <div className="border border-[#E8E4DC] rounded-xl p-5 mb-5">
            <p className="text-xs tracking-[0.1em] uppercase text-[#888] mb-4">
              {t("risksLabel")}
            </p>
            {getWeakDims(scores.dimPct).length === 0 ? (
              <p className="text-sm text-[#555]">Perfil sólido. Los riesgos son oportunidades de optimización.</p>
            ) : (
              getWeakDims(scores.dimPct).slice(0, 3).map(d => (
                <div key={d} className="flex gap-3 py-2.5 border-b border-[#E8E4DC] last:border-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-2" />
                  <p className="text-sm text-[#1a1a1a] leading-snug">{risks[d]}</p>
                </div>
              ))
            )}
          </div>

          {/* Priorities */}
          <div className="border border-[#E8E4DC] rounded-xl p-5 mb-5">
            <p className="text-xs tracking-[0.1em] uppercase text-[#888] mb-4">
              {t("prioritiesLabel")}
            </p>
            {getSortedPriorities(scores.dimPct).map((d, i) => (
              <div key={d} className="flex gap-4 py-2.5 border-b border-[#E8E4DC] last:border-0">
                <span className="text-lg text-[#00C3D0] flex-shrink-0" style={{ fontFamily: "Georgia, serif" }}>
                  0{i + 1}
                </span>
                <div>
                  <p className="text-sm text-[#1a1a1a]">{priorities[d].action}</p>
                  <p className="text-xs text-[#888] mt-0.5">{priorities[d].sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="border border-[#00C3D0] rounded-xl p-6 text-center bg-[#F7F4EE]">
            <p className="text-sm text-[#555] leading-relaxed mb-5">
              {ctaMessages[level]}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/contact"
                className="bg-[#1a1a1a] text-[#FFFCF6] px-6 py-3 text-sm tracking-wide hover:opacity-80 transition-opacity text-center"
              >
                {t("scheduleBtn")}
              </a>
              <button
                onClick={() => window.print()}
                className="border border-[#1a1a1a] text-[#1a1a1a] px-6 py-3 text-sm tracking-wide hover:bg-[#1a1a1a] hover:text-[#FFFCF6] transition-colors"
              >
                {t("downloadBtn")}
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}