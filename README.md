# Time-Series Chart Component

A reusable, responsive time-series chart component built with React and SVG. It supports four series types: Area, Spline, Line, and Bar, with interactive tooltips and crosshairs.

![Chart Preview](https://brief.cleanshot.cloud/media/24354/qZLNAOF0l4fKK0HNdLMNRWF2XbzRKOTvz6VLDpRJ.gif.jpg)

## Features

- **Four Series Types**: Area, Spline (smooth curve), Line (with markers), and Bar.
- **Interactive Tooltip**: Shows values for all series at the hovered point.
- **Crosshair**: Vertical line and active point indicators on hover.
- **Responsive**: Automatically adjusts to the container's width.
- **Customizable**: Accepts any time-series data matching the `DataPoint` interface.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Usage Example

```tsx
import TimeSeriesChart from './components/TimeSeriesChart/TimeSeriesChart';

const areaSeries = [
  { timestamp: '2026-06-06', value: 35.5 },
  { timestamp: '2026-06-07', value: 42.1 },
  // ...
];

const splineSeries = [...];
const lineSeries = [...];
const barSeries = [...];

function App() {
  return (
    <TimeSeriesChart
      areaSeries={areaSeries}
      splineSeries={splineSeries}
      lineSeries={lineSeries}
      barSeries={barSeries}
    />
  );
}
```

## Component API

### Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `areaSeries` | `DataPoint[]` | Data for the yellow area series (e.g., Cost). |
| `splineSeries` | `DataPoint[]` | Data for the green spline series (e.g., ROI). |
| `lineSeries` | `DataPoint[]` | Data for the purple line series (e.g., Conversions). |
| `barSeries` | `DataPoint[]` | Data for the blue bar series (e.g., CPA). |

### DataPoint Type

```ts
type DataPoint = {
  timestamp: string | number;
  value: number;
};
```
