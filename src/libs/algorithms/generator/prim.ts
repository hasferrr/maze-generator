import { GridValues, StepListQueue } from '../../../types/types'
import { SinglyLinkedListQueue } from '../../datastructures/queue'
import { addStartAndEndNode, changeGridValue, fillZeros, getNeighbors, getRandomXYPath } from './helper'

/**
 * Prim's algorithm maze with marking of:
 * - paths (1s)
 * - walls (0s)
 * - frontiers (2s)
 */
export const prim = (grid: GridValues[][]): StepListQueue => {
  const steps: StepListQueue = new SinglyLinkedListQueue()

  const frontiers: [number, number][] = []

  const pushValidFrontiers = (arr: [number, number][]) => {
    for (const [fx, fy] of arr) {
      if (grid[fx][fy] !== 2) {
        grid[fx][fy] = 2
        frontiers.push([fx, fy])
      }
    }
  }

  // fill 0s
  fillZeros(grid, steps)

  // select valid path randomly
  const [x, y] = getRandomXYPath(grid)
  const [frontierNeighbors] = getNeighbors(grid, x, y)
  changeGridValue(x, y, 1, grid, steps)
  pushValidFrontiers(frontierNeighbors)

  while (frontiers.length) {
    // pick one frontier randomly
    const randIndex = Math.floor(Math.random() * frontiers.length)
    const [x, y] = frontiers[randIndex]
    changeGridValue(x, y, 1, grid, steps)

    // get and push all valid neighbors
    const [frontierNeighbors, passageNeighbors] = getNeighbors(grid, x, y)
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
    changeGridValue(wallX, wallY, 1, grid, steps)
  }

  addStartAndEndNode(grid, steps)
  return steps
}
