import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Side from './Side.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <Side />
  </>,
)
