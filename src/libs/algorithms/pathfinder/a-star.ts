import { HeuristicType, Step, StepListQueue } from '../../../types/types'
import { heuristicFunctionMap } from '../../../utils/heuristics'
import { MinHeap } from '../../datastructures/heap'
import { SinglyLinkedListQueue } from '../../datastructures/queue'

type positionXY = [number, number]

interface PosNode {
  src: positionXY
  dst: positionXY
  cost: number
  heuristic: number
}

/**
 * A* Search Algorithm with marking of:
 * - walls (0s)
 * - paths/open (1s)
 * - visited/closed (2s)
 * - result (3s)
 */
export const aStar = (grid: number[][], type: HeuristicType): StepListQueue => {
  const steps: StepListQueue = new SinglyLinkedListQueue()

  const ROWS = grid.length
  const COLS = grid[0].length
  const DIRECTIONS = [
    [0, 1], [1, 0], [0, -1], [-1, 0]
  ]

  const start: positionXY = [grid.length - 2, 1]
  const end: positionXY = [1, grid[0].length - 2]

  const previous = new Map<string, positionXY | null>()

  const heuristicFn = heuristicFunctionMap[type]
  const minHeap = new MinHeap<PosNode>((a, b) => {
    const g = a.cost - b.cost
    const h = a.heuristic - b.heuristic
    const f = g + h
    return f === 0 ? -h : f
  })

  minHeap.insert({
    src: [-1, -1],
    dst: start,
    cost: 0,
    heuristic: heuristicFn(start[0], end[0], start[1], end[1]),
  })

  while (!minHeap.isEmpty()) {
    const curr = minHeap.pop()!
    const [x, y] = curr.dst
    if (grid[x][y] === 0 || grid[x][y] === 2) {
      continue
    }

    if (x === end[0] && y === end[1]) {
      grid[x][y] = 3
      steps.push([{ row: x, col: y, val: 2 }])

      const stepList: Step[] = []
      stepList.push({ row: x, col: y, val: 3 })

      let backtrack = previous.get(`${x},${y}`)
      while (backtrack) {
        const [px, py] = backtrack
        grid[px][py] = 3
        backtrack = previous.get(`${px},${py}`)
        stepList.push({ row: px, col: py, val: 3 })
      }

      for (let i = stepList.length - 1; i >= 0; i--) {
        steps.push([stepList[i]])
      }
      break
    }

    grid[x][y] = 2
    steps.push([{ row: x, col: y, val: 2 }])

    for (const [dx, dy] of DIRECTIONS) {
      const nx = x + dx
      const ny = y + dy
      if (nx < 0 || ny < 0 || nx >= ROWS || ny >= COLS) {
        continue
      }
      if (grid[nx][ny] === 0 || grid[nx][ny] === 2) {
        continue
      }
      const nextCost = curr.cost + 1
      previous.set(`${nx},${ny}`, curr.dst)
      minHeap.insert({
        src: [x, y],
        dst: [nx, ny],
        cost: nextCost,
        heuristic: heuristicFn(nx, end[0], ny, end[1]),
      })
    }
  }

  return steps
}
