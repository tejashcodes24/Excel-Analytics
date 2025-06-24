import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const RefreshHandler = ({setIsAuthenticated}) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token') && localStorage.getItem('loggedInUser')) {
            setIsAuthenticated(true);
            if(location.pathname === '/login' || location.pathname === '/' || location.pathname === '/signup') {
                navigate('/dashboard', { replace: false });
            }
        }
    },[location, navigate, setIsAuthenticated]);
  return (
    <div>
      
    </div>
  )
}

export default RefreshHandler;