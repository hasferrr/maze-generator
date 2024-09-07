import { useGridContext } from '../hooks/useGridContext'
import { generateClass } from '../utils/generateClass'

const Grid = () => {
  const { gridRef: { current: grid }, gridDivRefs } = useGridContext()
  const cellSize = 544 / grid.length
  return (
    <div>
      {grid.map((arrRow, r) => (
        <div key={`grid-${r}`} className="flex max-w-full max-h-full">
          {arrRow.map((val, c) =>
            <div
              key={`${r}-${c}`}
              ref={(el) => gridDivRefs.current[r][c] = el!}
              className={generateClass(r, c, val)}
              style={{ width: cellSize, height: cellSize }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default Grid
