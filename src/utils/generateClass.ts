import { twMerge } from 'tailwind-merge'
import { GridValues } from '../types/types'

const valueToClass = new Map<GridValues, string>([
  [0, 'bg-slate-900 animate-wall'],
  [1, 'bg-slate-200 animate-path'],
  [2, 'bg-cyan-300 animate-visit'],
  [3, 'bg-emerald-300 animate-result'],
  [99, 'bg-blue-600 animate-wall'],
  [100, 'bg-yellow-400 animate-wall'],
])

export const generateClass = (row: number, col: number, n: GridValues) => {
  return twMerge(
    'select-none',
    n !== 0 && 'border-b border-r border-slate-600',
    n === 1 && 'border-slate-600',
    row === 0 && 'border-t',
    col === 0 && 'border-l',
    valueToClass.get(n),
  )
}
