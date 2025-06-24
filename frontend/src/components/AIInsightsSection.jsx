import React from "react"
import Card from "./Card"
import { Brain } from "lucide-react"

const AIInsightsSection = () => (
  <div className="space-y-6">
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Insights</h3>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Data Pattern Analysis</h4>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            Your sales data shows a 23% increase in Q4 compared to Q3. Consider focusing marketing efforts on
            top-performing categories.
          </p>
        </div>
        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <h4 className="font-medium text-emerald-900 dark:text-emerald-100 mb-2">Trend Prediction</h4>
          <p className="text-emerald-800 dark:text-emerald-200 text-sm">
            Based on historical data, we predict a 15% growth in the next quarter. Revenue is expected to reach
            $2.3M.
          </p>
        </div>
        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-2">Anomaly Detection</h4>
          <p className="text-orange-800 dark:text-orange-200 text-sm">
            Unusual spike detected in Region B during week 3. This could indicate a successful local campaign or
            data entry error.
          </p>
        </div>
      </div>
    </Card>
  </div>
)

export default AIInsightsSection 