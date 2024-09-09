import { createContext, useRef, useState } from 'react'
import { createEmptyGrid, createFilledGrid } from '../utils/createGrid'
import { GridValues } from '../types/types'

interface GridContextType {
  size: [number, number]
  setSize: React.Dispatch<React.SetStateAction<[number, number]>>
  gridRef: React.MutableRefObject<GridValues[][]>
  gridDivRefs: React.MutableRefObject<HTMLDivElement[][]>
}

const GridContext = createContext<GridContextType>(null!)

export const GridContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [r, c] = [10, 10 * 2]
  const [size, setSize] = useState<[number, number]>([r, c])
  const gridRef = useRef<GridValues[][]>(createFilledGrid(r, c, 1))
  const gridDivRefs = useRef<HTMLDivElement[][]>(createEmptyGrid(r, c))

  return (
    <GridContext.Provider value={{
      gridRef,
      gridDivRefs,
      size,
      setSize,
    }}>
      {children}
    </GridContext.Provider>
  )
}

export default GridContext
