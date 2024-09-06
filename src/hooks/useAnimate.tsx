import { useRef } from 'react'
import { Steps } from '../types/types'
import { GRID_COLOR } from '../utils/color'
import { useGridContext } from './useGridContext'

export const useAnimate = () => {
  const { gridRef, gridDivRefs, inProgress } = useGridContext()
  const stepsRef = useRef<Steps | null>(null)

  const animate = (steps: Steps | null) => {
    if (!inProgress.current) {
      stepsRef.current = steps
    }
    inProgress.current = true
    setTimeout(animateLoop, 0)
  }

  const animateLoop = () => {
    if (!stepsRef.current!.length) {
      stepsRef.current = null
      inProgress.current = false
      return
    }
    const { row, col, val } = stepsRef.current!.shift()!
    gridRef.current[row][col] = val
    gridDivRefs.current[row][col].className = GRID_COLOR[val === 2 ? 3 : val]
    setTimeout(animateLoop, 0)
  }

  return {
    animate
  }
}
