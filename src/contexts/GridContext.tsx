import { createContext, useEffect, useState } from 'react'
import { createEmptyGrid, createFilledGrid } from '../utils/gridUtils'
import { GridValues } from '../types/types'

interface GridContextType {
  size: [number, number]
  setSize: React.Dispatch<React.SetStateAction<[number, number]>>
  gridRef: React.MutableRefObject<GridValues[][]>
  gridDivRefs: React.MutableRefObject<HTMLDivElement[][]>
}

const GridContext = createContext<GridContextType>(null!)

export const GridContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [size, setSize] = useState<[number, number]>([10, 10 * 2])
  const [r, c] = size

  // Manipulating the DOM or Grid with Refs improves performance rather than rerendering the state
  // The Grid is very large, rerendering for every changes will affect the performace
  // Therefore, I implement useRef manually, so that I have control when I want to rerender it:
  const [grid, setGrid] = useState<{ current: GridValues[][] }>({ current: createFilledGrid(r, c, 1) })
  const [gridDivs, setGridDivs] = useState<{ current: HTMLDivElement[][] }>({ current: createEmptyGrid(r, c) })

  // Basically, the code above just like implementing normal useRef, but I have SetStateAction:
  // https://react.dev/learn/referencing-values-with-refs#how-does-use-ref-work-inside

  const gridRef = grid
  const gridDivRefs = gridDivs

  useEffect(() => {
    const [r, c] = size
    const newGrid = createFilledGrid(r, c, 1)
    const newGridDivs = createEmptyGrid<HTMLDivElement>(r, c)
    const ROWS = newGrid.length
    const COLS = newGrid[0].length
    if (r === 1 && c === 1) {
      newGrid[ROWS - 1][0] = 99
      newGrid[0][COLS - 1] = 100
    } else {
      newGrid[ROWS - 2][1] = 99
      newGrid[1][COLS - 2] = 100
    }
    setGrid({ current: newGrid })
    setGridDivs({ current: newGridDivs })
  }, [size])

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
