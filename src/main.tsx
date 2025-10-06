import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Homepage from './pages/Homepage/Homepage.tsx'
import { BrowserRouter } from 'react-router'
import { Routes, Route } from 'react-router'
import './styles/main.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </BrowserRouter>
  </StrictMode>,
)