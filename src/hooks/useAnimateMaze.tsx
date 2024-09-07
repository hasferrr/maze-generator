import { AnimationType, Step, StepListQueue } from '../types/types'
import { useGridContext } from './useGridContext'
import { generateClass } from '../utils/generateClass'
import { SinglyLinkedListQueue } from '../utils/queue'
import { useAnimationContext } from './useAnimateContext'

export const useAnimateMaze = () => {
  const { gridRef, gridDivRefs } = useGridContext()
  const { stepsListQueueRef, inProgressRef, delayRef } = useAnimationContext()

  const animate = (steps: StepListQueue | null, type: AnimationType) => {
    if (type === 'reset') {
      stepsListQueueRef.current = steps
      inProgressRef.current = 'reset'
      setTimeout(animateLoop, delayRef.current)
      return
    }
    if (inProgressRef.current && type !== inProgressRef.current) {
      return
    }
    if (inProgressRef.current === null) {
      stepsListQueueRef.current = steps
    }
    if (stepsListQueueRef.current) {
      inProgressRef.current = type
      setTimeout(animateLoop, delayRef.current)
    }
  }

  const animateLoop = () => {
    if (!stepsListQueueRef.current?.length) {
      return stop()
    }
    const stepList = stepsListQueueRef.current.shift()!
    stepList.forEach((step: Step) => {
      const { row, col, val } = step
      gridRef.current[row][col] = val
      gridDivRefs.current[row][col].className = generateClass(row, col, val)
    })
    setTimeout(animateLoop, delayRef.current)
  }

  const stop = () => {
    inProgressRef.current = null
    stepsListQueueRef.current = null
  }

  const resetGrid = () => {
    if (inProgressRef.current === 'reset') {
      return
    }
    const steps = new SinglyLinkedListQueue<Step[]>
    const grid = gridRef.current
    const ROWS = grid.length
    const COLS = grid[0].length
    for (let diag = 0; diag < ROWS + COLS - 1; diag++) {
      const arr: Step[] = []
      const startRow = Math.min(ROWS - 1, diag)
      const startCol = Math.max(0, diag - (ROWS - 1))
      for (let i = startRow, j = startCol; i >= 0 && j < COLS; i--, j++) {
        grid[i][j] = 1
        arr.push({ row: i, col: j, val: 1 })
      }
      steps.push(arr)
    }
    animate(steps, 'reset')
  }

  return {
    animate,
    resetGrid,
  }
}
