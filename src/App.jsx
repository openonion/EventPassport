import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom'
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
import Dashboard from './dashboard'
import { Login } from './login'

// Registering chart components
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

// ------------------------ Protected Route Logic ------------------------
function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true'

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  return isLoggedIn ? children : null
}

// ------------------------ App Component with Routing ------------------------
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
