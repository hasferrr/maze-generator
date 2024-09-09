import { SinglyLinkedListQueue } from '../libs/datastructures/queue'

type Wall = 0
type Path = 1
type Visited = 2
type Result = 3
type Start = 99
type End = 100

export type GridValues = Wall | Path | Visited | Result | Start | End

export type Step = { row: number, col: number, val: GridValues }
export type StepListQueue = SinglyLinkedListQueue<Step[]>

export type AnimationType = 'generate' | 'solve' | 'reset' | 'draw'

export type PathfindingName = 'bfs' | 'dfs' | 'a-star' | 'greedy-bfs'
export type MazeGeneratorName = 'prim' | 'rec-back' | 'hunt-kill' | 'org-shift'

export type HeuristicType = 'manhattan' | 'euclidean'
