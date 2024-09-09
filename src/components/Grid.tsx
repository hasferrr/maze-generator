import { useEffect, useRef } from 'react'
import { useGridContext } from '../hooks/useGridContext'
import { generateClass } from '../utils/generateClass'
import { useAnimationContext } from '../hooks/useAnimateContext'
import { findStartEnd } from '../utils/gridUtils'

const Grid = () => {
  const { gridRef, gridDivRefs } = useGridContext()
  const { inProgressRef } = useAnimationContext()

  const isMouseDownRef = useRef(false)
  const isDraggedStartTile = useRef(false)
  const isDraggedEndTile = useRef(false)

  const grid = gridRef.current
  const cellSize = 544 / grid.length

  const draw = (row: number, col: number) => {
    if (![99, 100].includes(grid[row][col])) {
      grid[row][col] = 0
      gridDivRefs.current[row][col].className = generateClass(row, col, 0)
    }
  }

  useEffect(() => {
    const handleMouseDown = () => isMouseDownRef.current = true
    const handleMouseUp = () => isMouseDownRef.current = false
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const handleMouseDown = (row: number, col: number) => {
    if (inProgressRef.current) return
    if (grid[row][col] === 99) {
      isDraggedStartTile.current = true
      return
    }
    if (grid[row][col] === 100) {
      isDraggedEndTile.current = true
      return
    }
    draw(row, col)
  }

  const handleMouseOver = (row: number, col: number) => {
    if (inProgressRef.current) return
    if (!isMouseDownRef.current) return
    if (isDraggedStartTile.current || isDraggedEndTile.current) {
      if ([0, 99, 100].includes(grid[row][col])) {
        return
      }
      const { start, end } = findStartEnd(grid)
      const newValue = isDraggedStartTile.current ? 99 : 100
      const [oldX, oldY] = isDraggedStartTile.current ? start : end
      grid[oldX][oldY] = 1
      grid[row][col] = newValue
      gridDivRefs.current[oldX][oldY].className = generateClass(oldX, oldY, 1, true)
      gridDivRefs.current[row][col].className = generateClass(row, col, newValue, true)
      return
    }
    draw(row, col)
  }

  const handleMouseUp = () => {
    isDraggedStartTile.current = false
    isDraggedEndTile.current = false
  }

  return (
    <div>
      {grid.map((arrRow, row) => (
        <div key={`grid-${row}`} className="flex max-w-full max-h-full">
          {arrRow.map((val, col) =>
            <div
              key={`${row}-${col}`}
              ref={(el) => gridDivRefs.current[row][col] = el!}
              className={generateClass(row, col, val)}
              style={{ width: cellSize, height: cellSize }}
              onMouseDown={() => handleMouseDown(row, col)}
              onMouseOver={() => handleMouseOver(row, col)}
              onMouseUp={() => handleMouseUp()}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default Grid
