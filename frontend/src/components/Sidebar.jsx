import React from "react"
import { BarChart3, Menu } from "lucide-react"
import Logo from '../assets/Logo.png'

const Sidebar = ({ activeTab, setActiveTab, sidebarItems, isOpen, toggleSidebar }) => (
  <div
    className={`transition-all duration-300 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 h-full ${
      isOpen ? "w-64" : "w-16"
    }`}
    style={{ position: "relative" }}
  >
    <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={toggleSidebar}
        className="mr-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        <Menu className="w-6 h-6 text-emerald-600" />
      </button>
      {isOpen && (
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="w-8 h-8 rounded-lg" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">DataVizual</h2>
        </div>
      )}
    </div>
    <nav className="p-4 space-y-2">
      {sidebarItems.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === item.id
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            <Icon className="w-5 h-5" />
            {isOpen && <span className="font-medium">{item.label}</span>}
          </button>
        )
      })}
    </nav>
  </div>
)

export default Sidebar 