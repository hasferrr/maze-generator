import { bfs } from '../libs/algorithms/pathfinder/bfs'
import { PathfindingName, StepListQueue } from '../types/types'

export const runPathfinding = (name: PathfindingName, grid: number[][]): StepListQueue => {
  if (name === 'bfs') {
    return bfs(grid)
  }
  return bfs(grid)
}
