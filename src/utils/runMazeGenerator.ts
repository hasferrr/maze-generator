import { prim } from '../algorithms/generator/prim'
import { MazeGeneratorName, StepListQueue } from '../types/types'

export const runMazeGenerator = (name: MazeGeneratorName, grid: number[][]): StepListQueue => {
  if (name === 'prim') {
    return prim(grid)
  }
  return prim(grid)
}
