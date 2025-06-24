import React from "react"
import Card from "./Card"
import Input from "./Input"
import Button from "./Button"
import { Filter, BarChart3, Upload, Brain, Download, Clock, History } from "lucide-react"

const HistorySection = () => (
  <div className="space-y-6">
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <History className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activity History</h3>
        </div>
        <div className="flex space-x-2">
          <Input placeholder="Search history..." className="w-64" />
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {[
          {
            action: "Chart Created",
            description: "Bar chart for Sales_Data_2024.xlsx",
            time: "2 hours ago",
            icon: BarChart3,
            color: "text-emerald-600 dark:text-emerald-400",
          },
          {
            action: "File Uploaded",
            description: "Marketing_Analytics.csv uploaded successfully",
            time: "5 hours ago",
            icon: Upload,
            color: "text-blue-600 dark:text-blue-400",
          },
          {
            action: "AI Insight Generated",
            description: "Trend analysis completed for customer data",
            time: "1 day ago",
            icon: Brain,
            color: "text-purple-600 dark:text-purple-400",
          },
          {
            action: "Chart Exported",
            description: "Pie chart exported as PNG",
            time: "2 days ago",
            icon: Download,
            color: "text-orange-600 dark:text-orange-400",
          },
        ].map((item, index) => {
          const Icon = item.icon
          return (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className={`w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{item.action}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                {item.time}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  </div>
)

export default HistorySection 
 