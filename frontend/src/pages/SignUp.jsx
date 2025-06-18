import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

const SignUp = () => { 

    const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
    })

    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        const { name,email,password} = signupInfo;
        if(!name || !email || !password) {
            // Show error message
            return handleError("name, email and password are required");
        }
        try{
          const url = "http://localhost:8080/auth/signup";
          const response = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupInfo)
          })
          const result = await response.json();
          const { success,message,error } = result;
          if(success){
            handleSuccess(message);
            setTimeout(() => {
              navigate("/login");
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
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    console.log("signupInfo", signupInfo);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 border border-gray-200 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-tr from-blue-400 to-pink-400 opacity-20 rounded-full blur-2xl z-0"></div>
        <h1 className="text-3xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500 drop-shadow-lg">Sign Up</h1>
        <form className="space-y-7 z-10 relative" onSubmit={handleSignup}>
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Enter your name..."
              value={signupInfo.name}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-800 shadow-sm transition"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
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
              value={signupInfo.password}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-50 text-gray-800 shadow-sm transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:from-pink-500 hover:to-blue-500 transition text-lg tracking-wide mt-2"
          >
            Sign Up
          </button>
          <span className="block text-center mt-6 text-sm text-gray-600">
            Already have an account?
            <Link to="/login" className="text-pink-600 hover:underline ml-1 font-semibold">Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default SignUp
