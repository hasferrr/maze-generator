import { GridValues, PositionXY, Step, StepListQueue } from '../../../types/types'
import { SinglyLinkedListQueue } from '../../datastructures/queue'
import { UnionFind } from '../../datastructures/unionFind'

interface Edge {
  src: PositionXY
  dst: PositionXY
  edge: PositionXY
}

/**
 * Kruskal's algorithm maze with marking of:
 * - paths (1s)
 * - walls (0s)
 */
export const kruskal = (grid: GridValues[][]): StepListQueue => {
  const steps: StepListQueue = new SinglyLinkedListQueue()

  const ROWS = grid.length
  const COLS = grid[0].length

  const createKey = (pos: PositionXY) => pos[0] * COLS + pos[1]

  const nodeCount = ((ROWS - 1) / 2) * ((COLS - 1) / 2)
  const uf = new UnionFind(ROWS * COLS)
  const edges: Edge[] = []

  // fill node
  for (let diag = 0; diag < ROWS + COLS - 1; diag++) {
    const arr: Step[] = []
    const startRow = Math.min(ROWS - 1, diag)
    const startCol = Math.max(0, diag - (ROWS - 1))
    for (let i = startRow, j = startCol; i >= 0 && j < COLS; i--, j++) {
      // 1 when i and j are odd
      const value = (i % 2 === 1 && j % 2 === 1) ? 1 : 0
      grid[i][j] = value
      arr.push({ row: i, col: j, val: value })
    }
    steps.push(arr)
  }

  // add edges
  for (let i = 1; i < ROWS - 1; i++) {
    for (let j = 1; j < COLS - 1; j++) {
      // horizontal edge
      if (i % 2 === 1 && j % 2 === 0) {
        edges.push({
          src: [i, j - 1],
          dst: [i, j + 1],
          edge: [i, j]
        })
      }
      // vertical edge
      if (i % 2 === 0 && j % 2 === 1) {
        edges.push({
          src: [i - 1, j],
          dst: [i + 1, j],
          edge: [i, j]
        })
      }
    }
  }

  while (uf.unionCount < nodeCount - 1) {
    const randIndex = Math.floor(Math.random() * edges.length)
    const { src, dst, edge: [x, y] } = edges[randIndex]

    if (uf.union(createKey(src), createKey(dst))) {
      grid[x][y] = 1
      steps.push([{ row: x, col: y, val: 1 }])
    }

    if (edges.length === 1) {
      edges.pop()
    } else {
      edges[randIndex] = edges.pop()!
    }
  }

  grid[ROWS - 2][1] = 99
  grid[1][COLS - 2] = 100
  steps.push([{ row: ROWS - 2, col: 1, val: 99 }])
  steps.push([{ row: 1, col: COLS - 2, val: 100 }])

  return steps
}
