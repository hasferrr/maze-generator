import { useContext } from 'react'
import GridContext from '../contexts/GridContext'

export const useGridContext = () => {
  return useContext(GridContext)
}
