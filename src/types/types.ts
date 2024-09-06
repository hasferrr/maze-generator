import { SinglyLinkedListQueue } from '../utils/queue'

export type Step = { row: number, col: number, val: number }
export type StepQueue = SinglyLinkedListQueue<Step>
