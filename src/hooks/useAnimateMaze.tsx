import { useRef, useState } from 'react'
import { Step, StepListQueue } from '../types/types'
import { useGridContext } from './useGridContext'
import { generateClass } from '../utils/generateClass'

type AnimationType = 'generate' | 'solve'

export const useAnimateMaze = () => {
  const { gridRef, gridDivRefs, resetGrid } = useGridContext()
  const [inProgress, setInProgress] = useState<AnimationType | null>(null)
  const stepsListQueueRef = useRef<StepListQueue | null>(null)
  const delayRef = useRef(5)

  const animate = (steps: StepListQueue | null, type: AnimationType) => {
    if (inProgress && type !== inProgress) {
      return
    }
    if (!inProgress) {
      stepsListQueueRef.current = steps
    }
    if (stepsListQueueRef.current) {
      setInProgress(type)
      setTimeout(animateLoop, delayRef.current)
    }
  }

  const animateLoop = () => {
    if (!stepsListQueueRef.current?.length) {
      stepsListQueueRef.current = null
      setInProgress(null)
      return
    }
    const stepList = stepsListQueueRef.current.shift()!
    stepList.forEach((step: Step) => {
      const { row, col, val } = step
      gridRef.current[row][col] = val
      gridDivRefs.current[row][col].className = generateClass(row, col, val)
    })
    setTimeout(animateLoop, delayRef.current)
  }

  const reset = () => {
    stepsListQueueRef.current = null
    resetGrid()
    setInProgress(null)
  }

  return {
    animate,
    inProgress,
    reset,
  }
}
