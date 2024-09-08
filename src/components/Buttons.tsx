import { prim } from '../algorithms/generator/prim'
import { bfs } from '../algorithms/pathfinder/bfs'
import { useGridContext } from '../hooks/useGridContext'
import { useAnimateMaze } from '../hooks/useAnimateMaze'
import { useAnimationContext } from '../hooks/useAnimateContext'
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap'

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
    <div className="flex">
      <div className="flex w-96 justify-end">
        <Button variant="dark" onClick={resetGrid}>Reset</Button>
        <Dropdown drop="up-centered">
          <Dropdown.Toggle variant="dark" className="w-40">
            Generate Maze
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleGenerate}>Prim's Algorithm</Dropdown.Item>
            <Dropdown.Item disabled>Recursive Backtracking</Dropdown.Item>
            <Dropdown.Item disabled>Hunt and Kill</Dropdown.Item>
            <Dropdown.Item disabled>Origin Shift</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Button variant="success" onClick={handleSolve}>Solve</Button>
      <div className="flex w-96">
        <Dropdown drop="up-centered">
          <Dropdown.Toggle variant="dark" className="w-40">
            Pick an Algorithm
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item disabled>A* Search</Dropdown.Item>
            <Dropdown.Item disabled>Greedy Best-First Search</Dropdown.Item>
            <Dropdown.Item>Breadth First Search</Dropdown.Item>
            <Dropdown.Item disabled>Depth First Search</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ButtonGroup aria-label="Speed" className="*:mx-0">
          <Button variant="dark">-</Button>
          <Button variant="dark">1x</Button>
          <Button variant="dark">+</Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default Buttons
