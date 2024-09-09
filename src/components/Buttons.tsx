import { useEffect, useState } from 'react'
import { Button, ButtonGroup, Dropdown, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { useGridContext } from '../hooks/useGridContext'
import { useAnimation } from '../hooks/useAnimation'
import { useAnimationContext } from '../hooks/useAnimateContext'
import { useDrawContext } from '../hooks/useDrawContext'
import { runPathfinding } from '../utils/runPathfinding'
import { pathfindingShort } from '../utils/algorithmNameMap'
import { runMazeGenerator } from '../utils/runMazeGenerator'
import { anyVisitedCell } from '../utils/gridUtils'
import { HeuristicType, MazeGeneratorName, PathfindingName } from '../types/types'

const Buttons = () => {
  const { gridRef } = useGridContext()
  const { animate, clearGrid, clearVisited, speed } = useAnimation()
  const { inProgressRef } = useAnimationContext()
  const { draw, setDraw } = useDrawContext()

  const [pathfindingName, setPathfindingName] = useState<PathfindingName | null>(null)
  const [algoVariant, setAlgoVariant] = useState('dark')
  const [clearVariant, setClearVariant] = useState('dark')
  const [heuristic, setHeuristic] = useState<HeuristicType | null>(null)

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

  const handleDrawChange = (val: 'draw' | 'erase') => setDraw(val)

  const handleClear = (type: 'all' | 'visited') => {
    setClearVariant('dark')
    const clear = type === 'all'
      ? clearGrid
      : clearVisited
    clear()
  }

  const handleGenerate = (name: MazeGeneratorName) => {
    if (!inProgressRef.current) {
      animate(runMazeGenerator(name, gridRef.current), 'generate')
    }
  }

  const handleSolve = () => {
    if (pathfindingName === null) {
      setAlgoVariant('danger')
      return
    }
    if (!inProgressRef.current) {
      if (pathfindingName === 'a-star' && heuristic === null) {
        setHeuristic('manhattan')
      }
      if (anyVisitedCell(gridRef.current)) {
        setClearVariant('danger')
        return
      }
      animate(runPathfinding(pathfindingName, gridRef.current, heuristic ?? 'manhattan'), 'solve')
    }
  }

  const handleSelectAlgorithm = (name: PathfindingName) => {
    if (inProgressRef.current) return
    if (!['a-star'].includes(name)) {
      setHeuristic(null)
    }
    setPathfindingName(name)
    setAlgoVariant('dark')
  }

  const handleChangeHeuristic = (type: HeuristicType) => {
    if (!inProgressRef.current) setHeuristic(type)
  }

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
          <Dropdown.Toggle variant={clearVariant}>
            Clear
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleClear('all')}>
              Clear All
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleClear('visited')}>
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
          <Dropdown.Toggle variant={algoVariant} className="w-40">
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
        <Dropdown drop="up-centered">
          <Dropdown.Toggle
            variant="dark"
            className="w-[115px]"
            disabled={!['a-star'].includes(pathfindingName!)}
          >
            {heuristic ? heuristic[0].toUpperCase() + heuristic.slice(1) : 'Heuristic'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleChangeHeuristic('manhattan')}>
              Manhattan
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleChangeHeuristic('euclidean')}>
              Euclidean
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
