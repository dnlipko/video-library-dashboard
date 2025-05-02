import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const ROOT_ELEMENT_ID = 'root'

const rootElement = document.getElementById(ROOT_ELEMENT_ID)

if (!rootElement) {
  throw new Error(`Root element with id "${ROOT_ELEMENT_ID}" not found`)
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
