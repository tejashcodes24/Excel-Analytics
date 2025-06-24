import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { FileProvider } from './contexts/FileContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <FileProvider>
          <App />
        </FileProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
