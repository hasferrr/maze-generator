import { createContext, useRef, useState } from 'react'
import { createEmptyGrid, createFilledGrid } from '../utils/createGrid'
import { generateClass } from '../utils/generateClass'

interface GridContextType {
  size: [number, number]
  setSize: React.Dispatch<React.SetStateAction<[number, number]>>
  gridRef: React.MutableRefObject<number[][]>
  gridDivRefs: React.MutableRefObject<HTMLDivElement[][]>
  rerender: () => void
  resetGrid: () => void
}

const GridContext = createContext<GridContextType>(null!)

export const GridContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [r, c] = [10, 10 * 2]
  const [size, setSize] = useState<[number, number]>([r, c])
  const gridRef = useRef<number[][]>(createFilledGrid(r, c, 1))
  const gridDivRefs = useRef<HTMLDivElement[][]>(createEmptyGrid(r, c))
  const setDummy = useState(0)[1]
  const rerender = () => setDummy((n) => n + 1)

  const resetGrid = () => {
    for (let i = 0; i < gridRef.current.length; i++) {
      for (let j = 0; j < gridRef.current[0].length; j++) {
        gridRef.current[i][j] = 1
        gridDivRefs.current[i][j].className = generateClass(i, j, 1)
      }
    }
  }

  return (
    <GridContext.Provider value={{
      gridRef,
      gridDivRefs,
      size,
      setSize,
      rerender,
      resetGrid,
    }}>
      {children}
    </GridContext.Provider>
  )
}

export default GridContext
