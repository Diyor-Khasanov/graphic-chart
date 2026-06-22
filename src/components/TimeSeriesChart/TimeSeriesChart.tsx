import React, { useMemo, useState, useRef, useEffect } from 'react';
import './TimeSeriesChart.css';

export type DataPoint = {
  timestamp: string | number;
  value: number;
};

export interface SeriesConfig {
  name: string;
  data: DataPoint[];
}

export interface ChartProps {
  areaSeries: SeriesConfig;
  splineSeries: SeriesConfig;
  lineSeries: SeriesConfig;
  barSeries: SeriesConfig;
}

const TimeSeriesChart: React.FC<ChartProps> = ({
  areaSeries: areaCfg,
  splineSeries: splineCfg,
  lineSeries: lineCfg,
  barSeries: barCfg,
}) => {
  const areaSeries = areaCfg.data;
  const splineSeries = splineCfg.data;
  const lineSeries = lineCfg.data;
  const barSeries = barCfg.data;
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    const observeTarget = containerRef.current;
    if (!observeTarget) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(observeTarget);
    return () => resizeObserver.disconnect();
  }, []);

  const { width, height } = dimensions;

  const padding = useMemo(() => ({ top: 40, right: 40, bottom: 40, left: 60 }), []);

  // Normalized scaling: each series gets its own min/max to fit the chart area
  // Alternatively, we can use a single scale if they are comparable, but here they have different units.

  const getMinMax = (series: DataPoint[]) => {
    if (series.length === 0) return { min: 0, max: 0 };
    const values = series.map((d) => d.value);
    return { min: Math.min(...values), max: Math.max(...values) };
  };

  const scales = useMemo(() => {
    if (width === 0 || height === 0) return null;

    const areaRange = getMinMax(areaSeries);
    const splineRange = getMinMax(splineSeries);
    const lineRange = getMinMax(lineSeries);
    const barRange = getMinMax(barSeries);

    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const xStep = chartWidth / (areaSeries.length - 1);

    const getY = (val: number, range: { min: number; max: number }) => {
      // We'll give some buffer at the top and bottom
      return chartHeight - ((val - range.min * 0.9) / (range.max * 1.1 - range.min * 0.9)) * chartHeight + padding.top;
    };

    return {
      width,
      height,
      chartWidth,
      chartHeight,
      xStep,
      areaSeries,
      splineSeries,
      lineSeries,
      barSeries,
      areaRange,
      splineRange,
      lineRange,
      barRange,
      getY,
      padding,
    };
  }, [width, height, areaSeries, splineSeries, lineSeries, barSeries, padding]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!scales) return;
    const { padding, xStep, areaSeries } = scales;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - padding.left;
    const index = Math.round(x / xStep);

    if (index >= 0 && index < areaSeries.length) {
      setHoverIndex(index);
    } else {
      setHoverIndex(null);
    }
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const renderGrid = () => {
    if (!scales) return null;
    const { chartWidth, chartHeight, padding } = scales;
    const horizontalLines = 5;

    return (
      <g className="grid-lines">
        {[...Array(horizontalLines)].map((_, i) => {
          const y = padding.top + (chartHeight / (horizontalLines - 1)) * i;
          return (
            <line
              key={i}
              x1={padding.left}
              y1={y}
              x2={padding.left + chartWidth}
              y2={y}
              stroke="#e0e0e0"
              strokeWidth="1"
            />
          );
        })}
      </g>
    );
  };

  const renderAxes = () => {
    if (!scales) return null;
    const { chartHeight, chartWidth, padding, areaSeries, xStep, areaRange, splineRange, barRange, lineRange } = scales;

    return (
      <g className="axes-labels" fontSize="12" fill="#666">
        {/* Y-Axis Labels - using max values from each series as examples */}
        <text x={padding.left - 10} y={padding.top + chartHeight * 0.2} textAnchor="end">{splineRange.max.toFixed(2)}</text>
        <text x={padding.left - 10} y={padding.top + chartHeight * 0.4} textAnchor="end">${areaRange.max.toFixed(2)}</text>
        <text x={padding.left - 10} y={padding.top + chartHeight * 0.6} textAnchor="end">${barRange.max.toFixed(2)}</text>
        <text x={padding.left - 10} y={padding.top + chartHeight * 0.8} textAnchor="end">{lineRange.max.toFixed(0)}</text>
        <text x={padding.left - 10} y={padding.top + chartHeight} textAnchor="end">0</text>

        {/* X-Axis Labels */}
        {areaSeries.map((d, i) => (
          <text
            key={i}
            x={padding.left + i * xStep}
            y={padding.top + chartHeight + 20}
            textAnchor="middle"
          >
            {d.timestamp.toString().split('-').slice(1).join('.')}
          </text>
        ))}
      </g>
    );
  };

  const renderHoverElements = () => {
    if (!scales || hoverIndex === null) return null;
    const {
      padding, xStep, chartHeight,
      areaSeries, splineSeries, lineSeries,
      areaRange, splineRange, lineRange, getY
    } = scales;

    const x = padding.left + hoverIndex * xStep;

    return (
      <g className="hover-elements">
        <line
          x1={x}
          y1={padding.top}
          x2={x}
          y2={padding.top + chartHeight}
          stroke="#999"
          strokeWidth="1"
          strokeDasharray="4"
        />
        {/* Glow/Active points */}
        <circle cx={x} cy={getY(areaSeries[hoverIndex].value, areaRange)} r="4" fill="#F4B400" />
        <circle cx={x} cy={getY(splineSeries[hoverIndex].value, splineRange)} r="6" fill="#34A853" className="glow-circle" />
        <rect x={x - 5} y={getY(lineSeries[hoverIndex].value, lineRange) - 5} width="10" height="10" fill="#A142F4" />
      </g>
    );
  };

  const renderTooltip = () => {
    if (!scales || hoverIndex === null) return null;
    const {
      padding, xStep, width,
      areaSeries, splineSeries, lineSeries, barSeries,
    } = scales;

    const x = padding.left + hoverIndex * xStep;
    const y = padding.top + 20;

    // Adjust tooltip position if it goes off-screen
    const tooltipWidth = 200;
    const tooltipX = x + tooltipWidth + 20 > width ? x - tooltipWidth - 10 : x + 10;

    return (
      <foreignObject x={tooltipX} y={y} width={tooltipWidth} height="150" className="tooltip-container">
        <div className="tooltip-content">
          <div className="tooltip-date">{areaSeries[hoverIndex].timestamp}</div>
          <div className="tooltip-item">
            <span className="dot yellow" /> {areaCfg.name}: <span className="tooltip-value">{areaSeries[hoverIndex].value}</span>
          </div>
          <div className="tooltip-item">
            <span className="dot blue" /> {barCfg.name}: <span className="tooltip-value">{barSeries[hoverIndex].value}</span>
          </div>
          <div className="tooltip-item">
            <span className="dot green" /> {splineCfg.name}: <span className="tooltip-value">{splineSeries[hoverIndex].value}</span>
          </div>
          <div className="tooltip-item">
            <span className="dot purple" /> {lineCfg.name}: <span className="tooltip-value">{lineSeries[hoverIndex].value}</span>
          </div>
        </div>
      </foreignObject>
    );
  };

  const renderLegend = () => {
    return (
      <div className="chart-legend">
        <div className="legend-item"><span className="dot yellow" /> {areaCfg.name}</div>
        <div className="legend-item"><span className="dot blue" /> {barCfg.name}</div>
        <div className="legend-item"><span className="dot green" /> {splineCfg.name}</div>
        <div className="legend-item"><span className="dot purple" /> {lineCfg.name}</div>
      </div>
    );
  };

  const renderArea = () => {
    if (!scales) return null;
    const { areaSeries, getY, xStep, padding, areaRange, chartHeight } = scales;
    const points = areaSeries.map((d, i) => `${padding.left + i * xStep},${getY(d.value, areaRange)}`).join(' ');
    const pathData = `M ${padding.left},${padding.top + chartHeight} L ${points} L ${padding.left + (areaSeries.length - 1) * xStep},${padding.top + chartHeight} Z`;

    return (
      <path
        d={pathData}
        fill="rgba(255, 235, 59, 0.3)"
        stroke="none"
        className="area-series"
      />
    );
  };

  const renderBar = () => {
    if (!scales) return null;
    const { barSeries, getY, xStep, padding, barRange, chartHeight } = scales;
    const barWidth = 30;

    return barSeries.map((d, i) => {
      const x = padding.left + i * xStep - barWidth / 2;
      const y = getY(d.value, barRange);
      const barHeight = padding.top + chartHeight - y;

      return (
        <rect
          key={i}
          x={x}
          y={y}
          width={barWidth}
          height={barHeight}
          fill="#4285F4"
          rx={4}
          className="bar-series"
        />
      );
    });
  };

  const renderSpline = () => {
    if (!scales) return null;
    const { splineSeries, getY, xStep, padding, splineRange } = scales;

    // Catmull-Rom to Cubic Bezier conversion for smooth spline
    const points = splineSeries.map((d, i) => ({
      x: padding.left + i * xStep,
      y: getY(d.value, splineRange),
    }));

    let pathData = `M ${points[0].x},${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(i - 1, 0)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(i + 2, points.length - 1)];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      pathData += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }

    return (
      <path
        d={pathData}
        fill="none"
        stroke="#34A853"
        strokeWidth="2"
        className="spline-series"
      />
    );
  };

  const renderLine = () => {
    if (!scales) return null;
    const { lineSeries, getY, xStep, padding, lineRange } = scales;
    const points = lineSeries.map((d, i) => `${padding.left + i * xStep},${getY(d.value, lineRange)}`).join(' ');

    return (
      <g className="line-series-group">
        <polyline
          points={points}
          fill="none"
          stroke="#A142F4"
          strokeWidth="2"
        />
        {lineSeries.map((d, i) => (
          <rect
            key={i}
            x={padding.left + i * xStep - 4}
            y={getY(d.value, lineRange) - 4}
            width={8}
            height={8}
            fill="#A142F4"
          />
        ))}
      </g>
    );
  };

  if (width === 0 || height === 0) {
    return <div ref={containerRef} className="time-series-chart-container" />;
  }

  return (
    <div className="time-series-chart-wrapper">
      <div ref={containerRef} className="time-series-chart-container">
        <svg
          width={width}
          height={height}
          className="time-series-chart-svg"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {renderGrid()}
          {renderAxes()}
          {renderArea()}
          {renderBar()}
          {renderSpline()}
          {renderLine()}
          {renderHoverElements()}
          {renderTooltip()}
        </svg>
      </div>
      {renderLegend()}
    </div>
  );
};

export default TimeSeriesChart;
