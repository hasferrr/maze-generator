import { SinglyLinkedListQueue } from '../libs/datastructures/queue'

export enum GridValues {
  Wall = 0,
  Path = 1,
  Visited = 2,
  Result = 3,
  Start = 99,
  End = 100,
}

export type PositionXY = [number, number]

export type Step = { row: number, col: number, val: GridValues }
export type StepListQueue = SinglyLinkedListQueue<Step[]>

export type AnimationType = 'generate' | 'solve' | 'reset' | 'draw'

export type PathfindingName = 'bfs' | 'dfs' | 'a-star' | 'greedy-bfs'
export type MazeGeneratorName = 'prim' | 'kruskal' | 'rec-backtrack'

export type HeuristicType = 'manhattan' | 'euclidean'
export type InformedSearchType = 'a-star' | 'greedy-bfs'
