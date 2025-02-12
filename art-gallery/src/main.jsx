import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Page2 from './pages/page2.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page2 />
  </StrictMode>,
)
