export const copyGrid = (grid: number[][]): number[][] => {
  const copy: number[][] = Array(grid.length)
  for (let i = 0; i < copy.length; i++) {
    copy[i] = [...grid[i]]
  }
  return copy
}
