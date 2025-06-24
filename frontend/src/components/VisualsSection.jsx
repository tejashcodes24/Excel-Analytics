import React, { useEffect, useState, useRef } from "react"
import Card from "./Card"
import Button from "./Button"
import Select from "./Select"
import { BarChart3, RefreshCw, Download, Settings, AlertTriangle } from "lucide-react"
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend)

const chartTypeToComponent = {
  bar: Bar,
  line: Line,
  pie: Pie,
  scatter: Scatter,
  area: Line, // Area chart will use Line with fill: true
}

const VisualsSection = ({ chartConfig, setChartConfig, chartTypes, chartModes, fileId, axisOptions }) => {
  const [dynamicOptions, setDynamicOptions] = useState(axisOptions || [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [chartData, setChartData] = useState(null)
  const [chartLoading, setChartLoading] = useState(false)
  const [threeContainer, setThreeContainer] = useState(null)
  const [threeInitialized, setThreeInitialized] = useState(false)

  useEffect(() => {
    const fetchColumns = async () => {
      if (!fileId) return
      setLoading(true)
      setError("")
      try {
        const res = await fetch(`http://localhost:8080/files/${fileId}/columns`)
        const data = await res.json()
        if (data.success) {
          setDynamicOptions(data.columns.map(col => ({ value: col, label: col })))
        } else {
          setError(data.message || "Failed to fetch columns")
        }
      } catch (err) {
        setError("Failed to fetch columns: " + err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchColumns()
  }, [fileId])

  // Clean up Three.js scene on unmount or when switching from 3D to 2D
  useEffect(() => {
    return () => {
      if (threeContainer && threeContainer.firstChild) {
        threeContainer.removeChild(threeContainer.firstChild)
      }
    }
  }, [])

  // Render 3D chart if needed
  useEffect(() => {
    const is3D = chartConfig.chartMode?.value?.toLowerCase?.() === '3d' || chartConfig.chartMode?.toLowerCase?.() === '3d';
    if (!is3D || !chartData || !threeContainer) {
      console.log('[3D DEBUG] Skipping 3D render:', {
        chartMode: chartConfig.chartMode,
        chartData,
        threeContainer
      });
      return
    }
    console.log('[3D DEBUG] Rendering 3D chart with:', {
      chartData,
      chartConfig,
      threeContainer
    });
    // Clean up previous scene
    if (threeContainer.firstChild) {
      threeContainer.removeChild(threeContainer.firstChild)
    }
    // Advanced 3D bar chart
    const width = threeContainer.offsetWidth || 600
    const height = 400
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x181e29)
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(6, 8, 12)
    camera.lookAt(0, 0, 0)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    threeContainer.appendChild(renderer.domElement)
    // Add grid helper
    const gridHelper = new THREE.GridHelper(20, 20, 0x888888, 0x444444)
    scene.add(gridHelper)
    // Add axes
    const axesHelper = new THREE.AxesHelper(10)
    scene.add(axesHelper)
    // Add ground plane
    const planeGeometry = new THREE.PlaneGeometry(20, 20)
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x222831, side: THREE.DoubleSide })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -Math.PI / 2
    plane.position.y = 0
    scene.add(plane)
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.7)
    dirLight.position.set(10, 20, 10)
    scene.add(dirLight)
    // Bar chart data
    const xLabels = chartData.labels
    const yData = chartData.datasets[0].data
    const barWidth = 0.7
    const gap = 0.5
    const barColor = 0x4ade80
    const bars = []
    // For tooltips
    let hoveredBarIndex = null
    // Create bars
    for (let i = 0; i < xLabels.length; i++) {
      const geometry = new THREE.BoxGeometry(barWidth, yData[i], barWidth)
      const material = new THREE.MeshPhongMaterial({ color: barColor, shininess: 80 })
      const bar = new THREE.Mesh(geometry, material)
      bar.position.x = i * (barWidth + gap)
      bar.position.y = yData[i] / 2
      bar.position.z = 0
      bar.userData = { label: xLabels[i], value: yData[i], index: i }
      scene.add(bar)
      bars.push(bar)
    }
    // Add value labels (using Sprite for simplicity)
    const makeTextSprite = (message) => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      context.font = 'bold 24px Arial'
      context.fillStyle = '#fff'
      context.textAlign = 'center'
      context.fillText(message, 64, 32)
      const texture = new THREE.CanvasTexture(canvas)
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture })
      const sprite = new THREE.Sprite(spriteMaterial)
      sprite.scale.set(1.5, 0.5, 1)
      return sprite
    }
    bars.forEach((bar, i) => {
      const valueLabel = makeTextSprite(yData[i].toString())
      valueLabel.position.set(bar.position.x, bar.position.y + (yData[i] / 2) + 0.5, bar.position.z)
      scene.add(valueLabel)
    })
    // OrbitControls for interactivity
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.screenSpacePanning = false
    controls.minDistance = 2
    controls.maxDistance = 50
    controls.maxPolarAngle = Math.PI / 2
    // Tooltip div
    let tooltipDiv = document.getElementById('threejs-tooltip')
    if (!tooltipDiv) {
      tooltipDiv = document.createElement('div')
      tooltipDiv.id = 'threejs-tooltip'
      tooltipDiv.style.position = 'absolute'
      tooltipDiv.style.background = 'rgba(30,30,30,0.95)'
      tooltipDiv.style.color = '#fff'
      tooltipDiv.style.padding = '6px 12px'
      tooltipDiv.style.borderRadius = '6px'
      tooltipDiv.style.pointerEvents = 'none'
      tooltipDiv.style.zIndex = 1000
      tooltipDiv.style.display = 'none'
      document.body.appendChild(tooltipDiv)
    }
    // Raycaster for tooltips
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    function onPointerMove(event) {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(bars)
      if (intersects.length > 0) {
        const bar = intersects[0].object
        hoveredBarIndex = bar.userData.index
        tooltipDiv.style.display = 'block'
        tooltipDiv.innerHTML = `<b>${bar.userData.label}</b>: ${bar.userData.value}`
        tooltipDiv.style.left = `${event.clientX + 10}px`
        tooltipDiv.style.top = `${event.clientY - 20}px`
      } else {
        hoveredBarIndex = null
        tooltipDiv.style.display = 'none'
      }
    }
    renderer.domElement.addEventListener('pointermove', onPointerMove)
    // Animation loop
    function animate() {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()
    setThreeInitialized(true)
    // Clean up on unmount
    return () => {
      renderer.dispose()
      controls.dispose()
      renderer.domElement.removeEventListener('pointermove', onPointerMove)
      if (tooltipDiv) tooltipDiv.style.display = 'none'
      setThreeInitialized(false)
    }
  }, [chartConfig.chartMode, chartData, threeContainer])

  const handleGenerateChart = async () => {
    if (!fileId || !chartConfig.xAxis || !chartConfig.yAxis) {
      setError("Please select file, X-Axis and Y-Axis.")
      return
    }
    // Support both object and string values
    const xAxis = chartConfig.xAxis.value || chartConfig.xAxis
    const yAxis = chartConfig.yAxis.value || chartConfig.yAxis
    console.log('Generating chart with:', { xAxis, yAxis, chartConfig })
    setChartLoading(true)
    setError("")
    try {
      const res = await fetch(`http://localhost:8080/files/${fileId}/chart-data?xAxis=${encodeURIComponent(xAxis)}&yAxis=${encodeURIComponent(yAxis)}`)
      const data = await res.json()
      if (data.success) {
        // Format for Chart.js
        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: chartConfig.yAxis.label || yAxis,
              data: data.values,
              backgroundColor: 'rgba(16, 185, 129, 0.7)',
              borderColor: 'rgba(16, 185, 129, 1)',
              borderWidth: 1,
            },
          ],
        })
      } else {
        setError(data.message || "Failed to fetch chart data")
      }
    } catch (err) {
      setError("Failed to fetch chart data: " + err.message)
    } finally {
      setChartLoading(false)
    }
  }

  const handleReset = () => {
    setChartConfig({ xAxis: null, yAxis: null, chartType: null, chartMode: null })
    setChartData(null)
    setError("")
    setThreeInitialized(false)
    if (threeContainer && threeContainer.firstChild) {
      threeContainer.removeChild(threeContainer.firstChild)
    }
  }

  return (
    <div className="space-y-6">
      {/* Chart Configuration */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chart Configuration</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select X-Axis</label>
            <Select
              options={dynamicOptions}
              value={chartConfig.xAxis}
              onChange={(value) => setChartConfig({ ...chartConfig, xAxis: value })}
              placeholder={loading ? "Loading..." : "Choose X-Axis"}
              disabled={loading || !fileId}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Y-Axis</label>
            <Select
              options={dynamicOptions}
              value={chartConfig.yAxis}
              onChange={(value) => setChartConfig({ ...chartConfig, yAxis: value })}
              placeholder={loading ? "Loading..." : "Choose Y-Axis"}
              disabled={loading || !fileId}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chart Type</label>
            <Select
              options={chartTypes}
              value={chartConfig.chartType}
              onChange={(value) => setChartConfig({ ...chartConfig, chartType: value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chart Mode</label>
            <Select
              options={chartModes}
              value={chartConfig.chartMode}
              onChange={(value) => setChartConfig({ ...chartConfig, chartMode: value })}
            />
          </div>
        </div>
        {error && <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>}
        <div className="flex justify-between items-center mt-6">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleGenerateChart} disabled={chartLoading}>
            <BarChart3 className="w-4 h-4 mr-2" />
            {chartLoading ? "Generating..." : "Generate Chart"}
          </Button>
        </div>
      </Card>
      {/* Chart Preview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chart Preview</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          {chartData ? (
            (chartConfig.chartMode?.value?.toLowerCase?.() === '3d' || chartConfig.chartMode?.toLowerCase?.() === '3d') ? (
              <div ref={setThreeContainer} style={{ width: '100%', height: '100%' }} />
            ) : (
              (() => {
                let chartType = chartConfig.chartType?.value || 'bar'
                let ChartComponent = chartTypeToComponent[chartType] || Bar
                let data = chartData
                let options = { responsive: true, maintainAspectRatio: false }
                // Area chart: use Line with fill
                if (chartType === 'area') {
                  data = {
                    ...chartData,
                    datasets: chartData.datasets.map(ds => ({ ...ds, fill: true }))
                  }
                }
                // Pie chart: use array of colors
                if (chartType === 'pie') {
                  const pieColors = [
                    '#4ade80', '#60a5fa', '#fbbf24', '#f87171', '#a78bfa', '#34d399', '#f472b6', '#facc15', '#38bdf8', '#f472b6'
                  ]
                  data = {
                    labels: chartData.labels,
                    datasets: [
                      {
                        label: chartConfig.yAxis.label || chartConfig.yAxis || 'Y',
                        data: chartData.datasets[0].data,
                        backgroundColor: pieColors.slice(0, chartData.labels.length),
                      },
                    ],
                  }
                  options = {
                    ...options,
                    plugins: {
                      legend: { display: true, position: 'top' },
                    },
                  }
                }
                // Scatter plot: format data as [{x, y}, ...]
                if (chartType === 'scatter') {
                  data = {
                    datasets: [
                      {
                        label: chartConfig.yAxis.label || chartConfig.yAxis || 'Y',
                        data: chartData.labels.map((x, i) => ({ x, y: chartData.datasets[0].data[i] })),
                        backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        borderColor: 'rgba(16, 185, 129, 1)',
                      },
                    ],
                  }
                  options = {
                    ...options,
                    scales: {
                      x: { type: 'category', title: { display: true, text: chartConfig.xAxis.label || chartConfig.xAxis || 'X' } },
                      y: { title: { display: true, text: chartConfig.yAxis.label || chartConfig.yAxis || 'Y' } },
                    },
                  }
                }
                return <ChartComponent data={data} options={options} height={220} />
              })()
            )
          ) : (
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-400">No data available to render the chart</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Upload a file to get started</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default VisualsSection 