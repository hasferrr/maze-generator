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
import Settings from './Settings'

const Buttons = () => {
  const { gridRef } = useGridContext()
  const { animate, clearGrid, clearVisited, speed } = useAnimation()
  const { inProgressRef } = useAnimationContext()
  const { draw, setDraw } = useDrawContext()

  const [pathfindingName, setPathfindingName] = useState<PathfindingName | null>(null)
  const [algoVariant, setAlgoVariant] = useState('dark')
  const [clearVariant, setClearVariant] = useState('dark')
  const [heuristic, setHeuristic] = useState<HeuristicType | null>(null)
  const [direction, setDirection] = useState<4 | 8>(4)
  const [showSettings, setShowSettings] = useState(false)

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
      if (['a-star', 'greedy-bfs'].includes(pathfindingName) && heuristic === null) {
        setHeuristic('manhattan')
      }
      if (anyVisitedCell(gridRef.current)) {
        setClearVariant('danger')
        return
      }
      animate(runPathfinding(pathfindingName, gridRef.current, heuristic ?? 'manhattan', direction), 'solve')
    }
  }

  const handleSelectAlgorithm = (name: PathfindingName) => {
    if (inProgressRef.current) return
    if (!['a-star', 'greedy-bfs'].includes(name)) {
      setHeuristic(null)
    }
    setPathfindingName(name)
    setAlgoVariant('dark')
  }

  const handleChangeHeuristic = (type: HeuristicType) => {
    if (!inProgressRef.current) setHeuristic(type)
  }

  const handleChangeDirection = (d: 4 | 8) => {
    if (!inProgressRef.current) setDirection(d)
  }

  return (
    <div className="flex">
      <Settings show={showSettings} onHide={() => setShowSettings(false)} />
      <div className="flex w-[30rem] justify-end">
        <Button
          variant="dark"
          className="w-20"
          onClick={() => setShowSettings(true)}
        >
          Settings
        </Button>
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
          <Dropdown.Toggle variant={clearVariant} className="w-20">
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
            <Dropdown.Item onClick={() => handleGenerate('kruskal')}>
              Kruskal's Algorithm
            </Dropdown.Item>
            <Dropdown.Item disabled hidden>
              Recursive Backtracking
            </Dropdown.Item>
            <Dropdown.Item disabled hidden>
              Hunt and Kill
            </Dropdown.Item>
            <Dropdown.Item disabled hidden>
              Origin Shift
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Button variant="success" className="w-20" onClick={handleSolve}>Solve</Button>
      <div className="flex w-[30rem]">
        <Dropdown drop="up-centered">
          <Dropdown.Toggle variant={algoVariant} className="w-40">
            {pathfindingName ? pathfindingShort[pathfindingName] : 'Pick an Algorithm'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSelectAlgorithm('a-star')}>
              A* Search
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSelectAlgorithm('greedy-bfs')}>
              Greedy Best-First Search
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSelectAlgorithm('bfs')}>
              Breadth First Search
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSelectAlgorithm('dfs')}>
              Depth First Search
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown drop="up-centered">
          <Dropdown.Toggle
            variant="dark"
            className="w-[115px]"
            disabled={!['a-star', 'greedy-bfs'].includes(pathfindingName!)}
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
        <Dropdown drop="up-centered">
          <Dropdown.Toggle variant="dark" className="w-16">{direction}D</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleChangeDirection(4)}>
              4 Directions
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleChangeDirection(8)}>
              8 Directions
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ButtonGroup aria-label="Speed" className="mx-1 *:mx-0">
          <Button variant="dark" onClick={speed.decrease}>-</Button>
          <Button variant="dark" onClick={speed.reset} className="w-[52px] px-0">
            {speed.multiplier === 999
              ? 'Instant'
              : `${speed.multiplier}`.slice(0, 5) + 'x'}
          </Button>
          <Button variant="dark" onClick={speed.increase}>+</Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default Buttons
