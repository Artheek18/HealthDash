import { useApp } from "@/context/AppContext";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

export default function NutritionProgress() {
  const { userGoals, getTotalNutrition } = useApp();
  const totalNutrition = getTotalNutrition();

  if (!userGoals) return null;

  const caloriesPercent = (totalNutrition.calories / userGoals.dailyCalories) * 100;
  const proteinPercent = (totalNutrition.protein / userGoals.dailyProtein) * 100;
  const carbsPercent = (totalNutrition.carbs / userGoals.dailyCarbs) * 100;
  const fatsPercent = (totalNutrition.fats / userGoals.dailyFats) * 100;

  return (
    <Card className="p-4 bg-gradient-to-br from-green-50 to-blue-50">
      <h3 className="font-semibold mb-4">Daily Progress</h3>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Calories</span>
            <span className="font-semibold">
              {Math.round(totalNutrition.calories)} / {userGoals.dailyCalories}
            </span>
          </div>
          <Progress value={Math.min(caloriesPercent, 100)} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Protein</span>
            <span className="font-semibold">
              {Math.round(totalNutrition.protein)}g / {userGoals.dailyProtein}g
            </span>
          </div>
          <Progress value={Math.min(proteinPercent, 100)} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Carbs</span>
            <span className="font-semibold">
              {Math.round(totalNutrition.carbs)}g / {userGoals.dailyCarbs}g
            </span>
          </div>
          <Progress value={Math.min(carbsPercent, 100)} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Fats</span>
            <span className="font-semibold">
              {Math.round(totalNutrition.fats)}g / {userGoals.dailyFats}g
            </span>
          </div>
          <Progress value={Math.min(fatsPercent, 100)} className="h-2" />
        </div>
      </div>
    </Card>
  );
}
