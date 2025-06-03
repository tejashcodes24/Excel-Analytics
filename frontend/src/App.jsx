import { useState } from 'react'
import { Navigate, Routes } from 'react-router-dom'
//import './App.css'
import Login from './pages/Login'
import { Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to = "/login" />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
