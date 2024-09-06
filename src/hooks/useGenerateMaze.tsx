import { useRef } from 'react'
import { Steps } from '../types/types'
import { GRID_COLOR } from '../utils/color'
import { useGridContext } from './useGridContext'

export const useGenerateMaze = () => {
  const { gridRef, gridDivRefs } = useGridContext()
  const stepsRef = useRef<Steps | null>(null)
  const inProgress = useRef(false)
  const delay = useRef(5)

  const animate = (steps: Steps | null) => {
    if (!inProgress.current) {
      stepsRef.current = steps
    }
    if (stepsRef.current) {
      inProgress.current = true
      setTimeout(animateLoop, delay.current)
    }
  }

  const animateLoop = () => {
    if (!stepsRef.current!.length) {
      stepsRef.current = null
      inProgress.current = false
      return
    }
    const { row, col, val } = stepsRef.current!.shift()!
    gridRef.current[row][col] = val
    gridDivRefs.current[row][col].className = GRID_COLOR[val]
    setTimeout(animateLoop, delay.current)
  }

  return {
    animate,
    inProgress,
  }
}
