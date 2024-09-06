import { prim } from '../algorithms/generator/prim'
import { bfs } from '../algorithms/pathfinder/bfs'
import { useGridContext } from '../hooks/useGridContext'
import { useGenerateMaze } from '../hooks/useGenerateMaze'

const Button = () => {
  const { gridRef, resetGrid } = useGridContext()
  const { animate, inProgress, reset } = useGenerateMaze()

  const handleGenerate = () => {
    if (!inProgress) {
      resetGrid()
      const steps = prim(gridRef.current)
      animate(steps)
    } else {
      animate(null)
    }
  }

  const handleSolve = () => {
    bfs(gridRef.current)
  }

  return (
    <div>
      <button onClick={handleGenerate}>Generate Maze</button>
      <button onClick={handleSolve}>Solve</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default Button
