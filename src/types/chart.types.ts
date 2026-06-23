export interface DataPoint {
  date: string;        // "DD.MM.YYYY"
  cost: number;        // Area series  — yellow fill
  cpa: number;         // Line series  — blue dashed
  roi: number;         // Spline       — green smooth curve
  conversions: number; // Line+markers — purple squares
}

export interface ChartSeries {
  key: keyof Omit<DataPoint, "date">;
  label: string;
  color: string;
  type: "area" | "spline" | "line" | "bar";
}
