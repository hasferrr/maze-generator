import { GridValues, PositionXY, HeuristicType, StepListQueue } from '../../../types/types'
import { greedyBfs } from './greedyBfs'

/**
 * A* Search Algorithm is an extension of the Greedy Best-First Search, considering both:
 * - the cost to reach a node from the start, g(x), and
 * - the estimated cost to reach the goal from the node, h(x)
 */
export const aStar = (
  grid: GridValues[][],
  start: PositionXY,
  end: PositionXY,
  heuristic: HeuristicType,
): StepListQueue => {
  return greedyBfs(grid, start, end, heuristic, 'a-star')
}
