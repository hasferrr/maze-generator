import { twMerge } from 'tailwind-merge'

enum KeyToColor {
  wall = 'bg-slate-200',
  path = 'bg-slate-950',
  visit = 'bg-cyan-400',
  result = 'bg-emerald-400',
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

export const generateClass = (row: number, col: number, n: number, noAnimation?: boolean) => {
  return twMerge(
    KeyToColor[valueToKey[n]],
    !noAnimation && KeyToAnimation[valueToKey[n]],
    valueToKey[n] !== 'wall' && 'border-b border-r border-slate-200',
    row === 0 && 'border-t',
    col === 0 && 'border-l',
  )
}
