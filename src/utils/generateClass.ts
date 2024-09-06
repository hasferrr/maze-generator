const GRID_COLOR = [
  'bg-[#333333]',
  'bg-cyan-500',
  'bg-cyan-700',
  'bg-emerald-400',
]

export const generateClass = (colorKey: number) => {
  return `${GRID_COLOR[colorKey]}`
}
