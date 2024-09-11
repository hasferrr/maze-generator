import { PositionXY } from '../types/types'

export const manhattanDistance = (pos1: PositionXY, pos2: PositionXY): number => {
  const [x1, y1] = pos1
  const [x2, y2] = pos2
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

export const euclideanDistance = (pos1: PositionXY, pos2: PositionXY): number => {
  const [x1, y1] = pos1
  const [x2, y2] = pos2
  return Math.sqrt(Math.abs(x1 - x2) ** 2 + Math.abs(y1 - y2) ** 2)
}
