import { SinglyLinkedListQueue } from '../../utils/queue'

/**
 * BFS with marking of:
 * - walls (0s)
 * - paths (1s)
 * - visited (2s)
 * - result (3s)
 */
export const bfs = (grid: number[][]): number[][] => {
  const ROWS = grid.length
  const COLS = grid[0].length
  const DIRECTIONS = [
    [0, 1], [1, 0], [0, -1], [-1, 0]
  ]

  const start: [number, number] = [grid.length - 2, 1]
  const end: [number, number] = [1, grid[0].length - 2]

  let shortest = 0
  const path = new Map<string, [number, number] | null>()
  const queue = new SinglyLinkedListQueue<[number, number]>()
  path.set(`${start[0]},${start[1]}`, null)
  queue.push(start)

  while (queue.length) {
    const qLen = queue.length
    for (let i = 0; i < qLen; i++) {
      const [x, y] = queue.shift()!

      if (x === end[0] && y === end[1]) {
        grid[x][y] = 3
        let backtrack = path.get(`${x},${y}`)
        while (backtrack) {
          const [px, py] = backtrack
          grid[px][py] = 3
          backtrack = path.get(`${px},${py}`)
        }
        console.log(shortest)
        return grid
      }

      grid[x][y] = 2

      for (const [dy, dx] of DIRECTIONS) {
        const nx = x + dx
        const ny = y + dy
        if (nx < 0 || ny < 0 || nx === ROWS || ny === COLS) {
          continue
        }
        if (grid[nx][ny] === 1) {
          path.set(`${nx},${ny}`, [x, y])
          queue.push([nx, ny])
        }
      }
    }
    shortest++
  }

  return grid
}
