import { CombinedChart } from "./components/CombinedChart/CombinedChart";
import { mockData } from "./data/mockData";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-3xl">
        <h1 className="text-xl font-semibold text-gray-700 mb-4">Combined Chart</h1>
        <CombinedChart data={mockData} label="Tdy" />
      </div>
    </div>
  );
}
