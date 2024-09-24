import { twMerge } from 'tailwind-merge'
import { GridValues } from '../types/types'
import { useSettingsContext } from './useSettingsContext'
import { useCallback } from 'react'

const valueToColor = new Map<GridValues, string>([
  [0, 'bg-slate-900'],
  [1, 'bg-slate-200'],
  [2, 'bg-cyan-300'],
  [3, 'bg-emerald-300'],
  [99, 'bg-blue-600'],
  [100, 'bg-yellow-400'],
])

const valueToAnimation = new Map<GridValues, string>([
  [0, 'animate-wall'],
  [1, 'animate-path'],
  [2, 'animate-visit'],
  [3, 'animate-result'],
  [99, 'animate-wall'],
  [100, 'animate-wall'],
])

export const useGenerateClass = () => {
  const { reduceAnimationRef } = useSettingsContext()

  const generateClass = useCallback((row: number, col: number, val: GridValues, noAnimation?: boolean) => {
    return twMerge(
      'select-none',
      'border-b border-r',
      val !== 0 && 'border-slate-600',
      val === 0 && 'border-slate-900',
      row === 0 && 'border-t',
      col === 0 && 'border-l',
      valueToColor.get(val),
      !reduceAnimationRef.current && !noAnimation && valueToAnimation.get(val),
    )
  }, [reduceAnimationRef])

  return { generateClass }
}
