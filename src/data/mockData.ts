import type { DataPoint } from "../types/chart.types";

// cost + roi: U-shape (high → valley in center → high)
// conversions: diagonal bottom-left to top-right
// cpa: flat near 1–2 (nearly invisible at bottom)
export const mockData: DataPoint[] = [
  { date: "05.06.2026", cost: 72,    roi: 65,  conversions: 4,  cpa: 2 },
  { date: "06.06.2026", cost: 58,    roi: 52,  conversions: 8,  cpa: 2 },
  { date: "07.06.2026", cost: 46,    roi: 40,  conversions: 14, cpa: 1 },
  { date: "08.06.2026", cost: 34,    roi: 28,  conversions: 18, cpa: 2 },
  { date: "09.06.2026", cost: 22,    roi: 18,  conversions: 24, cpa: 1 },
  { date: "10.06.2026", cost: 13,    roi: 10,  conversions: 28, cpa: 2 },
  { date: "11.06.2026", cost: 8,     roi: 5,   conversions: 30, cpa: 1 },
  { date: "12.06.2026", cost: 44.36, roi: 40,  conversions: 36, cpa: 1 },
  { date: "13.06.2026", cost: 16,    roi: 12,  conversions: 40, cpa: 2 },
  { date: "14.06.2026", cost: 26,    roi: 22,  conversions: 46, cpa: 1 },
  { date: "15.06.2026", cost: 38,    roi: 34,  conversions: 52, cpa: 2 },
  { date: "16.06.2026", cost: 50,    roi: 46,  conversions: 58, cpa: 1 },
  { date: "17.06.2026", cost: 60,    roi: 56,  conversions: 64, cpa: 2 },
  { date: "18.06.2026", cost: 70,    roi: 65,  conversions: 70, cpa: 1 },
  { date: "19.06.2026", cost: 78,    roi: 72,  conversions: 76, cpa: 2 },
];
