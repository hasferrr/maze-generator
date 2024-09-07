import { prim } from '../algorithms/generator/prim'
import { bfs } from '../algorithms/pathfinder/bfs'
import { useGridContext } from '../hooks/useGridContext'
import { useAnimateMaze } from '../hooks/useAnimateMaze'
import { Button, Flex } from '@radix-ui/themes'

const ButtonComponent = () => {
  const { gridRef } = useGridContext()
  const { animate, inProgressRef, resetGrid } = useAnimateMaze()

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
    <Flex gap="3" align="center">
      <Button size="3" color="gray" highContrast onClick={handleGenerate}>
        Generate Maze
      </Button>
      <Button size="3" color="gray" highContrast onClick={handleSolve}>
        Solve
      </Button>
      <Button size="3" color="gray" highContrast onClick={resetGrid}>
        Reset
      </Button>
    </Flex>
  )
}

export default ButtonComponent
