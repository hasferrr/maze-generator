import { useRef, useState } from 'react'
import { StepQueue } from '../types/types'
import { GRID_COLOR } from '../utils/color'
import { useGridContext } from './useGridContext'

export const useGenerateMaze = () => {
  const { gridRef, gridDivRefs, resetGrid } = useGridContext()
  const [inProgress, setInProgress] = useState(false)
  const stepsRef = useRef<StepQueue | null>(null)
  const delayRef = useRef(5)

  const animate = (steps: StepQueue | null) => {
    if (!inProgress) {
      stepsRef.current = steps
    }
    if (stepsRef.current) {
      setInProgress(true)
      setTimeout(animateLoop, delayRef.current)
    }
  }

  const animateLoop = () => {
    if (!stepsRef.current?.length) {
      stepsRef.current = null
      setInProgress(false)
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
    setInProgress(false)
  }

  return {
    animate,
    inProgress,
    reset,
  }
}
