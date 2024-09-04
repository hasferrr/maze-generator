import { useContext } from 'react'
import GridContext from './GridContext'

export const useGrid = () => {
  return useContext(GridContext).grid
}

export const useSize = () => {
  return useContext(GridContext).size
}
