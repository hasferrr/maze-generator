import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'
import App from './App.tsx'
import './index.css'
import { GridContextProvider } from './contexts/GridContext.tsx'
import { AnimationContextProvider } from './contexts/AnimationContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <GridContextProvider>
        <AnimationContextProvider>
          <App />
        </AnimationContextProvider>
      </GridContextProvider>
    </Theme>
  </StrictMode>,
)
