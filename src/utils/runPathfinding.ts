import { aStar } from '../libs/algorithms/pathfinder/a-star'
import { bfs } from '../libs/algorithms/pathfinder/bfs'
import { GridValues, HeuristicType, PathfindingName, StepListQueue } from '../types/types'
import { findStartEnd } from './gridUtils'

export const runPathfinding = (name: PathfindingName, grid: GridValues[][], heuristic: HeuristicType): StepListQueue => {
  const pos = findStartEnd(grid)
  if (name === 'bfs') {
    return bfs(grid, pos.start, pos.end)
  }
  if (name === 'a-star') {
    return aStar(grid, pos.start, pos.end, heuristic)
  }
  return bfs(grid, pos.start, pos.end)
}
