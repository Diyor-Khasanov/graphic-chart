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
        borderRadius: 14,
        padding: "14px 18px",
        minWidth: 210,
        fontFamily: "inherit",
      }}
    >
      {/* Date header */}
      <p
        style={{
          fontSize: 13,
          color: "#888",
          fontWeight: 500,
          marginBottom: 10,
          letterSpacing: 0.2,
        }}
      >
        {label}
      </p>

      {/* Series rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {SERIES.map((s) => {
          const val = values[s.key];
          if (val === undefined) return null;

          const formatted =
            Number.isInteger(val) ? String(val) : val.toFixed(2);

          return (
            <div
              key={s.key}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              {/* Colored dot */}
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: s.color,
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
              {/* Label + value */}
              <span style={{ fontSize: 14, color: "#333" }}>
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
