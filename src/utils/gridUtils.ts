import { GridValues, PositionXY } from '../types/types'

export const createEmptyGrid = <T>(rows: number, cols: number): T[][] => {
  rows = rows * 2 + 1
  cols = cols * 2 + 1
  return Array.from({ length: rows }, () => Array(cols))
}

export const createFilledGrid = <T>(rows: number, cols: number, val: T): T[][] => {
  rows = rows * 2 + 1
  cols = cols * 2 + 1
  return Array.from({ length: rows }, () => Array(cols).fill(val))
}

export const findStartEnd = (grid: GridValues[][]): { start: PositionXY, end: PositionXY } => {
  const start: PositionXY = [-1, -1]
  const end: PositionXY = [-1, -1]
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 99) {
        start[0] = i
        start[1] = j
      } else if (grid[i][j] === 100) {
        end[0] = i
        end[1] = j
      }
    }
  }
  return { start, end }
}

export const anyVisitedCell = (grid: GridValues[][]): boolean => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if ([2, 3].includes(grid[i][j])) {
        return true
      }
    }
  }
  return false
}
