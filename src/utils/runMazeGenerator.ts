import { prim } from '../libs/algorithms/generator/prim'
import { GridValues, MazeGeneratorName, StepListQueue } from '../types/types'

export const runMazeGenerator = (name: MazeGeneratorName, grid: GridValues[][]): StepListQueue => {
  if (name === 'prim') {
    return prim(grid)
  }
  return prim(grid)
}
