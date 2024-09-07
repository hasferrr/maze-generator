import { twMerge } from 'tailwind-merge'

enum KeyToColor {
  wall = 'bg-slate-200',
  path = 'bg-slate-950',
  visited = 'bg-cyan-600',
  result = 'bg-emerald-400',
}

const valueToKey: Array<keyof typeof KeyToColor> = [
  'wall',
  'path',
  'visited',
  'result',
]

export const generateClass = (n: number) => {
  return twMerge(
    KeyToColor[valueToKey[n]],
    valueToKey[n] !== 'wall' && 'border-t border-r border-slate-200',
  )
}
