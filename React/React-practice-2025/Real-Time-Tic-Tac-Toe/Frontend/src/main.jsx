import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App, { SocketProvider } from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <SocketProvider>


<BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>

  </SocketProvider>
 
  
)
