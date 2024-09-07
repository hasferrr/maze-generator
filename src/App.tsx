import ButtonComponent from './components/ButtonComponent'
import GridComponent from './components/GridComponent'

const App = () => {
  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="text-xl font-medium">
          Maze Generator & Pathfinding Visualizer
        </div>
        <GridComponent />
        <ButtonComponent />
      </div>
    </div>
  )
}

export default App
