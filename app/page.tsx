import { CalorieComparisonTool } from "@/components/calorie-comparison-tool"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Calorie Comparison Tool</h1>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        Compare calories from common foods to calories burned through different exercises. See how much physical
        activity it takes to burn off your favorite foods!
      </p>
      <CalorieComparisonTool />
    </main>
  )
}
