import { createContext, useRef, useState } from 'react'
import { createEmptyGrid, createFilledGrid } from '../utils/createGrid'

interface GridContextType {
  size: [number, number]
  setSize: React.Dispatch<React.SetStateAction<[number, number]>>
  gridRef: React.MutableRefObject<number[][]>
  gridDivRefs: React.MutableRefObject<HTMLDivElement[][]>
  rerender: () => void
}

const GridContext = createContext<GridContextType>(null!)

export const GridContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [r, c] = [10, 10 * 2]
  const [size, setSize] = useState<[number, number]>([r, c])
  const gridRef = useRef<number[][]>(createFilledGrid(r, c, 1))
  const gridDivRefs = useRef<HTMLDivElement[][]>(createEmptyGrid(r, c))
  const setDummy = useState(0)[1]
  const rerender = () => setDummy((n) => n + 1)

  return (
    <GridContext.Provider value={{
      gridRef,
      gridDivRefs,
      size,
      setSize,
      rerender,
    }}>
      {children}
    </GridContext.Provider>
  )
}

export default GridContext
