import { CalorieComparisonTool } from "./components/CalorieComparisonTool"
import "./styles.css"

function App() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Calorie Comparison Tool</h1>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        Compare calories from common foods to calories burned through different exercises. See how much physical
        activity it takes to burn off your favorite foods!
      </p>
      <CalorieComparisonTool />
    </div>
  )
}

export default App
