import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import eventsData from './events.json'
import './App.css'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

function App() {
  const [roleData, setRoleData] = useState({
    labels: [],
    counts: [],
  })

  useEffect(() => {
    // Count the number of events by role
    const roleCounts = eventsData.events.reduce((acc, event) => {
      acc[event.user_role] = (acc[event.user_role] || 0) + 1
      return acc
    }, {})

    setRoleData({
      labels: Object.keys(roleCounts),
      counts: Object.values(roleCounts),
    })
  }, [])

  // Bar chart configuration
  const barChartData = {
    labels: roleData.labels,
    datasets: [
      {
        label: 'Number of Events by Role',
        data: roleData.counts,
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  }

  // Pie chart configuration
  const pieChartData = {
    labels: roleData.labels,
    datasets: [
      {
        data: roleData.counts,
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Event Participation Distribution',
      },
    },
  }

  return (
    <div className="chart-container">
      <h1>Event Analysis Dashboard</h1>
      <div className="charts">
        <div className="chart">
          <h2>Bar Chart</h2>
          <Bar data={barChartData} options={options} />
        </div>
        <div className="chart">
          <h2>Pie Chart</h2>
          <Pie data={pieChartData} options={options} />
        </div>
      </div>
    </div>
  )
}

export default App
