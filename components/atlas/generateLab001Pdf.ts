import { jsPDF } from "jspdf";
import type { Lab001Result } from "./lab001-data";

// Brand colors (matching the on-screen result — teal accent + dark text)
const TEAL: [number, number, number] = [0, 195, 208];
const DARK: [number, number, number] = [27, 28, 28];
const MUTED: [number, number, number] = [76, 69, 70];
const TRACK: [number, number, number] = [228, 224, 220];
const CREAM: [number, number, number] = [255, 252, 246];

export interface Lab001PdfContent {
  labTag: string;
  heading: string;
  scoreTitle: string;
  bandLabel: string;
  bandDescription: string;
  byDimensionTitle: string;
  bannerTitle: string;
  bannerText: string;
  dimensionLabels: Record<string, string>; // dimension key -> localized label
  generatedOnLabel: string;
  footerNote: string;
}

export function generateLab001ResultPdf(result: Lab001Result, content: Lab001PdfContent) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 48;
  let y = 56;

  // background
  doc.setFillColor(...CREAM);
  doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), "F");

  // header tag
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.setFont("helvetica", "bold");
  doc.text(content.labTag.toUpperCase(), margin, y);
  y += 30;

  // heading
  doc.setFontSize(20);
  doc.setTextColor(...DARK);
  doc.setFont("helvetica", "bold");
  const headingLines = doc.splitTextToSize(content.heading, pageWidth - margin * 2);
  doc.text(headingLines, margin, y);
  y += headingLines.length * 24 + 20;

  // score circle
  const circleX = margin + 60;
  const circleY = y + 60;
  const circleR = 52;
  doc.setDrawColor(...TRACK);
  doc.setLineWidth(10);
  doc.circle(circleX, circleY, circleR, "S");

  const pct = result.overallScore / 100;
  doc.setDrawColor(...TEAL);
  doc.setLineWidth(10);
  doc.circle(circleX, circleY, circleR, "S"); // base redraw ensures cap consistency
  // arc approximation: draw teal circle segment using lines (jsPDF has no native arc-stroke by %,
  // so approximate with small line segments along the circle path)
  const steps = Math.round(60 * pct);
  doc.setLineWidth(10);
  for (let i = 0; i < steps; i++) {
    const a1 = -Math.PI / 2 + (i / 60) * Math.PI * 2;
    const a2 = -Math.PI / 2 + ((i + 1) / 60) * Math.PI * 2;
    doc.setDrawColor(...TEAL);
    doc.line(
      circleX + circleR * Math.cos(a1),
      circleY + circleR * Math.sin(a1),
      circleX + circleR * Math.cos(a2),
      circleY + circleR * Math.sin(a2)
    );
  }

  doc.setFontSize(26);
  doc.setTextColor(...DARK);
  doc.setFont("helvetica", "bold");
  doc.text(String(result.overallScore), circleX, circleY + 6, { align: "center" });
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.setFont("helvetica", "normal");
  doc.text("/100", circleX, circleY + 20, { align: "center" });

  // band + description, to the right of the circle
  const textX = margin + 150;
  const textWidth = pageWidth - margin - textX;
  doc.setFontSize(9);
  doc.setTextColor(...TEAL);
  doc.setFont("helvetica", "bold");
  doc.text(content.scoreTitle.toUpperCase(), textX, y + 14);

  doc.setFillColor(...TEAL);
  doc.roundedRect(textX, y + 24, doc.getTextWidth(content.bandLabel) + 16, 18, 3, 3, "F");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(content.bandLabel, textX + 8, y + 36);

  doc.setFontSize(10.5);
  doc.setTextColor(...MUTED);
  doc.setFont("helvetica", "normal");
  const bandDescLines = doc.splitTextToSize(content.bandDescription, textWidth);
  doc.text(bandDescLines, textX, y + 58);

  y = circleY + circleR + 50;

  // dimension breakdown
  doc.setFontSize(11);
  doc.setTextColor(...DARK);
  doc.setFont("helvetica", "bold");
  doc.text(content.byDimensionTitle.toUpperCase(), margin, y);
  y += 22;

  const barWidth = pageWidth - margin * 2;
  result.dimensionScores.forEach((d) => {
    const label = content.dimensionLabels[d.key] ?? d.key;
    doc.setFontSize(10.5);
    doc.setTextColor(...DARK);
    doc.setFont("helvetica", "bold");
    doc.text(label, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    doc.text(`${d.score}/100`, pageWidth - margin, y, { align: "right" });
    y += 8;

    doc.setFillColor(...TRACK);
    doc.rect(margin, y, barWidth, 5, "F");
    doc.setFillColor(...TEAL);
    doc.rect(margin, y, barWidth * (d.score / 100), 5, "F");
    y += 24;
  });

  y += 10;

  // recommended next step banner
  const bannerHeight = 90;
  doc.setFillColor(230, 250, 249); // light teal tint
  doc.roundedRect(margin, y, pageWidth - margin * 2, bannerHeight, 4, 4, "F");
  doc.setFontSize(10);
  doc.setTextColor(...TEAL);
  doc.setFont("helvetica", "bold");
  doc.text(content.bannerTitle.toUpperCase(), margin + 20, y + 26);
  doc.setFontSize(10.5);
  doc.setTextColor(...MUTED);
  doc.setFont("helvetica", "normal");
  const bannerLines = doc.splitTextToSize(content.bannerText, pageWidth - margin * 2 - 40);
  doc.text(bannerLines, margin + 20, y + 44);

  // footer
  const footerY = doc.internal.pageSize.getHeight() - 40;
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.setFont("helvetica", "normal");
  doc.text(
    `${content.generatedOnLabel} ${new Date().toLocaleDateString()} — ${content.footerNote}`,
    margin,
    footerY
  );

  doc.save("lab-001-resultado.pdf");
}