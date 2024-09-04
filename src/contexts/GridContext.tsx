import { createContext, useState } from 'react'

interface GridContextType {
  grid: number[][]
  size: [number, number]
  setGrid: React.Dispatch<React.SetStateAction<number[][]>>
  setSize: React.Dispatch<React.SetStateAction<[number, number]>>
}

const GridContext = createContext<GridContextType>(null!)

const createGridMaze = (rows: number, cols: number): number[][] => {
  rows = rows * 2 + 1
  cols = cols * 2 + 1
  const grid = Array.from({ length: rows }, () => Array(cols).fill(0))
  for (let i = 1; i < grid.length - 1; i += 2) {
    for (let j = 1; j < grid[0].length - 1; j += 2) {
      grid[i][j] = 1
    }
  }
  return grid
}

export const GridContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [size, setSize] = useState<[number, number]>([20, 45])
  const [grid, setGrid] = useState<number[][]>(createGridMaze(size[0], size[1]))

  return (
    <GridContext.Provider value={{ grid, setGrid, size, setSize }}>
      {children}
    </GridContext.Provider>
  )
}

export default GridContext
