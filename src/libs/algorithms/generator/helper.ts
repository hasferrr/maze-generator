import { GridValues, PositionXY, Step, StepListQueue } from '../../../types/types'

const NEIGHBOR_POS = [
  [0, 2], [2, 0], [0, -2], [-2, 0]
]

export const getRowsAndCols = (grid: GridValues[][]) => {
  const ROWS = grid.length
  const COLS = grid[0].length
  return { ROWS, COLS }
}

export const getNeighbors = (
  grid: GridValues[][],
  x: number,
  y: number,
): [[number, number][], [number, number][]] => {
  const { ROWS, COLS } = getRowsAndCols(grid)
  const frontierNeighbors: [number, number][] = []
  const passageNeighbors: [number, number][] = []
  for (const [dy, dx] of NEIGHBOR_POS) {
    const nx = x + dx
    const ny = y + dy
    if (nx <= 0 || ny <= 0 || nx >= ROWS - 1 || ny >= COLS - 1) {
      continue
    }
    if (grid[nx][ny] === 1) {
      passageNeighbors.push([nx, ny])
      continue
    }
    if (grid[nx][ny] === 0) {
      frontierNeighbors.push([nx, ny])
      continue
    }
  }
  return [frontierNeighbors, passageNeighbors]
}

export const fillZeros = (grid: GridValues[][], steps: StepListQueue): void => {
  const { ROWS, COLS } = getRowsAndCols(grid)
  for (let diag = 0; diag < ROWS + COLS - 1; diag++) {
    const arr: Step[] = []
    const startRow = Math.min(ROWS - 1, diag)
    const startCol = Math.max(0, diag - (ROWS - 1))
    for (let i = startRow, j = startCol; i >= 0 && j < COLS; i--, j++) {
      grid[i][j] = 0
      arr.push({ row: i, col: j, val: 0 })
    }
    steps.push(arr)
  }
}

export const getRandomXYPath = (grid: GridValues[][]): PositionXY => {
  const { ROWS, COLS } = getRowsAndCols(grid)
  const rows = (ROWS - 1) / 2
  const cols = (COLS - 1) / 2
  const [x, y] = [
    Math.floor(Math.random() * rows) * 2 + 1,
    Math.floor(Math.random() * cols) * 2 + 1,
  ]
  return [x, y]
}

export const addStartAndEndNode = (grid: GridValues[][], steps: StepListQueue): void => {
  const { ROWS, COLS } = getRowsAndCols(grid)
  grid[ROWS - 2][1] = 99
  grid[1][COLS - 2] = 100
  steps.push([{ row: ROWS - 2, col: 1, val: 99 }])
  steps.push([{ row: 1, col: COLS - 2, val: 100 }])
}

export const changeGridValue = (
  x: number,
  y: number,
  val: GridValues,
  grid: GridValues[][],
  steps: StepListQueue,
): void => {
  grid[x][y] = val
  steps.push([{ row: x, col: y, val: val }])
}
