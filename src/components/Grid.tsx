import { useEffect, useRef, useMemo, useCallback } from 'react'
import { useGridContext } from '../hooks/useGridContext'
import { useAnimationContext } from '../hooks/useAnimateContext'
import { findStartEnd } from '../utils/gridUtils'
import { useDrawContext } from '../hooks/useDrawContext'
import { useGenerateClass } from '../hooks/useGenerateClass'

const Grid = () => {
  const { gridRef, gridDivRefs } = useGridContext()
  const { inProgressRef } = useAnimationContext()
  const { drawRef } = useDrawContext()
  const { generateClass } = useGenerateClass()

  const isMouseDownRef = useRef(false)
  const isDraggedStartTile = useRef(false)
  const isDraggedEndTile = useRef(false)

  const grid = gridRef.current
  const cellSize = 544 / grid.length

  useEffect(() => {
    const handleMouseDown = () => isMouseDownRef.current = true
    const handleMouseUp = () => {
      isMouseDownRef.current = false
      isDraggedStartTile.current = false
      isDraggedEndTile.current = false
    }
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const handleDraw = useCallback((row: number, col: number) => {
    if (![99, 100].includes(grid[row][col])) {
      const value = drawRef.current === 'draw' ? 0 : 1
      if (grid[row][col] !== value) {
        grid[row][col] = value
        gridDivRefs.current[row][col].className = generateClass(row, col, value)
      }
    }
  }, [grid, drawRef, gridDivRefs, generateClass])

  const handleMouseDown = useCallback((row: number, col: number) => {
    if (inProgressRef.current) return
    if (grid[row][col] === 99) {
      isDraggedStartTile.current = true
      return
    }
    if (grid[row][col] === 100) {
      isDraggedEndTile.current = true
      return
    }
    handleDraw(row, col)
  }, [grid, handleDraw, inProgressRef])

  const handleMouseOver = useCallback((row: number, col: number) => {
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
    handleDraw(row, col)
  }, [generateClass, grid, gridDivRefs, handleDraw, inProgressRef])

  return useMemo(() => (
    <div>
      {grid.map((arrRow, row) => (
        <div key={`grid-${row}`} className="flex max-w-full max-h-full">
          {arrRow.map((val, col) =>
            <div
              key={`${Math.random()}-${row}-${col}`}
              ref={(el) => gridDivRefs.current[row][col] = el!}
              className={generateClass(row, col, val, true)}
              style={{ width: cellSize, height: cellSize }}
              onMouseDown={() => handleMouseDown(row, col)}
              onMouseOver={() => handleMouseOver(row, col)}
            />
          )}
        </div>
      ))}
    </div>
  ), [cellSize, generateClass, grid, gridDivRefs, handleMouseDown, handleMouseOver])
}

export default Grid
