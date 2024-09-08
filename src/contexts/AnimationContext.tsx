import { createContext, useRef } from 'react'
import { AnimationType, StepListQueue } from '../types/types'

interface AnimationContextType {
  stepsListQueueRef: React.MutableRefObject<StepListQueue | null>
  inProgressRef: React.MutableRefObject<AnimationType | null>
  delayRef: React.MutableRefObject<number>
}

const AnimationContext = createContext<AnimationContextType>(null!)

export const AnimationContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const stepsListQueueRef = useRef<StepListQueue | null>(null)
  const inProgressRef = useRef<AnimationType | null>(null)
  const delayRef = useRef(10)

  return (
    <AnimationContext.Provider value={{
      stepsListQueueRef,
      inProgressRef,
      delayRef,
    }}>
      {children}
    </AnimationContext.Provider>
  )
}

export default AnimationContext
