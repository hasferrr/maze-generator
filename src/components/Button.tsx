import { prim } from '../algorithms/generator/prim'
import { bfs } from '../algorithms/pathfinder/bfs'
import { useGridContext } from '../hooks/useGridContext'
import { useAnimateMaze } from '../hooks/useAnimateMaze'
import { useAnimationContext } from '../hooks/useAnimateContext'

const Button = () => {
  const { gridRef } = useGridContext()
  const { animate, resetGrid } = useAnimateMaze()
  const { inProgressRef } = useAnimationContext()

  const handleGenerate = () => {
    if (!inProgressRef.current) {
      animate(prim(gridRef.current), 'generate')
    } else {
      animate(null, 'generate')
    }
  }

  const handleSolve = () => {
    if (!inProgressRef.current) {
      animate(bfs(gridRef.current), 'solve')
    } else {
      animate(null, 'solve')
    }
  }

  return (
    <div>
      <button onClick={handleGenerate}>Generate Maze</button>
      <button onClick={handleSolve}>Solve</button>
      <button onClick={resetGrid}>Reset</button>
    </div>
  )
}

export default Button
