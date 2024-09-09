import { aStar } from '../libs/algorithms/pathfinder/a-star'
import { bfs } from '../libs/algorithms/pathfinder/bfs'
import { GridValues, PathfindingName, StepListQueue } from '../types/types'

export const runPathfinding = (name: PathfindingName, grid: GridValues[][]): StepListQueue => {
  if (name === 'bfs') {
    return bfs(grid)
  }
  if (name === 'a-star') {
    return aStar(grid, 'manhattan')
  }
  return bfs(grid)
}
