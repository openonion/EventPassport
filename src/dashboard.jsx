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
import { useNavigate } from 'react-router-dom'

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

const AVAILABLE_ACHIEVEMENTS = [
  {
    id: 'rising_star_soft',
    title: 'Rising Star (Soft Skills)',
    description: "You've excelled significantly in at least one soft skill.",
    badge: '⭐',
    condition: (allSoftSkills) => Object.values(allSoftSkills).some(score => score >= 10),
    conditionDescription: 'Achieve a score of ≥10 in at least one soft skill.'
  },
  {
    id: 'tech_guru_hard',
    title: 'Tech Guru (Hard Skills)',
    description: "You've become highly proficient in at least one hard skill.",
    badge: '💻',
    condition: (allSoftSkills, allHardSkills) => Object.values(allHardSkills).some(score => score >= 10),
    conditionDescription: 'Achieve a score of ≥10 in at least one hard skill.'
  },
  {
    id: 'event_enthusiast',
    title: 'Event Enthusiast',
    description: "You've actively participated in many learning events.",
    badge: '🏆',
    condition: (allSoftSkills, allHardSkills, data) => data.events && data.events.length > 5,
    conditionDescription: 'Attend more than 5 events.'
  },
  {
    id: 'soft_skill_master',
    title: 'Soft Skill Master',
    description: 'Become proficient (score ≥15) in at least one soft skill.',
    badge: '🌱',
    condition: (allSoftSkills) => Object.values(allSoftSkills).some(score => score >= 15),
    conditionDescription: 'Achieve a score of ≥15 in at least one soft skill.'
  },
  {
    id: 'hard_skill_master',
    title: 'Hard Skill Master',
    description: 'Become proficient (score ≥15) in at least one hard skill.',
    badge: '🔧',
    condition: (allSoftSkills, allHardSkills) => Object.values(allHardSkills).some(score => score >= 15),
    conditionDescription: 'Achieve a score of ≥15 in at least one hard skill.'
  },
  {
    id: '100_hours_spent',
    title: 'Marathon Learner',
    description: 'Spent 100+ hours in events.',
    badge: '⏰',
    condition: () => false, // placeholder
    conditionDescription: 'Accumulate more than 100 hours spent in events.'
  },
  {
    id: '50_socials_attended',
    title: 'Social Butterfly',
    description: 'Attended 50+ socials in events.',
    badge: '🎉',
    condition: () => false, // placeholder
    conditionDescription: 'Attend over 50 social events.'
  },
  {
    id: '5_team_leads',
    title: 'Team Leader',
    description: 'Led a team in 5+ events.',
    badge: '👑',
    condition: () => false, // placeholder
    conditionDescription: 'Lead a team in more than 5 events.'
  },
  {
    id: '10_academic_events',
    title: 'Academic Achiever',
    description: 'Completed 10+ academic development events.',
    badge: '🎓',
    condition: () => false, // placeholder
    conditionDescription: 'Complete at least 10 academic development events.'
  }
]

const Dashboard = () => {
  const navigate = useNavigate();
  const [topSoftSkills, setTopSoftSkills] = useState({ labels: [], data: [] })
  const [topHardSkills, setTopHardSkills] = useState({ labels: [], data: [] })
  const [topEvents, setTopEvents] = useState([])
  const [allSoftSkills, setAllSoftSkills] = useState({})
  const [allHardSkills, setAllHardSkills] = useState({})

  useEffect(() => {
    const localSoftSkills = {}
    const localHardSkills = {}

    const enrichedEvents = eventsData.events.map(event => {
      const totalImprovement = Object.values(event.skill_improvement_scores || {})
        .reduce((acc, val) => acc + val, 0)

      // Aggregate soft skills
      if (event.softskills) {
        event.softskills.forEach(skill => {
          const score = event.skill_improvement_scores?.[skill] || 1
          localSoftSkills[skill] = (localSoftSkills[skill] || 0) + score
        })
      }

      // Aggregate hard skills
      if (event.hardskills) {
        event.hardskills.forEach(skill => {
          const score = event.skill_improvement_scores?.[skill] || 1
          localHardSkills[skill] = (localHardSkills[skill] || 0) + score
        })
      }

      return { ...event, totalImprovement }
    })

    // Sort events by total improvement to get top 3
    const sortedEvents = enrichedEvents.sort((a, b) => b.totalImprovement - a.totalImprovement)
    const topThree = sortedEvents.slice(0, 3)
    setTopEvents(topThree)

    // Sort and pick top 5 soft skills
    const sortedSoft = Object.entries(localSoftSkills)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)

    // Sort and pick top 5 hard skills
    const sortedHard = Object.entries(localHardSkills)
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

    setAllSoftSkills(localSoftSkills)
    setAllHardSkills(localHardSkills)
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

  const handleAICoachClick = () => {
    // Redirect user to premium upgrade page or handle logic
    navigate('/upgrade') 
  }

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Student Skill Dashboard
      </h1>
      <div className="flex justify-center mb-8">
        <button
          onClick={handleAICoachClick}
          className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-bold py-2 px-6 rounded-full hover:shadow-xl hover:scale-105 transition-transform"
        >
          Try AI Coach (Go Premium)
        </button>
      </div>
      
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

      {/* Achievements Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Achievements</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
          {AVAILABLE_ACHIEVEMENTS.map((ach, index) => {
            const isEarned = ach.condition(allSoftSkills, allHardSkills, eventsData)
            return (
              <div 
                key={index} 
                className={`flex flex-col items-center p-6 rounded-lg shadow-md transition-all 
                ${isEarned ? 'bg-green-50 border border-green-200' : 'bg-gray-100 border border-gray-200'}`}
              >
                <div className="text-4xl mb-4">
                  {isEarned ? ach.badge : '🔒'}
                </div>
                <h3 className={`font-bold text-xl mb-2 ${isEarned ? 'text-gray-800' : 'text-gray-600'}`}>
                  {ach.title}
                </h3>
                <p className={`text-center mb-2 ${isEarned ? 'text-gray-700' : 'text-gray-500'}`}>
                  {ach.description}
                </p>
                {!isEarned && (
                  <p className="text-center italic text-gray-500 text-sm mt-2">
                    How to unlock: {ach.conditionDescription}
                  </p>
                )}
              </div>
            )
          })}
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
