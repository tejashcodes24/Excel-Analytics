import React from "react"

const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-lg border bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  )
}

export default Card 