export type LabDimensionKey =
  | "assets"
  | "access"
  | "autonomy"
  | "documentation"
  | "operation"
  | "approvals";

export interface LabDimensionMeta {
  key: LabDimensionKey;
  labelKey: string; // i18n key suffix under atlas.lab001.sidebar.dimensions
}

// Sidebar order — matches Figma exactly (6 dimensions for LAB-001: assets x3 + processes x3)
export const LAB001_DIMENSIONS: LabDimensionMeta[] = [
  { key: "assets", labelKey: "assets" },
  { key: "access", labelKey: "access" },
  { key: "autonomy", labelKey: "autonomy" },
  { key: "documentation", labelKey: "documentation" },
  { key: "operation", labelKey: "operation" },
  { key: "approvals", labelKey: "approvals" },
];

export interface LabOption {
  id: string;
  icon: string; // path under /public
  tier: 1 | 2 | 3 | 4; // 1 = most dependent/worst, 4 = most systemized/best
}

export interface LabQuestionData {
  dimension: LabDimensionKey;
  isCheckpoint: boolean; // only true for question 3 (end of Assets) and question 6 (end of Processes)
  checkpointGroup?: "assets" | "processes";
  options: LabOption[];
}

export interface DimensionScore {
  key: LabDimensionKey;
  labelKey: string;
  score: number; // 0-100, higher = more dependency (worse)
}

export interface Lab001Result {
  overallScore: number;
  band: "low" | "mid" | "high";
  dimensionScores: DimensionScore[];
  topOpportunities: LabDimensionKey[]; // the 2 weakest (highest-dependency) dimensions
}

// tier 1 (worst answer) -> 100 dependency score, tier 4 (best answer) -> 25
function tierToDependencyScore(tier: number): number {
  return (5 - tier) * 25;
}

export function computeLab001Result(answers: Record<number, string>): Lab001Result | null {
  const dimensionScores: DimensionScore[] = LAB001_QUESTIONS.map((question, i) => {
    const answerId = answers[i];
    const tier = question.options.find((o) => o.id === answerId)?.tier;
    return {
      key: question.dimension,
      labelKey: LAB001_DIMENSIONS[i].labelKey,
      score: tier ? tierToDependencyScore(tier) : NaN,
    };
  });

  if (dimensionScores.some((d) => Number.isNaN(d.score))) return null;

  const overallScore = Math.round(
    dimensionScores.reduce((sum, d) => sum + d.score, 0) / dimensionScores.length
  );

  const band: "low" | "mid" | "high" = overallScore < 34 ? "low" : overallScore < 67 ? "mid" : "high";

  const topOpportunities = [...dimensionScores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((d) => d.key);

  return { overallScore, band, dimensionScores, topOpportunities };
}
export const CHECKPOINT_GROUPS: Record<"assets" | "processes", number[]> = {
  assets: [0, 1, 2],
  processes: [3, 4, 5],
};

// Only questions 1-3 are wired for now — questions 4-6 land in the next steps.
export const LAB001_QUESTIONS: LabQuestionData[] = [
  {
    dimension: "assets",
    isCheckpoint: false,
    options: [
      { id: "q1-o1", icon: "/lab001-01.svg", tier: 1 },
      { id: "q1-o2", icon: "/lab001-02.svg", tier: 2 },
      { id: "q1-o3", icon: "/lab001-03.svg", tier: 3 },
      { id: "q1-o4", icon: "/lab001-004.svg", tier: 4 },
    ],
  },
  {
    dimension: "access",
    isCheckpoint: false,
    options: [
      { id: "q2-o1", icon: "/lab001-01.svg", tier: 1 },
      { id: "q2-o2", icon: "/lab001-02.svg", tier: 2 },
      { id: "q2-o3", icon: "/lab001-03.svg", tier: 3 },
      { id: "q2-o4", icon: "/lab001-004.svg", tier: 4 },
    ],
  },
  {
    dimension: "autonomy",
    isCheckpoint: true,
    checkpointGroup: "assets",
    options: [
      { id: "q3-o1", icon: "/003-01.svg", tier: 1 },
      { id: "q3-o2", icon: "/003-02.svg", tier: 2 },
      { id: "q3-o3", icon: "/003-04.svg", tier: 3 },
      { id: "q3-o4", icon: "/003-08.svg", tier: 4 },
    ],
  },
  {
    dimension: "documentation",
    isCheckpoint: false,
    options: [
      { id: "q4-o1", icon: "/lab004-01.svg", tier: 1 },
      { id: "q4-o2", icon: "/lab004-02.svg", tier: 2 },
      { id: "q4-o3", icon: "/lab001-03.svg", tier: 3 },
      { id: "q4-o4", icon: "/lab001-004.svg", tier: 4 },
    ],
  },
  {
    dimension: "operation",
    isCheckpoint: false,
    options: [
      { id: "q5-o1", icon: "/lab005-01.svg", tier: 1 },
      { id: "q5-o2", icon: "/lab005-02.svg", tier: 2 },
      { id: "q5-o3", icon: "/lab005-03.svg", tier: 3 },
      { id: "q5-o4", icon: "/lab005-04.svg", tier: 4 },
    ],
  },
  {
    dimension: "approvals",
    isCheckpoint: true,
    checkpointGroup: "processes",
    options: [
      { id: "q6-o1", icon: "/lab006-01.svg", tier: 1 },
      { id: "q6-o2", icon: "/lab006-02.svg", tier: 2 },
      { id: "q6-o3", icon: "/lab006-03.svg", tier: 3 },
      { id: "q6-o4", icon: "/lab006-04.svg", tier: 4 },
    ],
  },
];