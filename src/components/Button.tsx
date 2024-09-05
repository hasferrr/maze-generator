import { prim } from '../algorithms/generator/Prims'
import { useGrid, useSetGrid } from '../contexts/GridExport'

const Button = () => {
  const grid = useGrid()
  const setGrid = useSetGrid()
  const handleGenerate = () => {
    const copyGrid: number[][] = Array(grid.length)
    for (let i = 0; i < copyGrid.length; i++) {
      copyGrid[i] = [...grid[i]]
    }
    setGrid(prim(copyGrid))
  }
  return (
    <div>
      <button onClick={handleGenerate}>Generate Maze</button>
    </div>
  )
}

export default Button
