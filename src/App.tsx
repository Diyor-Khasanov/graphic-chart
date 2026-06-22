import { useMemo } from 'react'
import TimeSeriesChart from './components/TimeSeriesChart/TimeSeriesChart'
import { generateMockData } from './utils/mockData'
import './App.css'

function App() {
  const data = useMemo(() => generateMockData(), [])

  return (
    <div className="app-container">
      <h1>Time-Series Chart</h1>
      <div className="chart-wrapper">
        <TimeSeriesChart
          areaSeries={{ name: 'Cost', data: data.areaSeries }}
          splineSeries={{ name: 'ROI confirmed', data: data.splineSeries }}
          lineSeries={{ name: 'Conversions', data: data.lineSeries }}
          barSeries={{ name: 'CPA', data: data.barSeries }}
        />
      </div>
    </div>
  )
}

export default App
