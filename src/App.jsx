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
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Event Analysis Dashboard
      </h1>
      <div className="flex flex-wrap gap-8 justify-center">
        <div className="flex-1 min-w-[300px] max-w-[500px] p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Bar Chart</h2>
          <Bar data={barChartData} options={options} />
        </div>
        <div className="flex-1 min-w-[300px] max-w-[500px] p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Pie Chart</h2>
          <Pie data={pieChartData} options={options} />
        </div>
      </div>
    </div>
  )
}

export default App
