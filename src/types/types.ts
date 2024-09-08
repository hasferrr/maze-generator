import { SinglyLinkedListQueue } from '../libs/datastructures/queue'

export type Step = { row: number, col: number, val: number }
export type StepListQueue = SinglyLinkedListQueue<Step[]>

export type AnimationType = 'generate' | 'solve' | 'reset' | 'draw'

export type PathfindingName = 'bfs' | 'dfs' | 'a-star' | 'greedy-bfs'
export type MazeGeneratorName = 'prim' | 'rec-back' | 'hunt-kill' | 'org-shift'

export type HeuristicType = 'manhattan' | 'euclidean'
