import { prim } from '../algorithms/generator/Prims'
import { bfs } from '../algorithms/pathfinder/BFS'
import { useGrid, useSetGrid, useSize } from '../contexts/GridExport'
import { copyGrid } from '../helpers/copyGrid'
import { createEmptyGrid } from '../helpers/createGrid'

const Button = () => {
  const [rows, cols] = useSize()
  const setGrid = useSetGrid()
  const grid = useGrid()
  const handleGenerate = () => {
    setGrid(prim(createEmptyGrid(rows, cols)))
  }
  const handleSolve = () => {
    setGrid(bfs(copyGrid(grid)))
  }
  return (
    <div>
      <button onClick={handleGenerate}>Generate Maze</button>
      <button onClick={handleSolve}>Solve</button>
    </div>
  )
}

export default Button
