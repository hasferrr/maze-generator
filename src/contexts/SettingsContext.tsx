import React, { createContext, useRef, useState } from 'react'

interface SettingsContextType {
  reduceAnimation: boolean
  reduceAnimationRef: React.MutableRefObject<boolean>
  setReduceAnimation: (bool: boolean) => void
}

const SettingsContext = createContext<SettingsContextType>(null!)

export const SettingsContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [reduceAnimation, setReduceAnimation] = useState(false)
  const reduceAnimationRef = useRef(false)

  const updateReduceAnimation = (newValue: boolean) => {
    setReduceAnimation(newValue)
    reduceAnimationRef.current = newValue
  }

  return (
    <SettingsContext.Provider value={{
      reduceAnimation,
      reduceAnimationRef,
      setReduceAnimation: updateReduceAnimation,
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsContext
