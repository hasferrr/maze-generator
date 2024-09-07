import { twMerge } from 'tailwind-merge'

enum KeyToColor {
  wall = 'bg-slate-900',
  path = 'bg-slate-200',
  visit = 'bg-cyan-300',
  result = 'bg-emerald-300',
}

enum KeyToAnimation {
  wall = 'animate-wall',
  path = 'animate-path',
  visit = 'animate-visit',
  result = 'animate-result',
}

const valueToKey: Array<keyof typeof KeyToColor> = [
  'wall',
  'path',
  'visit',
  'result',
]

export const generateClass = (row: number, col: number, n: number) => {
  return twMerge(
    'select-none',
    KeyToColor[valueToKey[n]],
    KeyToAnimation[valueToKey[n]],
    n !== 0 && 'border-b border-r border-slate-600',
    n === 1 && 'border-slate-600',
    row === 0 && 'border-t',
    col === 0 && 'border-l',
  )
}
