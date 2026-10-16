import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'
import Support from './Support.jsx'

// Tiny path switch — the site has one extra page, not enough to justify a router.
const path = window.location.pathname.replace(/\/+$/, '')
const Page = path === '/support' ? Support : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
    <Analytics />
  </StrictMode>,
)
