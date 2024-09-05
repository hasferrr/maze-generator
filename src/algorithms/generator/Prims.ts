export const prim = (grid: number[][]): number[][] => {
  const ROWS = grid.length
  const COLS = grid[0].length

  const rows = (ROWS - 1) / 2
  const cols = (COLS - 1) / 2

  const frontiers: [number, number][] = [[
    Math.floor(Math.random() * rows) * 2 + 1,
    Math.floor(Math.random() * cols) * 2 + 1,
  ]]

  const NEIGHBOR_POS = [
    [0, 2], [2, 0], [0, -2], [-2, 0]
  ]

  const visited: boolean[][] = Array.from({ length: ROWS }, () => Array(COLS))

  while (frontiers.length) {
    // pick one randomly
    const randIndex = Math.floor(Math.random() * frontiers.length)
    const [x, y] = frontiers[randIndex]
    visited[x][y] = true

    // get valid neighbors
    const neighbors: [number, number][] = []
    for (const [dy, dx] of NEIGHBOR_POS) {
      const nx = x + dx
      const ny = y + dy
      if (nx <= 0 || ny <= 0 || nx >= ROWS - 1 || ny >= COLS - 1 || visited[nx][ny]) {
        continue
      }
      neighbors.push([nx, ny])
    }

    // remove [x,y] from frontiers
    if (!neighbors.length) {
      if (frontiers.length === 1) {
        frontiers.pop()
      } else {
        frontiers[randIndex] = frontiers.pop()!
      }
      continue
    }

    // choose a random neighbor
    const randNeigborIndex = Math.floor(Math.random() * neighbors.length)
    const [nx, ny] = neighbors[randNeigborIndex]
    visited[nx][ny] = true
    frontiers.push([nx, ny])

    // break wall between the current cell and the neighbor
    const wallX = (x + nx) / 2
    const wallY = (y + ny) / 2
    grid[wallX][wallY] = 1
  }

  return grid
}
