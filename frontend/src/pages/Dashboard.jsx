"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import DashboardHome from "../components/DashboardHome"
import UploadSection from "../components/UploadSection"
import VisualsSection from "../components/VisualsSection"
import AIInsightsSection from "../components/AIInsightsSection"
import HistorySection from "../components/HistorySection"
import { Home, Upload, Eye, Brain, History as HistoryIcon } from "lucide-react"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [chartConfig, setChartConfig] = useState({
    xAxis: "",
    yAxis: "",
    chartType: "bar",
    chartMode: "2D",
  })
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [fileId, setFileId] = useState(null)
  const [axisOptions, setAxisOptions] = useState([])

  const toggleSidebar = () => setSidebarOpen((open) => !open)

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "upload", label: "Upload Files", icon: Upload },
    { id: "visuals", label: "Visuals", icon: Eye },
    { id: "ai-insights", label: "AI Insights", icon: Brain },
    { id: "history", label: "History", icon: HistoryIcon },
  ]

  const chartTypes = [
    { value: "bar", label: "Bar Chart" },
    { value: "line", label: "Line Chart" },
    { value: "pie", label: "Pie Chart" },
    { value: "scatter", label: "Scatter Plot" },
    { value: "area", label: "Area Chart" },
  ]

  const chartModes = [
    { value: "2D", label: "2D" },
    { value: "3D", label: "3D" },
  ]

  const recentFiles = [
    { name: "Sales_Data_2024.xlsx", uploadDate: "2024-01-15", size: "2.3 MB" },
    { name: "Marketing_Analytics.csv", uploadDate: "2024-01-14", size: "1.8 MB" },
    { name: "Customer_Survey.xlsx", uploadDate: "2024-01-13", size: "3.1 MB" },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome recentFiles={recentFiles} />
      case "upload":
        return <UploadSection setFileId={setFileId} setAxisOptions={setAxisOptions} />
      case "visuals":
        return (
          <VisualsSection
            chartConfig={chartConfig}
            setChartConfig={setChartConfig}
            axisOptions={axisOptions}
            chartTypes={chartTypes}
            chartModes={chartModes}
            fileId={fileId}
          />
        )
      case "ai-insights":
        return <AIInsightsSection />
      case "history":
        return <HistorySection />
      default:
        return <div>Select a tab</div>
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarItems={sidebarItems}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeTab={activeTab} sidebarItems={sidebarItems} />
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}

export default Dashboard
