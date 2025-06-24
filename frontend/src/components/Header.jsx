import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { handleSuccess } from "../utils"
import { ToastContainer } from "react-toastify"
import Button from "./Button"
import { LogOut, User } from "lucide-react"

const Header = ({ activeTab, sidebarItems }) => {
  const [loggedInUser, setLoggedInUser] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("loggedInUser")
    handleSuccess("User Logged out Successfully")
    setLoggedInUser("")
    setTimeout(() => {
      navigate("/login")
    }, 1000)
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {sidebarItems.find((item) => item.id === activeTab)?.label || "Dashboard"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your data.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{loggedInUser || "User"}</p>
            </div>
          </div>
          <Button variant="danger" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
        {/* <ToastContainer /> */}
      </div>
    </header>
  )
}

export default Header 