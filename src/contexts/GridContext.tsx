import { createContext, useRef, useState } from 'react'
import { createEmptyGrid, createWallGrid } from '../utils/createGrid'

interface GridContextType {
  size: [number, number]
  setSize: React.Dispatch<React.SetStateAction<[number, number]>>
  gridRef: React.MutableRefObject<number[][]>
  gridDivRefs: React.MutableRefObject<HTMLDivElement[][]>
  inProgress: React.MutableRefObject<boolean>
  rerender: () => void
}

const GridContext = createContext<GridContextType>(null!)

export const GridContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [r, c] = [16, 32]
  const [size, setSize] = useState<[number, number]>([r, c])
  const gridRef = useRef<number[][]>(createWallGrid(r, c))
  const gridDivRefs = useRef<HTMLDivElement[][]>(createEmptyGrid(r, c))
  const inProgress = useRef(false)
  const setDummy = useState(0)[1]
  const rerender = () => setDummy((n) => n + 1)

  return (
    <GridContext.Provider value={{
      gridRef,
      gridDivRefs,
      size,
      setSize,
      rerender,
      inProgress,
    }}>
      {children}
    </GridContext.Provider>
  )
}

export default GridContext
