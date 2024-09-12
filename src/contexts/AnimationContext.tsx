import { createContext, useRef } from 'react'
import { AnimationType, StepListQueue } from '../types/types'

interface AnimationContextType {
  stepsListQueueRef: React.MutableRefObject<StepListQueue | null>
  inProgressRef: React.MutableRefObject<AnimationType | null>
  delayRef: React.MutableRefObject<number>
  instantRef: React.MutableRefObject<boolean>
  timeoutListRef: React.MutableRefObject<ReturnType<typeof setTimeout>[]>
}

const AnimationContext = createContext<AnimationContextType>(null!)

export const AnimationContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const stepsListQueueRef = useRef<StepListQueue | null>(null)
  const inProgressRef = useRef<AnimationType | null>(null)
  const delayRef = useRef(5)
  const instantRef = useRef(false)
  const timeoutListRef = useRef<ReturnType<typeof setTimeout>[]>([])

  return (
    <AnimationContext.Provider value={{
      stepsListQueueRef,
      inProgressRef,
      delayRef,
      instantRef,
      timeoutListRef,
    }}>
      {children}
    </AnimationContext.Provider>
  )
}

export default AnimationContext
