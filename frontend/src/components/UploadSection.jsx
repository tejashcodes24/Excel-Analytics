import React, { useRef, useState } from "react"
import Card from "./Card"
import Button from "./Button"
import { Upload, X } from "lucide-react"
import { useFile } from "../contexts/FileContext"

const UploadSection = ({ setFileId, setAxisOptions }) => {
  const fileInputRef = useRef(null)
  const [error, setError] = useState("")
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState("")
  const { fileInfo, setFileInfo, preview, setPreview, clearFile } = useFile()

  const handleButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const validExtensions = [".xlsx", ".xls"]
    const fileName = file.name.toLowerCase()
    const isValid = validExtensions.some(ext => fileName.endsWith(ext))
    if (!isValid) {
      setError("Please select a valid Excel file (.xlsx or .xls)")
      return
    }
    setError("")
    setUploading(true)
    setSuccess("")
    try {
      const formData = new FormData()
      formData.append('file', file)
      // Optionally add user info if available
      const user = localStorage.getItem('loggedInUser')
      if (user) formData.append('user', user)
      const response = await fetch('http://localhost:8080/files/upload', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      if (data.success) {
        setFileId && setFileId(data.fileId)
        setAxisOptions && setAxisOptions(data.columns.map(col => ({ value: col, label: col })))
        setFileInfo({ fileId: data.fileId, name: file.name, columns: data.columns })
        setSuccess("File uploaded and columns extracted!")
        // Fetch preview
        const previewRes = await fetch(`http://localhost:8080/files/${data.fileId}/preview`)
        const previewData = await previewRes.json()
        if (previewData.success) {
          setPreview(previewData.preview)
        } else {
          setPreview(null)
        }
      } else {
        setError(data.message || "Upload failed")
      }
    } catch (err) {
      setError("Upload failed: " + err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleClear = () => {
    clearFile()
    setSuccess("")
    setError("")
    setFileId && setFileId(null)
    setAxisOptions && setAxisOptions([])
  }

  return (
    <div className="space-y-6">
      <Card className="p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload Excel Files</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Drag and drop your Excel files here or click to browse
          </p>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 hover:border-emerald-500 transition-colors">
            <div className="text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">Drop files here or click to upload</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Supports .xlsx, .xls files</p>
              {fileInfo && (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-emerald-600 dark:text-emerald-400">Selected: {fileInfo.name}</span>
                  <button onClick={handleClear} className="ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700" title="Remove file">
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              )}
              {uploading && <p className="mt-2 text-blue-600 dark:text-blue-400">Uploading...</p>}
              {success && <p className="mt-2 text-green-600 dark:text-green-400">{success}</p>}
              {error && (
                <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>
              )}
            </div>
            <input
              type="file"
              accept=".xlsx,.xls"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <div className="flex justify-center mt-6">
            <Button onClick={handleButtonClick} disabled={uploading}>Choose Files</Button>
          </div>
        </div>
        {/* Preview Table */}
        {fileInfo && preview && preview.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <h4 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">Preview</h4>
            <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded">
              <thead>
                <tr>
                  {preview[0].map((col, idx) => (
                    <th key={idx} className="px-3 py-2 border-b border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-200">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.slice(1).map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 text-xs text-gray-800 dark:text-gray-100">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

export default UploadSection 