import { GridValues, PositionXY, Step, StepListQueue } from '../../../types/types'
import { SinglyLinkedListQueue } from '../../datastructures/queue'

/**
 * BFS with marking of:
 * - walls (0s)
 * - paths (1s)
 * - visited (2s)
 * - result (3s)
 * - start (99)
 * - end (100)
 */
export const bfs = (grid: GridValues[][], start: PositionXY, end: PositionXY, direction: 4 | 8): StepListQueue => {
  const ROWS = grid.length
  const COLS = grid[0].length
  const DIRECTIONS = direction === 8
    ? [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]
    : [[0, 1], [1, 0], [0, -1], [-1, 0]]

  let shortest = 0
  let solved = false

  const steps: StepListQueue = new SinglyLinkedListQueue()
  const previous: (PositionXY | null)[][] = Array.from({ length: ROWS }, () => Array(COLS))
  const queued: boolean[][] = Array.from({ length: ROWS }, () => Array(COLS))
  const queue = new SinglyLinkedListQueue<PositionXY>()

  queued[start[0]][start[1]] = true
  previous[start[0]][start[1]] = null
  queue.push(start)

  while (queue.length) {
    const qLen = queue.length

    for (let i = 0; i < qLen; i++) {
      const [x, y] = queue.shift()!
      if (![1, 99, 100].includes(grid[x][y])) {
        continue
      }

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
        solved = true
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
        if (queued[nx][ny]) {
          continue
        }
        queued[nx][ny] = true
        previous[nx][ny] = [x, y]
        queue.push([nx, ny])
      }
    }

    if (solved) break
    shortest++
  }

  steps.shift()
  grid[start[0]][start[1]] = 99
  grid[end[0]][end[1]] = 100

  console.log(shortest)
  return steps
}
