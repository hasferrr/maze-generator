import { aStar } from '../libs/algorithms/pathfinder/aStar'
import { bfs } from '../libs/algorithms/pathfinder/bfs'
import { dfs } from '../libs/algorithms/pathfinder/dfs'
import { greedyBfs } from '../libs/algorithms/pathfinder/greedyBfs'
import { GridValues, HeuristicType, PathfindingName, StepListQueue } from '../types/types'
import { findStartEnd } from './gridUtils'

export const runPathfinding = (
  name: PathfindingName,
  grid: GridValues[][],
  heuristic: HeuristicType,
  direction: 4 | 8,
): StepListQueue | null => {
  const pos = findStartEnd(grid)
  if (name === 'bfs') {
    return bfs(grid, pos.start, pos.end, direction)
  }
  if (name === 'a-star') {
    return aStar(grid, pos.start, pos.end, direction, heuristic)
  }
  if (name === 'dfs') {
    return dfs(grid, pos.start, pos.end, direction)
  }
  if (name === 'greedy-bfs') {
    return greedyBfs(grid, pos.start, pos.end, direction, heuristic, 'greedy-bfs')
  }
  return null
}
