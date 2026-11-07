import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { preloadPath } from './lib/routes'

// a direct visit to a lazy page: start its chunk now, in parallel with the first render
preloadPath(window.location.pathname).catch(() => {})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
