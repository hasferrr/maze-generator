import { useContext } from 'react'
import GridContext from '../contexts/GridContext'
import { GRID_COLOR } from '../utils/color'

export const useGridContext = () => {
  const context = useContext(GridContext)

  const resetGrid = () => {
    for (let i = 0; i < context.gridRef.current.length; i++) {
      for (let j = 0; j < context.gridRef.current[0].length; j++) {
        context.gridRef.current[i][j] = 0
        context.gridDivRefs.current[i][j].className = GRID_COLOR[0]
      }
    }
  }

  return { ...context, resetGrid }
}
