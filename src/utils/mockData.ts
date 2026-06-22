export type DataPoint = {
  timestamp: string | number;
  value: number;
};

export const generateMockData = () => {
  const now = new Date('2026-06-12T00:00:00Z');
  const points = 7;
  const data = {
    areaSeries: [] as DataPoint[],
    splineSeries: [] as DataPoint[],
    lineSeries: [] as DataPoint[],
    barSeries: [] as DataPoint[],
  };

  for (let i = 0; i < points; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - (points - 1 - i));
    const timestamp = date.toISOString().split('T')[0];

    // Trying to match the screenshot values around the hover point
    // Cost (Area, yellow): ~44
    // CPA (Bar, blue): ~1.2
    // ROI confirmed (Spline, green): ~161
    // Conversions (Line, purple): ~36

    data.areaSeries.push({
      timestamp,
      value: 30 + Math.random() * 30,
    });
    data.splineSeries.push({
      timestamp,
      value: 100 + Math.random() * 100,
    });
    data.lineSeries.push({
      timestamp,
      value: 10 + Math.random() * 50,
    });
    data.barSeries.push({
      timestamp,
      value: 0.5 + Math.random() * 2,
    });
  }

  // Set the specific values from the screenshot for the last point to make it easier to compare
  const lastIdx = points - 1;
  data.areaSeries[lastIdx].value = 44.36;
  data.barSeries[lastIdx].value = 1.23;
  data.splineSeries[lastIdx].value = 161.47;
  data.lineSeries[lastIdx].value = 36;

  return data;
};
