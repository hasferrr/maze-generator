import { useContext } from 'react'
import DrawContext from '../contexts/DrawContext'

export const useDrawContext = () => {
  return useContext(DrawContext)
}
