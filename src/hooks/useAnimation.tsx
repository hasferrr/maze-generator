import { useRef, useState } from 'react'
import { AnimationType, Step, StepListQueue } from '../types/types'
import { useGridContext } from './useGridContext'
import { generateClass } from '../utils/generateClass'
import { SinglyLinkedListQueue } from '../libs/datastructures/queue'
import { useAnimationContext } from './useAnimateContext'

export const useAnimation = () => {
  const { gridRef, gridDivRefs } = useGridContext()
  const { stepsListQueueRef, inProgressRef, delayRef } = useAnimationContext()

  const timeoutListRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const [multiplier, setMultiplier] = useState(1)

  const animate = (steps: StepListQueue | null, type: AnimationType) => {
    if (type === 'reset') {
      stepsListQueueRef.current = steps
      inProgressRef.current = 'reset'
      callAnimateLoop(multiplier)
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
      callAnimateLoop(multiplier)
    }
  }

  const callAnimateLoop = (n: number) => {
    n = n < 1 ? 1 : n
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        timeoutListRef.current.push(setTimeout(animateLoop, delayRef.current))
      }, delayRef.current / n * i)
    }
  }

  const animateLoop = () => {
    if (!stepsListQueueRef.current?.length) {
      return clearState()
    }
    const stepList = stepsListQueueRef.current.shift()!
    stepList.forEach((step: Step) => {
      const { row, col, val } = step
      gridRef.current[row][col] = val
      gridDivRefs.current[row][col].className = generateClass(row, col, val)
    })
    timeoutListRef.current.push(setTimeout(animateLoop, delayRef.current))
  }

  const clearState = () => {
    stopAllTimeout()
    inProgressRef.current = null
    stepsListQueueRef.current = null
  }

  const stopAllTimeout = () => {
    timeoutListRef.current.forEach((timeoutId) => clearTimeout(timeoutId))
    timeoutListRef.current = []
  }

  const stopOneTimeout = () => {
    clearTimeout(timeoutListRef.current.pop())
  }

  const increaseSpeed = () => {
    if (multiplier === 8) {
      return
    }
    if (multiplier <= 0.5) {
      setMultiplier(multiplier * 2)
      delayRef.current /= 2
      return
    }
    if (multiplier >= 1) {
      setMultiplier(multiplier + 1)
      callAnimateLoop(1)
    }
  }

  const decreaseSpeed = () => {
    if (multiplier === 1 / 2 ** 3) {
      return
    }
    if (multiplier <= 1) {
      setMultiplier(multiplier / 2)
      delayRef.current *= 2
      return
    }
    if (multiplier > 1) {
      setMultiplier(multiplier - 1)
      stopOneTimeout()
    }
  }

  const resetSpeed = () => {
    stopAllTimeout()
    setMultiplier(1)
    delayRef.current = 10
    callAnimateLoop(1)
  }

  const clearGrid = () => {
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

  const clearVisited = () => {
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
        if ([2, 3].includes(grid[i][j])) {
          grid[i][j] = 1
          arr.push({ row: i, col: j, val: 1 })
        }
      }
      steps.push(arr)
    }
    animate(steps, 'reset')
  }

  return {
    animate,
    clearGrid,
    clearVisited,
    speed: {
      multiplier,
      increase: increaseSpeed,
      decrease: decreaseSpeed,
      reset: resetSpeed,
    }
  }
}
