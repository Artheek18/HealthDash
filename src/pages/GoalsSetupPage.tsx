import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GoalsSetupPage() {
  const navigate = useNavigate();
  const { setUserGoals } = useApp();
  const [calories, setCalories] = useState("2000");
  const [protein, setProtein] = useState("150");
  const [carbs, setCarbs] = useState("200");
  const [fats, setFats] = useState("65");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserGoals({
      dailyCalories: parseInt(calories),
      dailyProtein: parseInt(protein),
      dailyCarbs: parseInt(carbs),
      dailyFats: parseInt(fats),
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-600 mb-2">HealthDash</h1>
          <h2 className="text-xl font-semibold mb-2">Set Your Daily Goals</h2>
          <p className="text-sm text-muted-foreground">
            Track your nutrition and stay on target
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="calories" className="text-base font-semibold">
              Daily Calories
            </Label>
            <Input
              id="calories"
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required
              min="500"
              max="5000"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="protein" className="text-base font-semibold">
              Daily Protein (g)
            </Label>
            <Input
              id="protein"
              type="number"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              required
              min="20"
              max="500"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="carbs" className="text-base font-semibold">
              Daily Carbs (g)
            </Label>
            <Input
              id="carbs"
              type="number"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
              required
              min="20"
              max="500"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="fats" className="text-base font-semibold">
              Daily Fats (g)
            </Label>
            <Input
              id="fats"
              type="number"
              value={fats}
              onChange={(e) => setFats(e.target.value)}
              required
              min="20"
              max="200"
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 mt-6" size="lg">
            Start Ordering
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => navigate("/")}
          >
            Skip for now
          </Button>
        </form>
      </Card>
    </div>
  );
}