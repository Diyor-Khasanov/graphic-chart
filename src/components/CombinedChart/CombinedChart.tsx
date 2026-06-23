import {
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";
import type { DataPoint } from "../../types/chart.types";
import { CHART_COLORS } from "./chartOptions";
import { CustomTooltip } from "./CustomTooltip";

interface Props {
  data: DataPoint[];
  /**
   * Optional: override the label shown in the top-left ("Tdy" by default)
   */
  label?: string;
}

// Square dot for "Conversions" series — matches the screenshot markers
const SquareDot = (props: {
  cx?: number;
  cy?: number;
  stroke?: string;
  fill?: string;
}) => {
  const { cx = 0, cy = 0, stroke, fill } = props;
  const size = 7;
  return (
    <rect
      x={cx - size / 2}
      y={cy - size / 2}
      width={size}
      height={size}
      fill={fill || stroke}
      stroke="#fff"
      strokeWidth={1.5}
      rx={1}
    />
  );
};

// Smooth dot for ROI spline — larger circle
const SplineDot = (props: {
  cx?: number;
  cy?: number;
  stroke?: string;
  index?: number;
}) => {
  const { cx = 0, cy = 0, stroke, index } = props;
  // Only render the "active" dot in the middle region (mimics the screenshot)
  if (index !== 7) return <g />;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={8}
      fill={stroke}
      stroke="#fff"
      strokeWidth={2}
      opacity={0.85}
    />
  );
};

export function CombinedChart({ data, label = "Tdy" }: Props) {
  return (
    <div
      style={{
        background: CHART_COLORS.background,
        borderRadius: 18,
        padding: "20px 16px 16px 16px",
        position: "relative",
        minHeight: 340,
      }}
    >
      {/* Top-left label */}
      <span
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          fontSize: 13,
          fontWeight: 700,
          color: "#555",
          letterSpacing: 0.5,
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            {/* Area gradient — warm yellow/cream like the screenshot */}
            <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5e97a" stopOpacity={0.65} />
              <stop offset="100%" stopColor="#f5e97a" stopOpacity={0.08} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="0"
            stroke={CHART_COLORS.gridLine}
            horizontal
            vertical={false}
          />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: CHART_COLORS.axisText }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: string) => {
              // Show only day number to keep axis clean
              return v.split(".")[0];
            }}
          />

          <YAxis
            yAxisId="left"
            orientation="left"
            tick={{ fontSize: 11, fill: CHART_COLORS.axisText }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => (v === 0 ? "0" : `${v}`)}
          />

          {/* Second Y axis for ROI (larger scale) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11, fill: CHART_COLORS.axisText }}
            axisLine={false}
            tickLine={false}
            hide
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "rgba(0,0,0,0.1)",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />

          {/* ── AREA: Cost (yellow fill) ── */}
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="cost"
            stroke="#e6d84a"
            strokeWidth={1.5}
            fill="url(#costGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "#e6d84a", stroke: "#fff", strokeWidth: 2 }}
          />

          {/* ── LINE: CPA (blue dashed) ── */}
          <Line
            yAxisId="left"
            type="linear"
            dataKey="cpa"
            stroke="#4f86f7"
            strokeWidth={2}
            strokeDasharray="6 4"
            dot={false}
            activeDot={{ r: 4, fill: "#4f86f7", stroke: "#fff", strokeWidth: 2 }}
          />

          {/* ── SPLINE: ROI confirmed (green smooth curve) ── */}
          <Line
            yAxisId="right"
            type="monotoneX"
            dataKey="roi"
            stroke="#34a853"
            strokeWidth={2.5}
            dot={<SplineDot />}
            activeDot={{ r: 5, fill: "#34a853", stroke: "#fff", strokeWidth: 2 }}
          />

          {/* ── BAR-style: Conversions (purple line + square dots) ── */}
          <Line
            yAxisId="left"
            type="linear"
            dataKey="conversions"
            stroke="#b44fdb"
            strokeWidth={2}
            dot={<SquareDot fill="#b44fdb" />}
            activeDot={<SquareDot fill="#b44fdb" />}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
