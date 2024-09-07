import { SinglyLinkedListQueue } from '../utils/queue'

export type Step = { row: number, col: number, val: number }
export type StepListQueue = SinglyLinkedListQueue<Step[]>
export type AnimationType = 'generate' | 'solve' | 'reset' | 'draw'
