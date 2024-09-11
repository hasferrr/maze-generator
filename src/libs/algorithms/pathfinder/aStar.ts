import { GridValues, PositionXY, HeuristicType, StepListQueue } from '../../../types/types'
import { greedyBfs } from './greedyBfs'

/**
 * A* Search Algorithm is an extension of the Greedy Best-First Search, considering both:
 * - Cost to reach a node g(x) and
 * - Estimate of the cost to reach the goal h(x)
 */
export const aStar = (
  grid: GridValues[][],
  start: PositionXY,
  end: PositionXY,
  heuristic: HeuristicType,
): StepListQueue => {
  return greedyBfs(grid, start, end, heuristic, 'a-star')
}
