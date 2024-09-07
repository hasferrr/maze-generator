import { prim } from '../algorithms/generator/prim'
import { bfs } from '../algorithms/pathfinder/bfs'
import { useGridContext } from '../hooks/useGridContext'
import { useAnimateMaze } from '../hooks/useAnimateMaze'
import { useAnimationContext } from '../hooks/useAnimateContext'
import { Button } from 'react-bootstrap'

const Buttons = () => {
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
      <Button variant="dark" onClick={handleGenerate}>Generate Maze</Button>
      <Button variant="dark" onClick={handleSolve}>Solve</Button>
      <Button variant="dark" onClick={resetGrid}>Reset</Button>
    </div>
  )
}

export default Buttons
