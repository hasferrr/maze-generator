import { createContext, useRef, useState } from 'react'

interface DrawContextType {
  draw: 'draw' | 'erase'
  drawRef: React.MutableRefObject<'draw' | 'erase'>
  setDraw: (newValue: 'draw' | 'erase') => void
}

const DrawContext = createContext<DrawContextType>(null!)

export const DrawContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [draw, setDraw] = useState<'draw' | 'erase'>('draw')
  const drawRef = useRef<'draw' | 'erase'>(draw)

  const updateDraw = (newValue: 'draw' | 'erase') => {
    setDraw(newValue)
    drawRef.current = newValue
  }

  return (
    <DrawContext.Provider value={{ draw, drawRef, setDraw: updateDraw }}>
      {children}
    </DrawContext.Provider>
  )
}

export default DrawContext
