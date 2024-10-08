import { GridValues, HeuristicType, InformedSearchType, PositionXY, Step, StepListQueue } from '../../../types/types'
import { euclideanDistance, manhattanDistance } from './heuristics'
import { Heap } from '../../datastructures/heap'
import { SinglyLinkedListQueue } from '../../datastructures/queue'

interface PosNode {
  pos: PositionXY
  heuristic: number
  total: number
  insertionOrder: number
}

/**
 * Greedy Best-First Search Algorithm only considers:
 * - the estimated cost to reach the goal from the node, h(x)
 *
 * Implemented with marking of:
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
  direction: 4 | 8,
  heuristic: HeuristicType,
  informedSearch: InformedSearchType,
): StepListQueue => {
  const ROWS = grid.length
  const COLS = grid[0].length
  const DIRECTIONS = direction === 8
    ? [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]
    : [[0, 1], [1, 0], [0, -1], [-1, 0]]

  const steps: StepListQueue = new SinglyLinkedListQueue()
  const previous: (PositionXY | null)[][] = Array.from({ length: ROWS }, () => Array(COLS))
  const costs: number[][] = Array.from({ length: ROWS }, () => Array(COLS))

  // g(x)
  let calculateCost: (prevCost: number) => number
  if (informedSearch === 'a-star') {
    calculateCost = (prevCost: number) => prevCost + 1
  } else {
    calculateCost = () => 0
  }

  // h(x)
  let heuristicFn: (pos1: PositionXY, pos2: PositionXY) => number
  if (heuristic === 'manhattan') {
    heuristicFn = manhattanDistance
  } else if (heuristic === 'euclidean') {
    heuristicFn = euclideanDistance
  } else {
    heuristicFn = () => 0
  }

  // the priority is: smallest f(x) -> last PosNode added -> highest h(x)
  // where f(x) = g(x) + h(x)
  const minHeap = new Heap<PosNode>((a, b) => {
    if (a.total === b.total) {
      if (a.heuristic === b.heuristic) {
        return (b.insertionOrder - a.insertionOrder)
      }
      return (b.heuristic - a.heuristic)
    }
    return a.total - b.total
  })

  let insertionOrder = 0
  previous[start[0]][start[1]] = null
  costs[start[0]][start[1]] = 0
  const heuristicStart = heuristicFn(start, end)
  minHeap.insert({
    pos: start,
    heuristic: heuristicStart,
    total: heuristicStart,
    insertionOrder: insertionOrder++,
  })

  while (!minHeap.isEmpty()) {
    const curr = minHeap.pop()!
    const [x, y] = curr.pos
    if (![1, 99, 100].includes(grid[x][y])) {
      continue
    }

    if (x === end[0] && y === end[1]) {
      const stepList: Step[] = []
      let backtrack = previous[x][y]
      let count = 0
      while (backtrack) {
        const [px, py] = backtrack
        grid[px][py] = 3
        backtrack = previous[px][py]
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
      const nextCost = calculateCost(costs[x][y])
      if (costs[nx][ny] && costs[nx][ny] < nextCost) {
        continue
      }
      const heuristicVal = heuristicFn([nx, ny], end)
      previous[nx][ny] = curr.pos
      costs[nx][ny] = nextCost
      minHeap.insert({
        pos: [nx, ny],
        heuristic: heuristicVal,
        total: nextCost + heuristicVal,
        insertionOrder: insertionOrder++,
      })
    }
  }

  steps.shift()
  grid[start[0]][start[1]] = 99
  grid[end[0]][end[1]] = 100

  return steps
}
