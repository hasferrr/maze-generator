import { useEffect, useRef } from 'react'
import { useGridContext } from '../hooks/useGridContext'
import { generateClass } from '../utils/generateClass'
import { useAnimation } from '../hooks/useAnimation'
import { useAnimationContext } from '../hooks/useAnimateContext'
import { SinglyLinkedListQueue } from '../libs/datastructures/queue'
import { Step } from '../types/types'

const Grid = () => {
  const { gridRef, gridDivRefs } = useGridContext()
  const { animate } = useAnimation()
  const { inProgressRef } = useAnimationContext()

  const isMouseDownRef = useRef(false)

  const grid = gridRef.current
  const cellSize = 544 / grid.length

  const draw = (row: number, col: number) => {
    if (inProgressRef.current) return
    const qq = new SinglyLinkedListQueue<Step[]>()
    grid[row][col] = 0
    qq.push([{ row, col, val: 0 }])
    animate(qq, 'draw')
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
              onMouseDown={() => draw(r, c)}
              onMouseOver={() => {
                if (isMouseDownRef.current) draw(r, c)
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default Grid
