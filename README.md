# GraphicChart

A pixel-accurate React recreation of the multi-series analytics chart from the test assignment.

## Stack

- **React 18** + **TypeScript** (strict)
- **Vite 5**
- **Tailwind CSS 3**
- **Recharts 2**

---

## Project Structure

```
src/
├── components/
│   └── CombinedChart/
│        CombinedChart.tsx   ← Main chart component
│        chartOptions.ts     ← Series config & color tokens
│        CustomTooltip.tsx   ← Tooltip with colored dots
│
├── data/
│      mockData.ts           ← Sample DataPoint[]
│
├── types/
│      chart.types.ts        ← DataPoint & ChartSeries types
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## Quick Start

```bash
# 1. Clone / unzip
git clone <repo-url>
cd graphic-chart

# 2. Install
npm install

# 3. Dev server  →  http://localhost:5173
npm run dev

# 4. Production build
npm run build
```

---

## Initializing with Your Own Data

### 1. Define your data array

Each point must satisfy the `DataPoint` interface:

```ts
// src/types/chart.types.ts
interface DataPoint {
  date: string;        // "DD.MM.YYYY"
  cost: number;        // Area series  (yellow fill)
  cpa: number;         // Line series  (blue dashed)
  roi: number;         // Spline       (green curve)
  conversions: number; // Marker line  (purple squares)
}
```

### 2. Pass data to the component

```tsx
import { CombinedChart } from "./components/CombinedChart/CombinedChart";
import type { DataPoint } from "./types/chart.types";

const myData: DataPoint[] = [
  { date: "01.06.2026", cost: 22,   cpa: 1.1,  roi: 185, conversions: 14 },
  { date: "02.06.2026", cost: 30,   cpa: 0.95, roi: 178, conversions: 20 },
  { date: "03.06.2026", cost: 44.5, cpa: 1.23, roi: 161, conversions: 36 },
  // ... add as many points as needed
];

export default function App() {
  return <CombinedChart data={myData} label="Tdy" />;
}
```

### Props

| Prop    | Type          | Default | Description                           |
|---------|---------------|---------|---------------------------------------|
| `data`  | `DataPoint[]` | —       | **Required.** Time-series data array. |
| `label` | `string`      | `"Tdy"` | Top-left corner label.                |

---

## Chart Series

| Series       | Visual          | Color     | Y-Axis        |
|--------------|-----------------|-----------|---------------|
| `cost`       | Area (fill)     | `#f5e97a` | Left          |
| `cpa`        | Dashed line     | `#4f86f7` | Left          |
| `roi`        | Smooth spline   | `#34a853` | Right (hidden)|
| `conversions`| Line + squares  | `#b44fdb` | Left          |

To change colors or labels, edit `src/components/CombinedChart/chartOptions.ts`.

---

## Tooltip

Hovering any data point shows a white card with:
- Date header
- Colored dot + label + **bold value** for each series

The tooltip is fully custom (`CustomTooltip.tsx`) — no recharts default styles.
