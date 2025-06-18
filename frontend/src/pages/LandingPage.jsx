"use client"

import { useState } from "react"
import { useTheme } from "../contexts/ThemeContext"
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Upload,
  Zap,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Download,
  Moon,
  Sun,
} from "lucide-react"
import { useNavigate } from "react-router-dom";

const Button = ({ children, variant = "primary", size = "md", className = "", onClick, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    outline:
      "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
  }

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 py-2 px-4",
    lg: "h-11 px-8 text-lg",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-lg border bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  )
}

const CardHeader = ({ children }) => {
  return <div className="flex flex-col space-y-1.5 p-6">{children}</div>
}

const CardTitle = ({ children }) => {
  return <h3 className="text-2xl font-semibold leading-none tracking-tight dark:text-white">{children}</h3>
}

const CardDescription = ({ children }) => {
  return <p className="text-sm text-gray-600 dark:text-gray-300">{children}</p>
}

const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 ${className}`}
      {...props}
    />
  )
}

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-9 px-0">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

const LandingPage = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Email submitted:", email)
    setEmail("")
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 dark:bg-gray-900/80 dark:border-gray-800">
        <a href="/" className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl dark:text-white">ExcelViz</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <button
            onClick={() => scrollToSection("features")}
            className="text-sm font-medium hover:text-emerald-600 transition-colors dark:text-gray-300 dark:hover:text-emerald-400"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="text-sm font-medium hover:text-emerald-600 transition-colors dark:text-gray-300 dark:hover:text-emerald-400"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="text-sm font-medium hover:text-emerald-600 transition-colors dark:text-gray-300 dark:hover:text-emerald-400"
          >
            Pricing
          </button>
          <ThemeToggle />
          <Button variant="outline" size="sm" className="hidden sm:flex" onClick={() => navigate("/login")}>Sign In</Button>
          <Button size="sm" onClick={() => navigate("/login")}>Get Started</Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5" />
          <div className="container px-4 md:px-6 relative max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                    Transform Your Excel Data
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                    Turn Excel Files into
                    <span className="block text-emerald-600 dark:text-emerald-400">Beautiful Charts</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-300">
                    Upload your Excel files and instantly generate stunning visualizations. Create bar charts, pie
                    charts, line graphs, and more with just a few clicks.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  <Button size="lg">Get Started</Button>
                  <Button variant="outline" size="lg" className="gap-2">
                    <Play className="h-4 w-4" />
                    Watch Demo
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 justify-center dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    Free trial available
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    Instant results
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    Secure & private
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 dark:text-gray-300">
                  Powerful Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl dark:text-white">
                  Everything you need for data visualization
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                  Transform your spreadsheet data into compelling visual stories with our comprehensive suite of chart
                  types and customization options.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Multiple Chart Types</CardTitle>
                  <CardDescription>
                    Create bar charts, pie charts, line graphs, scatter plots, and more from your Excel data.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Instant Processing</CardTitle>
                  <CardDescription>
                    Upload your file and get beautiful visualizations in seconds. No waiting, no complex setup.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Export & Share</CardTitle>
                  <CardDescription>
                    Download your charts as high-quality images or share them directly with your team.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Secure & Private</CardTitle>
                  <CardDescription>
                    Your data is processed securely and never stored on our servers. Complete privacy guaranteed.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Team Collaboration</CardTitle>
                  <CardDescription>
                    Share your visualizations with team members and collaborate on data insights in real-time.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Smart Analytics</CardTitle>
                  <CardDescription>
                    Get automatic insights and recommendations based on your data patterns and trends.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
        >
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  Simple Process
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl dark:text-white">How It Works</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                  Get from Excel file to beautiful charts in just three simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold dark:text-white">Upload Your File</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Simply drag and drop your Excel (.xlsx) or CSV file into our secure upload area.
                </p>
                <div className="w-full max-w-sm">
                  <div className="border-2 border-dashed border-emerald-300 rounded-lg p-6 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-900/20">
                    <Upload className="w-8 h-8 text-emerald-600 mx-auto dark:text-emerald-400" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold dark:text-white">Choose Chart Type</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Select from various chart types including bar, pie, line, scatter, and more visualization options.
                </p>
                <div className="flex gap-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center dark:bg-blue-900/30">
                    <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center dark:bg-purple-900/30">
                    <PieChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center dark:bg-orange-900/30">
                    <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold dark:text-white">Get Your Charts</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Instantly generate beautiful, interactive charts that you can customize, export, or share.
                </p>
                <div className="w-full max-w-sm">
                  <div className="bg-white rounded-lg p-4 shadow-lg border dark:bg-gray-800 dark:border-gray-700">
                    <div className="h-20 bg-gradient-to-r from-emerald-200 to-teal-200 rounded flex items-end justify-center gap-1 p-2 dark:from-emerald-800 dark:to-teal-800">
                      <div className="w-4 bg-emerald-500 rounded-t dark:bg-emerald-400" style={{ height: "60%" }}></div>
                      <div className="w-4 bg-teal-500 rounded-t dark:bg-teal-400" style={{ height: "80%" }}></div>
                      <div className="w-4 bg-emerald-400 rounded-t dark:bg-emerald-300" style={{ height: "40%" }}></div>
                      <div className="w-4 bg-teal-400 rounded-t dark:bg-teal-300" style={{ height: "90%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Ready to Transform Your Data?
                </h2>
                <p className="max-w-[600px] text-emerald-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who are already creating stunning visualizations from their Excel data.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg"
                  className="bg-white !text-emerald-600 hover:bg-gray-100"
                  onClick={() => navigate("/login")}
                >
                  Start Creating Charts
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-emerald-600"
                >
                  View Examples
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-6 text-emerald-100 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span>4.9/5 from 2,000+ users</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="grid items-center justify-center gap-4 text-center">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight dark:text-white">
                  Stay Updated with New Features
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                  Get notified about new chart types, features, and tips for better data visualization.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex gap-2" onSubmit={handleSubmit}>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-lg flex-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No spam. Unsubscribe at any time.{" "}
                  <a
                    href="/privacy"
                    className="underline underline-offset-2 hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold dark:text-white">ExcelViz</span>
        </div>
        <p className="text-xs text-gray-500 sm:ml-4 dark:text-gray-400">© 2024 ExcelViz. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a
            href="/terms"
            className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400 dark:hover:text-emerald-400"
          >
            Terms of Service
          </a>
          <a
            href="/privacy"
            className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400 dark:hover:text-emerald-400"
          >
            Privacy Policy
          </a>
          <a
            href="/contact"
            className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400 dark:hover:text-emerald-400"
          >
            Contact
          </a>
        </nav>
      </footer>
    </div>
  )
}

export default LandingPage
