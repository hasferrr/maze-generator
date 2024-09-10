import { GridValues, PositionXY, HeuristicType, StepListQueue } from '../../../types/types'
import { greedyBfs } from './greedy-bfs'

/**
 * A* Search Algorithm (GBFS with considering cost to reach node) with marking of:
 * - walls (0s)
 * - paths/open (1s)
 * - visited/closed (2s)
 * - result (3s)
 * - start (99)
 * - end (100)
 */
export const aStar = (
  grid: GridValues[][],
  start: PositionXY,
  end: PositionXY,
  type: HeuristicType,
): StepListQueue => {
  return greedyBfs(grid, start, end, type, 'a-star')
}
