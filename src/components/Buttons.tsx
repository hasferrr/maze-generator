import { useEffect, useState } from 'react'
import { Button, ButtonGroup, Dropdown, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { useGridContext } from '../hooks/useGridContext'
import { useAnimation } from '../hooks/useAnimation'
import { useAnimationContext } from '../hooks/useAnimateContext'
import { useDrawContext } from '../hooks/useDrawContext'
import { runPathfinding } from '../utils/runPathfinding'
import { pathfindingShort } from '../utils/algorithmNameMap'
import { runMazeGenerator } from '../utils/runMazeGenerator'
import { MazeGeneratorName, PathfindingName } from '../types/types'

const Buttons = () => {
  const { gridRef } = useGridContext()
  const { animate, clearGrid, clearVisited, speed } = useAnimation()
  const { inProgressRef } = useAnimationContext()
  const { draw, setDraw } = useDrawContext()

  const [pathfindingName, setPathfindingName] = useState<PathfindingName | null>(null)
  const [variant, setVariant] = useState('dark')

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'd') setDraw('draw')
      if (event.key === 'e') setDraw('erase')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setDraw])

  const handleGenerate = (name: MazeGeneratorName) => {
    if (!inProgressRef.current) {
      animate(runMazeGenerator(name, gridRef.current), 'generate')
    }
  }

  const handleSolve = () => {
    if (pathfindingName === null) {
      setVariant('danger')
      return
    }
    if (!inProgressRef.current) {
      animate(runPathfinding(pathfindingName, gridRef.current), 'solve')
    }
  }

  const handleSelectAlgorithm = (name: PathfindingName) => {
    setPathfindingName(name)
    setVariant('dark')
  }

  const handleDrawChange = (val: 'draw' | 'erase') => setDraw(val)

  return (
    <div className="flex">
      <div className="flex w-[30rem] justify-end">
        <ToggleButtonGroup
          type="radio"
          name="draw"
          className="mx-1"
          value={draw}
          onChange={handleDrawChange}
        >
          <ToggleButton variant="dark" id="draw" value="draw">Draw</ToggleButton>
          <ToggleButton variant="dark" id="erase" value="erase">Erase</ToggleButton>
        </ToggleButtonGroup>
        <Dropdown drop="up-centered">
          <Dropdown.Toggle variant="dark">
            Clear
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={clearGrid}>
              Clear All
            </Dropdown.Item>
            <Dropdown.Item onClick={clearVisited}>
              Clear Visited
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown drop="up-centered">
          <Dropdown.Toggle variant="dark" className="w-40">
            Generate Maze
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleGenerate('prim')}>
              Prim's Algorithm
            </Dropdown.Item>
            <Dropdown.Item disabled>
              Recursive Backtracking
            </Dropdown.Item>
            <Dropdown.Item disabled>
              Hunt and Kill
            </Dropdown.Item>
            <Dropdown.Item disabled>
              Origin Shift
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Button variant="success" onClick={handleSolve}>Solve</Button>
      <div className="flex w-[30rem]">
        <Dropdown drop="up-centered">
          <Dropdown.Toggle variant={variant} className="w-40">
            {pathfindingName ? pathfindingShort[pathfindingName] : 'Pick an Algorithm'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSelectAlgorithm('a-star')}>
              A* Search
            </Dropdown.Item>
            <Dropdown.Item disabled>
              Greedy Best-First Search
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSelectAlgorithm('bfs')}>
              Breadth First Search
            </Dropdown.Item>
            <Dropdown.Item disabled>
              Depth First Search
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ButtonGroup aria-label="Speed" className="mx-1 *:mx-0">
          <Button variant="dark" onClick={speed.decrease}>-</Button>
          <Button variant="dark" onClick={speed.reset} className="w-12 px-0">{speed.multiplier}x</Button>
          <Button variant="dark" onClick={speed.increase}>+</Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default Buttons
