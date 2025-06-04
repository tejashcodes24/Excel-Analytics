import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[])

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess("User Loggedout Successfully");
    setLoggedInUser('');
    setTimeout(() => {
      navigate("/login");
    },1000)
  }
  return (
    <div>
      <h1 className='bg-blue-600'>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>

      <ToastContainer />
    </div>
  )
}

export default Home
