import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { DataPoint } from "../../types/chart.types";
import { CHART_COLORS } from "./chartOptions";
import { CustomTooltip } from "./CustomTooltip";

interface Props {
  data: DataPoint[];
  label?: string;
}

const SquareDot = ({ cx = 0, cy = 0, index = 0, dataLength = 0, fill = "#b44fdb" }) => {
  if (index !== 0 && index !== dataLength - 1) return <g />;
  const size = 8;
  return (
    <rect
      x={cx - size / 2}
      y={cy - size / 2}
      width={size}
      height={size}
      fill={fill}
      stroke="#fff"
      strokeWidth={2}
      rx={1.5}
    />
  );
};

const SplineDot = ({ cx = 0, cy = 0, stroke = "#2da84a", index = 0, dataLength = 15 }) => {
  const mid = Math.floor(dataLength / 2) - 1;
  if (index !== mid) return <g />;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={9}
      fill={stroke}
      stroke="#fff"
      strokeWidth={2.5}
      opacity={0.9}
    />
  );
};

const ActiveSquareDot = (props: any) => {
    const { cx, cy, fill } = props;
    const size = 8;
    return (
        <rect
            x={cx - size / 2}
            y={cy - size / 2}
            width={size}
            height={size}
            fill={fill}
            stroke="#fff"
            strokeWidth={2}
            rx={1.5}
        />
    );
};

export function CombinedChart({ data, label = "Tdy" }: Props) {
  return (
    <div
      style={{
        background: CHART_COLORS.background,
        borderRadius: "16px",
        padding: "24px 12px 12px 0px",
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 24,
          left: 12,
          fontSize: "12px",
          fontWeight: 700,
          color: "#666",
        }}
      >
        {label}
      </span>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 16, right: 16, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#f0d060" stopOpacity={0.55} />
              <stop offset="85%"  stopColor="#f5e890" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#f5e890" stopOpacity={0.00} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke={CHART_COLORS.gridLine} horizontal vertical={false} />

          <XAxis
            dataKey="date"
            tickFormatter={v => v.split(".")[0]}
            interval={1}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#aaa" }}
          />

          <YAxis
            domain={[0, 80]}
            tickCount={5}
            tickFormatter={v => v === 0 ? "0" : `$${v}`}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#aaa" }}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "rgba(0,0,0,0.12)", strokeWidth: 1, strokeDasharray: "3 3" }}
          />

          {/* 1. Area — Cost */}
          <Area
            type="monotone"
            dataKey="cost"
            stroke="#d4b800"
            strokeWidth={1.5}
            fill="url(#costGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "#d4b800", stroke: "#fff", strokeWidth: 2 }}
          />

          {/* 2. Line — CPA (dashed blue) */}
          <Line
            type="linear"
            dataKey="cpa"
            stroke="#5b8cf5"
            strokeWidth={2}
            strokeDasharray="7 4"
            dot={false}
            activeDot={{ r: 4, fill: "#5b8cf5", stroke: "#fff", strokeWidth: 2 }}
          />

          {/* 3. Spline — ROI confirmed (green, smooth) */}
          <Line
            type="monotoneX"
            dataKey="roi"
            stroke="#2da84a"
            strokeWidth={2.5}
            dot={(props: any) => <SplineDot {...props} dataLength={data.length} />}
            activeDot={{ r: 5, fill: "#2da84a", stroke: "#fff", strokeWidth: 2 }}
          />

          {/* 4. Conversions (purple, square endpoints) */}
          <Line
            type="linear"
            dataKey="conversions"
            stroke="#b44fdb"
            strokeWidth={2}
            dot={(props: any) => <SquareDot {...props} dataLength={data.length} fill="#b44fdb" />}
            activeDot={<ActiveSquareDot />}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
