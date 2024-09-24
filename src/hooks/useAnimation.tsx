import { useState } from 'react'
import { AnimationType, GridValues, Step, StepListQueue } from '../types/types'
import { useGridContext } from './useGridContext'
import { SinglyLinkedListQueue } from '../libs/datastructures/queue'
import { useAnimationContext } from './useAnimateContext'
import { useGenerateClass } from './useGenerateClass'
import { findStartEnd } from '../utils/gridUtils'

export const useAnimation = () => {
  const { gridRef, gridDivRefs } = useGridContext()
  const { stepsListQueueRef, inProgress, setInProgress, delayRef, instantRef, timeoutListRef } = useAnimationContext()
  const { generateClass } = useGenerateClass()

  const [multiplier, setMultiplier] = useState(1)

  const animate = (
    steps: StepListQueue | null,
    type: AnimationType,
    callback?: () => void,
  ) => {
    if (type === 'reset') {
      stepsListQueueRef.current = steps
      setInProgress('reset')
      callAnimateLoop(multiplier, callback)
      return
    }
    if (inProgress && type !== inProgress) {
      return
    }
    if (inProgress === null) {
      stepsListQueueRef.current = steps
    }
    if (stepsListQueueRef.current) {
      setInProgress(type)
      callAnimateLoop(multiplier, callback)
    }
  }

  const callAnimateLoop = (n: number, callback?: () => void) => {
    n = n < 1 ? 1 : n
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        timeoutListRef.current.push(
          setTimeout(() => animateLoop(callback), delayRef.current)
        )
      }, delayRef.current / n * i)
    }
  }

  const animateLoop = (callback?: () => void) => {
    if (!stepsListQueueRef.current?.length) {
      clearState()
      if (callback) callback()
      return
    }
    do {
      const stepList = stepsListQueueRef.current.shift()!
      stepList.forEach((step: Step) => {
        const { row, col, val } = step
        gridRef.current[row][col] = val
        gridDivRefs.current[row][col].className = generateClass(row, col, val, instantRef.current)
      })
    } while (instantRef.current && stepsListQueueRef.current.length)
    timeoutListRef.current.push(
      setTimeout(() => animateLoop(callback), delayRef.current)
    )
  }

  const clearState = () => {
    stopAllTimeout()
    setInProgress(null)
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
    if (multiplier >= 8) {
      setMultiplier(999)
      instantRef.current = true
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
    if (multiplier === 999) {
      setMultiplier(8)
      instantRef.current = false
      return
    }
    if (multiplier === 1 / 2 ** 5) {
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
    instantRef.current = false
    callAnimateLoop(1)
  }

  const updateGrid = (
    condition: (value: number) => boolean,
    newValue: GridValues,
    callback?: () => void,
  ) => {
    const steps = new SinglyLinkedListQueue<Step[]>()
    const grid = gridRef.current
    const ROWS = grid.length
    const COLS = grid[0].length
    for (let diag = 0; diag < ROWS + COLS - 1; diag++) {
      const arr: Step[] = []
      const startRow = Math.min(ROWS - 1, diag)
      const startCol = Math.max(0, diag - (ROWS - 1))
      for (let i = startRow, j = startCol; i >= 0 && j < COLS; i--, j++) {
        if (condition(grid[i][j])) {
          grid[i][j] = newValue
          arr.push({ row: i, col: j, val: newValue })
        }
      }
      steps.push(arr)
    }
    animate(steps, 'reset', callback)
  }

  const clearGrid = () => {
    updateGrid((value) => ![99, 100].includes(value) && value !== 1, 1)
    const se = findStartEnd(gridRef.current)
    if (se.start[0] === -1 || se.end[0] === -1) {
      const ROWS = gridRef.current.length
      const COLS = gridRef.current[0].length
      gridRef.current[ROWS - 2][1] = 99
      gridRef.current[1][COLS - 2] = 100
      stepsListQueueRef.current?.push([
        { row: ROWS - 2, col: 1, val: 99 },
        { row: 1, col: COLS - 2, val: 100 },
      ])
    }
  }

  const clearVisited = (callback?: () => void) => {
    updateGrid((value) => [2, 3].includes(value) && value !== 1, 1, callback)
  }

  return {
    animate,
    clearGrid,
    clearVisited,
    clearState,
    speed: {
      multiplier,
      increase: increaseSpeed,
      decrease: decreaseSpeed,
      reset: resetSpeed,
    }
  }
}
