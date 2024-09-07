import { useContext } from 'react'
import AnimationContext from '../contexts/AnimationContext'

export const useAnimationContext = () => {
  return useContext(AnimationContext)
}
