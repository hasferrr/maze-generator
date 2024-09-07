import Buttons from './components/Buttons'
import Grid from './components/Grid'

const App = () => {
  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col gap-3 h-full items-center justify-center">
        <div className="text-xl font-medium">Maze Generator & Pathfinding Visualizer</div>
        <Grid />
        <Buttons />
      </div>
    </div>
  )
}

export default App
