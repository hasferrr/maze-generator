import { GridValues, StepListQueue } from '../../../types/types'
import { SinglyLinkedListQueue } from '../../datastructures/queue'
import { addStartAndEndNode, changeGridValue, fillZeros, getNeighbors, getRandomXYPath } from './helper'

/**
 * Recursive backtracking maze generator with marking of:
 * - paths (1s)
 * - walls (0s)
 */
export const recBacktrack = (grid: GridValues[][]): StepListQueue => {
  const steps: StepListQueue = new SinglyLinkedListQueue()

  fillZeros(grid, steps)

  const dfs = (x: number, y: number, srcx: number, srcy: number) => {
    if (grid[x][y] !== 0) {
      return
    }

    const [frontierNeighbors] = getNeighbors(grid, x, y)
    const wallX = (x + srcx) / 2
    const wallY = (y + srcy) / 2
    changeGridValue(wallX, wallY, 1, grid, steps)
    changeGridValue(x, y, 1, grid, steps)

    while (frontierNeighbors.length) {
      const rand = Math.floor(Math.random() * frontierNeighbors.length)
      const [nx, ny] = frontierNeighbors[rand]
      if (frontierNeighbors.length === 1) {
        frontierNeighbors.pop()
      } else {
        frontierNeighbors[rand] = frontierNeighbors.pop()!
      }
      dfs(nx, ny, x, y)
    }
  }

  const [x, y] = getRandomXYPath(grid)
  dfs(x, y, x, y)
  addStartAndEndNode(grid, steps)
  return steps
}
