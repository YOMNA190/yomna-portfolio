import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import LenisProvider from './components/LenisProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LenisProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LenisProvider>
  </StrictMode>,
)
