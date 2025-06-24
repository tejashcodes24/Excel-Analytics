import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

const Login = () => { 

    const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
    })

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const { email,password} = loginInfo;
        if(!email || !password) {
            // Show error message
            return handleError(" email and password are required");
        }
        try{
          const url = "http://localhost:8080/auth/login";
          const response = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginInfo)
          })
          const result = await response.json();
          const { success,message,jwtToken,name,error } = result;
          if(success){
            handleSuccess(message);
            localStorage.setItem("token", jwtToken);
            localStorage.setItem("loggedInUser",name);
            setTimeout(() => {
              navigate("/dashboard");
            },1000)
          }
          else if(error){
            const details = error?.details[0].message;
            handleError(details)
          }
          else if(!success){
            handleError(message);
          }
        }
        catch(err){
          handleError(err);
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }
    console.log("loginInfo", loginInfo);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 border border-gray-200 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-tr from-blue-400 to-pink-400 opacity-20 rounded-full blur-2xl z-0"></div>
        <h1 className="text-3xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500 drop-shadow-lg">Login</h1>
        <form className="space-y-7 z-10 relative" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={loginInfo.email}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-800 shadow-sm transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={loginInfo.password}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-50 text-gray-800 shadow-sm transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:from-pink-500 hover:to-blue-500 transition text-lg tracking-wide mt-2"
          >
            Login
          </button>
          <span className="block text-center mt-6 text-sm text-gray-600">
            Don't have an account ?
            <Link to="/signup" className="text-pink-600 hover:underline ml-1 font-semibold">Sign Up</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Login
