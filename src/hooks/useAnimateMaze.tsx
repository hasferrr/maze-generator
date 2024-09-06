import { useRef, useState } from 'react'
import { StepQueue } from '../types/types'
import { GRID_COLOR } from '../utils/color'
import { useGridContext } from './useGridContext'

type AnimationType = 'generate' | 'solve'

export const useAnimateMaze = () => {
  const { gridRef, gridDivRefs, resetGrid } = useGridContext()
  const [inProgress, setInProgress] = useState<AnimationType | null>(null)
  const stepsRef = useRef<StepQueue | null>(null)
  const delayRef = useRef(5)

  const animate = (steps: StepQueue | null, type: AnimationType) => {
    if (inProgress && type !== inProgress) {
      return
    }
    if (!inProgress) {
      stepsRef.current = steps
    }
    if (stepsRef.current) {
      setInProgress(type)
      setTimeout(animateLoop, delayRef.current)
    }
  }

  const animateLoop = () => {
    if (!stepsRef.current?.length) {
      stepsRef.current = null
      setInProgress(null)
      return
    }
    const { row, col, val } = stepsRef.current.shift()!
    gridRef.current[row][col] = val
    gridDivRefs.current[row][col].className = GRID_COLOR[val]
    setTimeout(animateLoop, delayRef.current)
  }

  const reset = () => {
    stepsRef.current = null
    resetGrid()
    setInProgress(null)
  }

  return {
    animate,
    inProgress,
    reset,
  }
}
