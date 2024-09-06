export const createEmptyGrid = <T>(rows: number, cols: number): T[][] => {
  rows = rows * 2 + 1
  cols = cols * 2 + 1
  return Array.from({ length: rows }, () => Array(cols))
}

export const createWallGrid = (rows: number, cols: number): number[][] => {
  rows = rows * 2 + 1
  cols = cols * 2 + 1
  return Array.from({ length: rows }, () => Array(cols).fill(0))
}

export const create1_0Grid = (rows: number, cols: number): number[][] => {
  rows = rows * 2 + 1
  cols = cols * 2 + 1
  const grid = Array.from({ length: rows }, () => Array(cols).fill(0))
  for (let i = 1; i < grid.length - 1; i += 2) {
    for (let j = 1; j < grid[0].length - 1; j += 2) {
      grid[i][j] = 1
    }
  }
  return grid
}
