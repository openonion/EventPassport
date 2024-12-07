import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  RadarController,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import eventsData from './events.json'

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  RadarController,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
)

const Dashboard = () => {
  const [topSoftSkills, setTopSoftSkills] = useState({ labels: [], data: [] })
  const [topHardSkills, setTopHardSkills] = useState({ labels: [], data: [] })
  const [topEvents, setTopEvents] = useState([])

  useEffect(() => {
    const allSoftSkills = {}
    const allHardSkills = {}
    const enrichedEvents = eventsData.events.map(event => {
      const totalImprovement = Object.values(event.skill_improvement_scores || {})
        .reduce((acc, val) => acc + val, 0)

      // Aggregate soft skills
      if (event.softskills) {
        event.softskills.forEach(skill => {
          const score = event.skill_improvement_scores?.[skill] || 1
          allSoftSkills[skill] = (allSoftSkills[skill] || 0) + score
        })
      }

      // Aggregate hard skills
      if (event.hardskills) {
        event.hardskills.forEach(skill => {
          const score = event.skill_improvement_scores?.[skill] || 1
          allHardSkills[skill] = (allHardSkills[skill] || 0) + score
        })
      }

      return { ...event, totalImprovement }
    })

    // Sort events by total improvement to get top 3
    const sortedEvents = enrichedEvents.sort((a, b) => b.totalImprovement - a.totalImprovement)
    const topThree = sortedEvents.slice(0, 3)
    setTopEvents(topThree)

    // Sort and pick top 5 soft skills
    const sortedSoft = Object.entries(allSoftSkills)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)

    // Sort and pick top 5 hard skills
    const sortedHard = Object.entries(allHardSkills)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)

    setTopSoftSkills({
      labels: sortedSoft.map(([skill]) => skill),
      data: sortedSoft.map(([, score]) => score),
    })

    setTopHardSkills({
      labels: sortedHard.map(([skill]) => skill),
      data: sortedHard.map(([, score]) => score),
    })
  }, [])

  const radarOptions = {
    responsive: true,
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1
        },
        pointLabels: {
          font: {
            size: 14
          }
        }
      }
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Skill Improvements',
        font: { size: 16 }
      }
    },
  }

  const softSkillChartData = {
    labels: topSoftSkills.labels,
    datasets: [
      {
        label: 'Soft Skills',
        data: topSoftSkills.data,
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  }

  const hardSkillChartData = {
    labels: topHardSkills.labels,
    datasets: [
      {
        label: 'Hard Skills',
        data: topHardSkills.data,
        backgroundColor: 'rgba(153, 102, 255, 0.4)',
        borderColor: 'rgba(153, 102, 255, 1)',
        pointBackgroundColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Student Skill Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Soft Skills Radar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Soft Skills</h2>
          {topSoftSkills.labels.length > 0 ? (
            <div className="w-full">
              <Radar data={softSkillChartData} options={radarOptions} />
            </div>
          ) : (
            <p className="text-gray-500">No soft skill data available.</p>
          )}
        </div>

        {/* Top Hard Skills Radar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Hard Skills</h2>
          {topHardSkills.labels.length > 0 ? (
            <div className="w-full">
              <Radar data={hardSkillChartData} options={radarOptions} />
            </div>
          ) : (
            <p className="text-gray-500">No hard skill data available.</p>
          )}
        </div>
      </div>

      {/* Top 3 Events */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Top 3 Events</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
          {topEvents.map((event, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-xl mb-2 text-gray-800">{event.event_name}</h3>
              <p className="text-gray-600 mb-4">{event.event_description}</p>
              <strong className="text-gray-700 mb-1 block">Skills Improved:</strong>
              <ul className="list-disc ml-5 text-gray-700">
                {Object.entries(event.skill_improvement_scores || {}).map(([skill, score], i) => (
                  <li key={i}>{skill}: +{score}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* All Events List */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">All Attended Events</h2>
        {eventsData.events.map((event, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 mb-4">
            <h3 className="font-semibold text-lg">{event.event_name}</h3>
            <p className="text-gray-600 mb-2">{event.event_description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {event.softskills?.map((skill, i) => (
                <span key={i} className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
              {event.hardskills?.map((skill, i) => (
                <span key={i} className="bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
            <div>
              <strong>Skill Improvements:</strong>
              <ul className="list-disc ml-6 mt-2 text-gray-700">
                {Object.entries(event.skill_improvement_scores || {}).map(([skill, score], i) => (
                  <li key={i}>{skill}: +{score}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
