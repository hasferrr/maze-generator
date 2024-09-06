import { copyGrid } from '../utils/copyGrid'
import { Steps } from '../types/types'
import { useGridContext } from './useGridContext'

const useAnimate = () => {
  const { setGrid } = useGridContext()
  const animate = (steps: Steps, startGrid: number[][]) => {
    if (!steps.length) {
      return
    }
    const { row, col, val } = steps.shift()!
    startGrid[row][col] = val
    requestAnimationFrame(() => {
      setGrid(copyGrid(startGrid))
      animate(steps, startGrid)
    })
  }

  return {
    animate
  }
}

export default useAnimate
