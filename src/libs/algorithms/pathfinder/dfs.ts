import { GridValues, PositionXY, Step, StepListQueue } from '../../../types/types'
import { SinglyLinkedListQueue } from '../../datastructures/queue'

/**
 * DFS with marking of:
 * - walls (0s)
 * - paths (1s)
 * - visited (2s)
 * - result (3s)
 * - start (99)
 * - end (100)
 */
export const dfs = (grid: GridValues[][], start: PositionXY, end: PositionXY): StepListQueue => {
  const steps: StepListQueue = new SinglyLinkedListQueue()

  const ROWS = grid.length
  const COLS = grid[0].length
  const DIRECTIONS = [
    [0, 1], [1, 0], [0, -1], [-1, 0]
  ]

  const previous: (PositionXY | null)[][] = Array.from({ length: ROWS }, () => Array(COLS))
  previous[start[0]][start[1]] = null

  const dfsInner = (currPos: PositionXY): boolean => {
    const [x, y] = currPos

    if (x === end[0] && y === end[1]) {
      const stepList: Step[] = []
      let backtrack = previous[x][y]
      while (backtrack) {
        const [px, py] = backtrack
        grid[px][py] = 3
        backtrack = previous[px][py]
        stepList.push({ row: px, col: py, val: 3 })
      }
      for (let i = stepList.length - 2; i >= 0; i--) {
        steps.push([stepList[i]])
      }
      steps.push([{ row: x, col: y, val: 3 }])
      steps.push([{ row: end[0], col: end[1], val: 100 }])
      return true
    }

    steps.push([{ row: x, col: y, val: 2 }])
    grid[x][y] = 2

    for (const [dy, dx] of DIRECTIONS) {
      const nx = x + dx
      const ny = y + dy
      if (nx < 0 || ny < 0 || nx >= ROWS || ny >= COLS) {
        continue
      }
      if ([1, 99, 100].includes(grid[nx][ny])) {
        previous[nx][ny] = [x, y]
        if (dfsInner([nx, ny])) {
          return true
        }
      }
    }

    return false
  }

  dfsInner(start)

  steps.shift()
  grid[start[0]][start[1]] = 99
  grid[end[0]][end[1]] = 100

  return steps
}
