import { createContext, useState } from 'react'
import { createWallGrid } from '../helpers/createGrid'

interface GridContextType {
  grid: number[][]
  size: [number, number]
  setGrid: React.Dispatch<React.SetStateAction<number[][]>>
  setSize: React.Dispatch<React.SetStateAction<[number, number]>>
}

const GridContext = createContext<GridContextType>(null!)

export const GridContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [size, setSize] = useState<[number, number]>([16, 32])
  const [grid, setGrid] = useState<number[][]>(createWallGrid(size[0], size[1]))

  return (
    <GridContext.Provider value={{ grid, setGrid, size, setSize }}>
      {children}
    </GridContext.Provider>
  )
}

export default GridContext
