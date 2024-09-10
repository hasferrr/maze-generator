import { GridValues, HeuristicType, InformedSearchType, PositionXY, Step, StepListQueue } from '../../../types/types'
import { euclideanDistance, manhattanDistance } from '../../../utils/heuristics'
import { Heap } from '../../datastructures/heap'
import { SinglyLinkedListQueue } from '../../datastructures/queue'

interface PosNode {
  pos: PositionXY
  cost: number
  heuristic: number
  total: number
}

/**
 * Greedy Best-First Search Algorithm with marking of:
 * - walls (0s)
 * - paths/open (1s)
 * - visited/closed (2s)
 * - result (3s)
 * - start (99)
 * - end (100)
 */
export const greedyBfs = (
  grid: GridValues[][],
  start: PositionXY,
  end: PositionXY,
  type: HeuristicType,
  informedSearch: InformedSearchType,
): StepListQueue => {
  const ROWS = grid.length
  const COLS = grid[0].length
  const DIRECTIONS = [
    [0, 1], [1, 0], [0, -1], [-1, 0]
  ]

  const steps: StepListQueue = new SinglyLinkedListQueue()
  const previous = new Map<string, PositionXY | null>()

  // g(x)
  const calculateCost =
    informedSearch === 'greedy-bfs' ? () => 0
      : informedSearch === 'a-star' ? (prevCost: number) => prevCost + 1
        : () => 0

  // h(x)
  const heuristicFn =
    type === 'manhattan' ? manhattanDistance
      : type === 'euclidean' ? euclideanDistance
        : () => 0

  // priority is f(x), where f(x) = g(x) + h(x)
  const minHeap = new Heap<PosNode>((a, b) => {
    if (a.total === b.total) {
      return (a.cost - b.cost) || (a.heuristic - b.heuristic)
    }
    return a.total - b.total
  })

  previous.set(`${start[0]},${start[1]}`, null)
  const heuristicStart = heuristicFn(start[0], end[0], start[1], end[1])
  minHeap.insert({
    pos: start,
    cost: 0,
    heuristic: heuristicStart,
    total: heuristicStart,
  })

  while (!minHeap.isEmpty()) {
    const curr = minHeap.pop()!
    const [x, y] = curr.pos
    if (![1, 99, 100].includes(grid[x][y])) {
      continue
    }

    if (x === end[0] && y === end[1]) {
      const stepList: Step[] = []
      let backtrack = previous.get(`${x},${y}`)
      let count = 0
      while (backtrack) {
        const [px, py] = backtrack
        grid[px][py] = 3
        backtrack = previous.get(`${px},${py}`)
        stepList.push({ row: px, col: py, val: 3 })
        count++
      }
      for (let i = stepList.length - 2; i >= 0; i--) {
        steps.push([stepList[i]])
      }
      steps.push([{ row: x, col: y, val: 3 }])
      steps.push([{ row: end[0], col: end[1], val: 100 }])
      console.log(count)
      break
    }

    steps.push([{ row: x, col: y, val: 2 }])
    grid[x][y] = 2

    for (const [dy, dx] of DIRECTIONS) {
      const nx = x + dx
      const ny = y + dy
      if (nx < 0 || ny < 0 || nx >= ROWS || ny >= COLS) {
        continue
      }
      if (![1, 99, 100].includes(grid[nx][ny])) {
        continue
      }
      const nextCost = calculateCost(curr.cost)
      const heuristicVal = heuristicFn(nx, end[0], ny, end[1])
      previous.set(`${nx},${ny}`, curr.pos)
      minHeap.insert({
        pos: [nx, ny],
        cost: nextCost,
        heuristic: heuristicVal,
        total: nextCost + heuristicVal,
      })
    }
  }

  steps.shift()
  grid[start[0]][start[1]] = 99
  grid[end[0]][end[1]] = 100

  return steps
}
