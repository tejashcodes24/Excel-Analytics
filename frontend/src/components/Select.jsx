import React from "react"

const Select = ({ options, value, onChange, placeholder, className = "" }) => {
  return (
    <select
      value={value?.value || value || ""}
      onChange={(e) => {
        const selected = options.find(opt => opt.value === e.target.value)
        onChange(selected || e.target.value)
      }}
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white ${className}`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select 