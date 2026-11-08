import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'
import Support from './Support.jsx'
import Privacy from './Privacy.jsx'

// Tiny path switch — the site has two extra pages, not enough to justify a router.
const path = window.location.pathname.replace(/\/+$/, '')
const Page = { '/support': Support, '/privacy': Privacy }[path] ?? App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
    <Analytics />
  </StrictMode>,
)
