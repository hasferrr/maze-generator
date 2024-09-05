import { prim } from '../algorithms/generator/Prims'
import { useSetGrid, useSize } from '../contexts/GridExport'
import { createEmptyGrid } from '../helpers/createGrid'

const Button = () => {
  const [rows, cols] = useSize()
  const setGrid = useSetGrid()
  const handleGenerate = () => {
    setGrid(prim(createEmptyGrid(rows, cols)))
  }
  return (
    <div>
      <button onClick={handleGenerate}>Generate Maze</button>
    </div>
  )
}

export default Button
