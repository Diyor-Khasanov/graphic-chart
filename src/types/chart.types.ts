export interface DataPoint {
  date: string;        // "DD.MM.YYYY"
  cost: number;        // area series  (yellow fill)
  cpa: number;         // line series  (blue dashed)
  roi: number;         // spline       (green curve)
  conversions: number; // bar / marker (purple)
}

export interface ChartSeries {
  key: keyof Omit<DataPoint, "date">;
  label: string;
  color: string;
  type: "area" | "spline" | "line" | "bar";
}
