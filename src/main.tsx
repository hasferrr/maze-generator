import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GridContextProvider } from './contexts/GridContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GridContextProvider>
      <App />
    </GridContextProvider>
  </StrictMode>,
)
