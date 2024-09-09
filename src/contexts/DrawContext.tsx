import { createContext, useState } from 'react'

interface DrawContextType {
  draw: 'draw' | 'erase'
  setDraw: React.Dispatch<React.SetStateAction<'draw' | 'erase'>>
}

const DrawContext = createContext<DrawContextType>(null!)

export const DrawContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [draw, setDraw] = useState<'draw' | 'erase'>('draw')

  return (
    <DrawContext.Provider value={{ draw, setDraw }}>
      {children}
    </DrawContext.Provider>
  )
}

export default DrawContext
