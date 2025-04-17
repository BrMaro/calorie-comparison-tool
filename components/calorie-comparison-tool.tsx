"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRightIcon, Utensils, Activity } from "lucide-react"

// Import JSON data
import foodsData from "@/data/foods.json"
import exercisesData from "@/data/exercises.json"

// Define types for our data
type Food = {
  id: string
  name: string
  calories: number
  serving: string
}

type Exercise = {
  id: string
  name: string
  caloriesPerMinute: number
}

export function CalorieComparisonTool() {
  // State for foods and exercises data
  const [foods, setFoods] = useState<Food[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([])

  // State for selected items
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [servings, setServings] = useState(1)
  const [weight, setWeight] = useState(155)
  const [customFood, setCustomFood] = useState("")
  const [customCalories, setCustomCalories] = useState("")

  // Load data on component mount
  useEffect(() => {
    setFoods(foodsData)
    setExercises(exercisesData)

    // Set default selections
    if (foodsData.length > 0) setSelectedFood(foodsData[0])
    if (exercisesData.length > 0) setSelectedExercise(exercisesData[0])
  }, [])

  // Calculate total calories from food
  const totalCalories = selectedFood ? selectedFood.calories * servings : 0

  // Calculate minutes needed to burn calories (adjusted for weight)
  const weightFactor = weight / 155
  const minutesToBurn = selectedExercise
    ? Math.round(totalCalories / (selectedExercise.caloriesPerMinute * weightFactor))
    : 0

  // Handle custom food addition
  const handleAddCustomFood = () => {
    if (customFood && customCalories && !isNaN(Number(customCalories))) {
      const newFood: Food = {
        id: `custom-${Date.now()}`,
        name: customFood,
        calories: Number(customCalories),
        serving: "1 serving",
      }

      // Add to foods array
      const updatedFoods = [...foods, newFood]
      setFoods(updatedFoods)

      // Select the new food
      setSelectedFood(newFood)

      // Clear inputs
      setCustomFood("")
      setCustomCalories("")
    }
  }

  // If data is not loaded yet, show loading state
  if (!selectedFood || !selectedExercise) {
    return <div className="p-8 text-center">Loading data...</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Food Selection
          </CardTitle>
          <CardDescription>Select a food item and adjust the number of servings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="select">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="select">Select Food</TabsTrigger>
              <TabsTrigger value="custom">Custom Food</TabsTrigger>
            </TabsList>

            <TabsContent value="select" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="food-select">Food Item</Label>
                <Select
                  onValueChange={(value) => {
                    const food = foods.find((f) => f.id === value)
                    if (food) setSelectedFood(food)
                  }}
                  defaultValue={selectedFood.id}
                >
                  <SelectTrigger id="food-select">
                    <SelectValue placeholder="Select a food" />
                  </SelectTrigger>
                  <SelectContent>
                    {foods.map((food) => (
                      <SelectItem key={food.id} value={food.id}>
                        {food.name} ({food.calories} cal/{food.serving})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="servings">Servings: {servings}</Label>
                  <span className="text-sm text-muted-foreground">{selectedFood.serving}</span>
                </div>
                <Slider
                  id="servings"
                  min={0.5}
                  max={10}
                  step={0.5}
                  value={[servings]}
                  onValueChange={(value) => setServings(value[0])}
                />
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="custom-food">Food Name</Label>
                <Input
                  id="custom-food"
                  placeholder="e.g., Blueberry Muffin"
                  value={customFood}
                  onChange={(e) => setCustomFood(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-calories">Calories per Serving</Label>
                <Input
                  id="custom-calories"
                  placeholder="e.g., 350"
                  type="number"
                  value={customCalories}
                  onChange={(e) => setCustomCalories(e.target.value)}
                />
              </div>

              <Button onClick={handleAddCustomFood} className="w-full">
                Add Custom Food
              </Button>
            </TabsContent>
          </Tabs>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Total Calories:</h3>
            <p className="text-3xl font-bold">{totalCalories} calories</p>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedFood.name} ({servings} {servings === 1 ? "serving" : "servings"})
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Exercise Equivalent
          </CardTitle>
          <CardDescription>See how much exercise is needed to burn those calories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="exercise-select">Exercise Type</Label>
              <Select
                onValueChange={(value) => {
                  const exercise = exercises.find((e) => e.id === value)
                  if (exercise) setSelectedExercise(exercise)
                }}
                defaultValue={selectedExercise.id}
              >
                <SelectTrigger id="exercise-select">
                  <SelectValue placeholder="Select an exercise" />
                </SelectTrigger>
                <SelectContent>
                  {exercises.map((exercise) => (
                    <SelectItem key={exercise.id} value={exercise.id}>
                      {exercise.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Your Weight (lbs): {weight} lbs</Label>
              <Slider
                id="weight"
                min={80}
                max={300}
                step={5}
                value={[weight]}
                onValueChange={(value) => setWeight(value[0])}
              />
              <p className="text-xs text-muted-foreground">Weight affects calorie burn rate</p>
            </div>

            <div className="flex items-center justify-center gap-4 my-6">
              <div className="text-center p-4 bg-muted rounded-lg flex-1">
                <p className="text-sm font-medium mb-1">Food</p>
                <p className="font-bold">{totalCalories} cal</p>
              </div>
              <ArrowRightIcon className="h-5 w-5" />
              <div className="text-center p-4 bg-muted rounded-lg flex-1">
                <p className="text-sm font-medium mb-1">Exercise</p>
                <p className="font-bold">{minutesToBurn} min</p>
              </div>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="font-semibold mb-2">Exercise Required:</h3>
              <p className="text-2xl font-bold">{minutesToBurn} minutes</p>
              <p className="text-sm mt-1">
                of {selectedExercise.name} to burn {totalCalories} calories
              </p>
              {minutesToBurn > 60 && (
                <p className="text-sm mt-2">
                  That's about {Math.floor(minutesToBurn / 60)} hour(s) and {minutesToBurn % 60} minutes
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Calorie Comparison Tool",
          "description": "Compare calories from common foods to calories burned through exercise.",
          "applicationCategory": "HealthApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "operatingSystem": "All"
        }
      `,
        }}
      />
    </div>
  )
}
