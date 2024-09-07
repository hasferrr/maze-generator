import { useEffect, useRef } from 'react'
import { useGridContext } from '../hooks/useGridContext'
import { generateClass } from '../utils/generateClass'
import { useAnimateMaze } from '../hooks/useAnimateMaze'
import { SinglyLinkedListQueue } from '../utils/queue'
import { Step } from '../types/types'

const GridComponent = () => {
  const { gridRef: { current: grid }, gridDivRefs } = useGridContext()
  const { animate, inProgressRef } = useAnimateMaze()
  const isMouseDownRef = useRef(false)

  const cellSize = 544 / grid.length

  const draw = (row: number, col: number) => {
    if (inProgressRef.current) return
    const q = new SinglyLinkedListQueue<Step[]>()
    grid[row][col] = 0
    q.push([{ row, col, val: 0 }])
    animate(q, 'other')
  }

  useEffect(() => {
    window.addEventListener('mousedown', () => {
      isMouseDownRef.current = true
    })
    window.addEventListener('mouseup', () => {
      isMouseDownRef.current = false
    })
  }, [])

  return (
    <div>
      {grid.map((arrRow, r) => (
        <div key={`grid-${r}`} className="flex max-w-full max-h-full">
          {arrRow.map((val, c) =>
            <div
              key={`${r}-${c}`}
              ref={(el) => gridDivRefs.current[r][c] = el!}
              className={generateClass(r, c, val, true)}
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

export default GridComponent
