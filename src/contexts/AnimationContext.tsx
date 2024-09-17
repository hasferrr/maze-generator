import { createContext, useRef, useState } from 'react'
import { AnimationType, StepListQueue } from '../types/types'

interface AnimationContextType {
  stepsListQueueRef: React.MutableRefObject<StepListQueue | null>
  inProgressRef: React.MutableRefObject<AnimationType | null>
  inProgress: AnimationType | null
  setInProgress: (newValue: AnimationType | null) => void
  delayRef: React.MutableRefObject<number>
  instantRef: React.MutableRefObject<boolean>
  timeoutListRef: React.MutableRefObject<ReturnType<typeof setTimeout>[]>
}

const AnimationContext = createContext<AnimationContextType>(null!)

export const AnimationContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const stepsListQueueRef = useRef<StepListQueue | null>(null)
  const inProgressRef = useRef<AnimationType | null>(null)
  const [inProgress, setInprogress] = useState<AnimationType | null>(null)
  const delayRef = useRef(5)
  const instantRef = useRef(false)
  const timeoutListRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const updateInProgress = (newValue: AnimationType | null) => {
    setInprogress(newValue)
    inProgressRef.current = newValue
  }

  return (
    <AnimationContext.Provider value={{
      stepsListQueueRef,
      inProgressRef,
      inProgress,
      setInProgress: updateInProgress,
      delayRef,
      instantRef,
      timeoutListRef,
    }}>
      {children}
    </AnimationContext.Provider>
  )
}

export default AnimationContext
