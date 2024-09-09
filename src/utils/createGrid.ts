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
