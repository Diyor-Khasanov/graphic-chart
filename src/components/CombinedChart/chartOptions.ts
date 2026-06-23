import type { ChartSeries } from "../../types/chart.types";

export const SERIES: ChartSeries[] = [
  {
    key: "cost",
    label: "Cost",
    color: "#f5e97a",   // soft yellow – area fill + stroke
    type: "area",
  },
  {
    key: "cpa",
    label: "CPA",
    color: "#4f86f7",   // blue – dashed line
    type: "line",
  },
  {
    key: "roi",
    label: "ROI confirmed",
    color: "#34a853",   // green – smooth spline
    type: "spline",
  },
  {
    key: "conversions",
    label: "Conversions",
    color: "#b44fdb",   // purple – bar/marker line
    type: "bar",
  },
];

// Visual constants matching the screenshot
export const CHART_COLORS = {
  background: "#fce8ec",        // salmon pink panel bg
  gridLine: "rgba(0,0,0,0.07)",
  axisText: "#999",
  tooltipBg: "#ffffff",
  tooltipBorder: "rgba(0,0,0,0.08)",
  tooltipShadow: "0 8px 32px rgba(0,0,0,0.13)",
};
