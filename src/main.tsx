import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster position="top-center" toastOptions={{ style: { background: "var(--bg-card)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)" } }} />
  </StrictMode>,
)
