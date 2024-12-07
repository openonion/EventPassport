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
  const [chartData, setChartData] = useState({
    roles: { labels: [], data: [] },
    eventTypes: { labels: [], data: [] },
    responsibilities: { labels: [], data: [] },
  })

  useEffect(() => {
    // Process roles data
    const roleCounts = eventsData.events.reduce((acc, event) => {
      acc[event.user_role] = (acc[event.user_role] || 0) + 1
      return acc
    }, {})

    // Process event types data (using event names and grouping similar events)
    const eventTypeCounts = eventsData.events.reduce((acc, event) => {
      const type = event.event_name.split(' ')[0] // Get first word as type
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {})

    // Process common words in responsibilities
    const words = eventsData.events
      .map(event => event.user_responsibility.toLowerCase())
      .join(' ')
      .split(/\s+/)
      .filter(word => word.length > 5) // Filter out short words
      .reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1
        return acc
      }, {})

    // Sort and get top 10 responsibility words
    const topWords = Object.entries(words)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)

    setChartData({
      roles: {
        labels: Object.keys(roleCounts),
        data: Object.values(roleCounts),
      },
      eventTypes: {
        labels: Object.keys(eventTypeCounts),
        data: Object.values(eventTypeCounts),
      },
      responsibilities: {
        labels: topWords.map(([word]) => word),
        data: topWords.map(([, count]) => count),
      },
    })
  }, [])

  const pieChartData = {
    labels: chartData.roles.labels,
    datasets: [
      {
        data: chartData.roles.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const eventTypesChartData = {
    labels: chartData.eventTypes.labels,
    datasets: [
      {
        label: 'Number of Events by Type',
        data: chartData.eventTypes.data,
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const responsibilitiesChartData = {
    labels: chartData.responsibilities.labels,
    datasets: [
      {
        label: 'Common Activities in Events',
        data: chartData.responsibilities.data,
        backgroundColor: 'rgba(153, 102, 255, 0.8)',
        borderColor: 'rgba(153, 102, 255, 1)',
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
        text: 'Event Analysis',
        font: {
          size: 16,
        },
      },
    },
  }

  const barOptions = {
    ...options,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Event Analysis Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Role Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Role Distribution
          </h2>
          <Pie data={pieChartData} options={options} />
        </div>

        {/* Event Types */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Event Types
          </h2>
          <Bar data={eventTypesChartData} options={barOptions} />
        </div>

        {/* Common Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Common Activities
          </h2>
          <Bar data={responsibilitiesChartData} options={barOptions} />
        </div>
      </div>

      {/* Event List */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Events
        </h2>
        <div className="grid gap-4">
          {eventsData.events.slice(0, 5).map((event, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-lg">{event.event_name}</h3>
              <p className="text-gray-600">{event.event_description}</p>
              <div className="mt-2 flex gap-2">
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                  {event.user_role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
