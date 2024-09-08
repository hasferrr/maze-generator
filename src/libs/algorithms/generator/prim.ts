import { Step, StepListQueue } from '../../../types/types'
import { SinglyLinkedListQueue } from '../../datastructures/queue'

/**
 * Prim's algorithm maze with marking of:
 * - paths (1s)
 * - walls (0s)
 * - frontiers (2s)
 */
export const prim = (grid: number[][]): StepListQueue => {
  const steps: StepListQueue = new SinglyLinkedListQueue()

  const ROWS = grid.length
  const COLS = grid[0].length
  const NEIGHBOR_POS = [
    [0, 2], [2, 0], [0, -2], [-2, 0]
  ]

  const frontiers: [number, number][] = []

  const getNeighbors = (x: number, y: number) => {
    const frontierNeighbors: [number, number][] = []
    const passageNeighbors: [number, number][] = []
    for (const [dy, dx] of NEIGHBOR_POS) {
      const nx = x + dx
      const ny = y + dy
      if (nx <= 0 || ny <= 0 || nx >= ROWS - 1 || ny >= COLS - 1) {
        continue
      }
      if (grid[nx][ny] === 1) {
        passageNeighbors.push([nx, ny])
        continue
      }
      if (grid[nx][ny] === 0) {
        frontierNeighbors.push([nx, ny])
        continue
      }
    }
    return [frontierNeighbors, passageNeighbors]
  }

  const pushValidFrontiers = (arr: [number, number][]) => {
    for (const [fx, fy] of arr) {
      if (grid[fx][fy] !== 2) {
        grid[fx][fy] = 2
        // steps.push({ row: fx, col: fy, val: 2 })
        frontiers.push([fx, fy])
      }
    }
  }

  // fill 0s
  for (let diag = 0; diag < ROWS + COLS - 1; diag++) {
    const arr: Step[] = []
    const startRow = Math.min(ROWS - 1, diag)
    const startCol = Math.max(0, diag - (ROWS - 1))
    for (let i = startRow, j = startCol; i >= 0 && j < COLS; i--, j++) {
      grid[i][j] = 0
      arr.push({ row: i, col: j, val: 0 })
    }
    steps.push(arr)
  }

  // select valid path randomly
  const rows = (ROWS - 1) / 2
  const cols = (COLS - 1) / 2
  const [x, y] = [
    Math.floor(Math.random() * rows) * 2 + 1,
    Math.floor(Math.random() * cols) * 2 + 1,
  ]
  grid[x][y] = 1
  steps.push([{ row: x, col: y, val: 1 }])
  const [frontierNeighbors] = getNeighbors(x, y)
  pushValidFrontiers(frontierNeighbors)

  while (frontiers.length) {
    // pick one frontier randomly
    const randIndex = Math.floor(Math.random() * frontiers.length)
    const [x, y] = frontiers[randIndex]
    grid[x][y] = 1

    // get and push all valid neighbors
    const [frontierNeighbors, passageNeighbors] = getNeighbors(x, y)
    pushValidFrontiers(frontierNeighbors)

    // remove current frontier from list
    if (frontiers.length === 1) {
      frontiers.pop()
    } else {
      frontiers[randIndex] = frontiers.pop()!
    }

    // break wall between the current frontier and the random passageNeighbors
    if (!passageNeighbors.length) continue
    const randPassage = Math.floor(Math.random() * passageNeighbors.length)
    const [nx, ny] = passageNeighbors[randPassage]
    const wallX = (x + nx) / 2
    const wallY = (y + ny) / 2
    grid[wallX][wallY] = 1

    // push to step queue for animation
    steps.push([{ row: wallX, col: wallY, val: 1 }])
    steps.push([{ row: x, col: y, val: 1 }])
  }

  return steps
}
