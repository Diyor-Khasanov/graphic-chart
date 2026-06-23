import { CombinedChart } from "./components/CombinedChart/CombinedChart";
import { mockData } from "./data/mockData";

/**
 * ─────────────────────────────────────────
 *  HOW TO INITIALIZE WITH YOUR OWN DATA
 * ─────────────────────────────────────────
 *  Import or fetch an array of DataPoint objects:
 *
 *  const myData: DataPoint[] = [
 *    { date: "01.06.2026", cost: 22, cpa: 1.1, roi: 185, conversions: 14 },
 *    ...
 *  ];
 *
 *  Then pass it to <CombinedChart data={myData} />
 * ─────────────────────────────────────────
 */

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-3xl">
        <h1 className="text-xl font-semibold text-gray-700 mb-4">
          Graphic Chart
        </h1>
        <CombinedChart data={mockData} label="Tdy" />
      </div>
    </div>
  );
}
