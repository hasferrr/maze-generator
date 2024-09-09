export const manhattanDistance = (x1: number, x2: number, y1: number, y2: number): number => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

export const euclideanDistance = (x1: number, x2: number, y1: number, y2: number): number => {
  return (x1 - x2) ** 2 + (y1 - y2) ** 2
}
