export const prim = (grid: number[][], rows: number, cols: number): void => {
  const ROWS = grid.length
  const COLS = grid[0].length

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

    // remove from frontiers
    let curr = frontiers[randIndex]
    frontiers[randIndex] = frontiers[frontiers.length - 1]
    frontiers[frontiers.length - 1] = curr
    curr = frontiers.pop()!

    const [x, y] = curr
    visited[x][y] = true

    const neighbors: [number, number][] = []
    for (const [dy, dx] of NEIGHBOR_POS) {
      const nx = x + dx
      const ny = y + dy
      if (nx <= 0 || ny <= 0 || nx >= ROWS - 1 || ny >= COLS - 1) {
        continue
      }
      neighbors.push([nx, ny])
    }
    frontiers.push(...neighbors)

    // pick 1 random neighbor to span
    const randNeigbor = Math.floor(Math.random() * neighbors.length)
    const [nx, ny] = neighbors[randNeigbor]
    grid[Math.abs(x - nx)][Math.abs(y - ny)] = 1
  }
}
