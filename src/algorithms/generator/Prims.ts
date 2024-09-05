import { createWallGrid } from '../../helpers/createGrid'
import { Steps } from '../../types'

/**
 * Prim's algorithm maze with marking of:
 * - paths (1s)
 * - walls (0s)
 * - frontiers (2s)
 */
export const prim = (rows: number, cols: number): Steps => {
  const grid = createWallGrid(rows, cols)
  const steps: Steps = []

  const ROWS = grid.length
  const COLS = grid[0].length
  const NEIGHBOR_POS = [
    [0, 2], [2, 0], [0, -2], [-2, 0]
  ]

  const frontiers: [number, number][] = []

  const getNeighbors = (x: number, y: number) => {
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

  const pushValidFrontiers = (arr: [number, number][]) => {
    for (const [fx, fy] of arr) {
      if (grid[fx][fy] !== 2) {
        grid[fx][fy] = 2
        frontiers.push([fx, fy])
      }
    }
  }

  const [x, y] = [
    Math.floor(Math.random() * rows) * 2 + 1,
    Math.floor(Math.random() * cols) * 2 + 1,
  ]
  grid[x][y] = 1
  steps.push({ row: x, col: y, val: 1 })
  const [frontierNeighbors] = getNeighbors(x, y)
  pushValidFrontiers(frontierNeighbors)

  while (frontiers.length) {
    // pick one frontier randomly
    const randIndex = Math.floor(Math.random() * frontiers.length)
    const [x, y] = frontiers[randIndex]
    grid[x][y] = 1
    steps.push({ row: x, col: y, val: 1 })

    // get and push all valid neighbors
    const [frontierNeighbors, passageNeighbors] = getNeighbors(x, y)
    pushValidFrontiers(frontierNeighbors)

    // remove current frontier from list
    if (frontiers.length === 1) {
      frontiers.pop()
    } else {
      frontiers[randIndex] = frontiers.pop()!
    }

    // break wall between the current frontier and the random passageNeighbors
    if (!passageNeighbors.length) continue
    const randPassage = Math.floor(Math.random() * passageNeighbors.length)
    const [nx, ny] = passageNeighbors[randPassage]
    const wallX = (x + nx) / 2
    const wallY = (y + ny) / 2
    grid[wallX][wallY] = 1
    steps.push({ row: wallX, col: wallY, val: 1 })
  }

  return steps
}
