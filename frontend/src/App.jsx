import { useState } from 'react'
import { Navigate, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import { Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import RefreshHandler from './refreshHandler'
import LandingPage from './pages/LandingPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  }
  return (
      <div className="App">
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />  
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </div>
  )
}

export default App
