import { useGridContext } from '../hooks/useGridContext'

const gridColor = [
  'bg-[#333333]',
  'bg-cyan-600',
  'bg-cyan-900',
  'bg-emerald-400',
]

const Grid = () => {
  const { grid } = useGridContext()
  const cellSize = 544 / grid.length
  return (
    <div>
      {grid.map((arrRow, rowIndex) => (
        <div key={`grid-${rowIndex}`} className="flex max-w-full max-h-full">
          {arrRow.map((val, colIndex) =>
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`${rowIndex}-${colIndex} flex flex-col ${gridColor[val]}`}
              style={{ width: cellSize, height: cellSize }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default Grid
