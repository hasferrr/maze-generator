import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GridContextProvider } from './contexts/GridContext.tsx'
import { AnimationContextProvider } from './contexts/AnimationContext.tsx'
import { DrawContextProvider } from './contexts/DrawContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GridContextProvider>
      <AnimationContextProvider>
        <DrawContextProvider>
          <App />
        </DrawContextProvider>
      </AnimationContextProvider>
    </GridContextProvider>
  </StrictMode>,
)
