import type { ChartSeries } from "../../types/chart.types";

export const SERIES: ChartSeries[] = [
  {
    key: "cost",
    label: "Cost",
    color: "#f5e97a",
    type: "area",
  },
  {
    key: "cpa",
    label: "CPA",
    color: "#4f86f7",
    type: "line",
  },
  {
    key: "roi",
    label: "ROI confirmed",
    color: "#34a853",
    type: "spline",
  },
  {
    key: "conversions",
    label: "Conversions",
    color: "#b44fdb",
    type: "bar",
  },
];

export const CHART_COLORS = {
  background: "#fce8ec",
  gridLine: "rgba(0,0,0,0.07)",
  axisText: "#999",
  tooltipBg: "#ffffff",
  tooltipBorder: "rgba(0,0,0,0.08)",
  tooltipShadow: "0 8px 32px rgba(0,0,0,0.13)",
};
