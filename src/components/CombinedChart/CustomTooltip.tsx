import type { TooltipProps } from "recharts";
import type { DataPoint } from "../../types/chart.types";
import { SERIES, CHART_COLORS } from "./chartOptions";

type Props = TooltipProps<number, string>;

export function CustomTooltip({ active, payload, label }: Props) {
  if (!active || !payload || payload.length === 0) return null;

  // Build a map of key → value from payload
  const values: Partial<Record<keyof Omit<DataPoint, "date">, number>> = {};
  payload.forEach((p) => {
    if (p.dataKey) {
      values[p.dataKey as keyof Omit<DataPoint, "date">] = p.value as number;
    }
  });

  return (
    <div
      style={{
        background: CHART_COLORS.tooltipBg,
        border: `1px solid ${CHART_COLORS.tooltipBorder}`,
        boxShadow: CHART_COLORS.tooltipShadow,
        borderRadius: "16px",
        padding: "13px 18px 15px",
        minWidth: "220px",
        pointerEvents: "none",
      }}
    >
      {/* Date header */}
      <p
        style={{
          fontSize: "12.5px",
          color: "#999",
          fontWeight: 500,
          marginBottom: "10px",
        }}
      >
        {label}
      </p>

      {/* Series rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {SERIES.map((s) => {
          const val = values[s.key];
          if (val === undefined) return null;

          const formatted =
            Number.isInteger(val) ? String(val) : val.toFixed(2);

          return (
            <div
              key={s.key}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              {/* Colored dot */}
              <span
                style={{
                  width: "11px",
                  height: "11px",
                  borderRadius: "50%",
                  background: s.color,
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
              {/* Label + value */}
              <span style={{ fontSize: "14px", color: "#2c2c2c" }}>
                {s.label}:{" "}
                <strong style={{ fontWeight: 700, color: "#111" }}>
                  {formatted}
                </strong>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
