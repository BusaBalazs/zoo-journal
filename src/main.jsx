import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter basename="/zoo-journal">
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)
