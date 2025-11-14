import { useParams, useNavigate } from "react-router-dom";
import { mockRestaurants } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function MenuItemDetailPage() {
  const { id, itemId } = useParams();
  const navigate = useNavigate();
  const { addToCart, userGoals, getTotalNutrition } = useApp();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const restaurant = mockRestaurants.find((r) => r.id === id);
  const item = restaurant?.menu.find((m) => m.id === itemId);

  if (!restaurant || !item) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Item not found</p>
          <Button onClick={() => navigate("/")} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      menuItem: item,
      quantity,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    });
    toast({
      title: "Added to cart",
      description: `${quantity}x ${item.name} added to your cart`,
    });
  };

  const totalNutrition = getTotalNutrition();
  const itemNutrition = {
    calories: item.nutrition.calories * quantity,
    protein: item.nutrition.protein * quantity,
    carbs: item.nutrition.carbs * quantity,
    fats: item.nutrition.fats * quantity,
  };

  const newTotal = {
    calories: totalNutrition.calories + itemNutrition.calories,
    protein: totalNutrition.protein + itemNutrition.protein,
    carbs: totalNutrition.carbs + itemNutrition.carbs,
    fats: totalNutrition.fats + itemNutrition.fats,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/restaurant/${restaurant.id}`)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Image */}
          <div>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Details */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {item.tags.map((tag) => (
                <Badge key={tag} className="bg-green-600 text-white">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
            <p className="text-xl font-bold text-green-600 mb-4">${item.price}</p>
            <p className="text-muted-foreground mb-6">{item.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full bg-green-600 hover:bg-green-700 mb-4"
              size="lg"
            >
              Add to Cart - ${(item.price * quantity).toFixed(2)}
            </Button>
          </div>
        </div>

        {/* Nutrition Facts */}
        <Card className="mt-6 p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">Nutrition Facts</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{itemNutrition.calories}</div>
              <div className="text-sm text-muted-foreground">Calories</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{itemNutrition.protein}g</div>
              <div className="text-sm text-muted-foreground">Protein</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{itemNutrition.carbs}g</div>
              <div className="text-sm text-muted-foreground">Carbs</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{itemNutrition.fats}g</div>
              <div className="text-sm text-muted-foreground">Fats</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">{item.nutrition.fiber * quantity}g</div>
              <div className="text-sm text-muted-foreground">Fiber</div>
            </div>
          </div>

          {userGoals && (
            <>
              <Separator className="my-4" />
              <h3 className="font-semibold mb-3">Impact on Daily Goals</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Calories:</span>
                  <span>
                    {Math.round(newTotal.calories)} / {userGoals.dailyCalories} (
                    {Math.round((newTotal.calories / userGoals.dailyCalories) * 100)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Protein:</span>
                  <span>
                    {Math.round(newTotal.protein)}g / {userGoals.dailyProtein}g (
                    {Math.round((newTotal.protein / userGoals.dailyProtein) * 100)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Carbs:</span>
                  <span>
                    {Math.round(newTotal.carbs)}g / {userGoals.dailyCarbs}g (
                    {Math.round((newTotal.carbs / userGoals.dailyCarbs) * 100)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Fats:</span>
                  <span>
                    {Math.round(newTotal.fats)}g / {userGoals.dailyFats}g (
                    {Math.round((newTotal.fats / userGoals.dailyFats) * 100)}%)
                  </span>
                </div>
              </div>
            </>
          )}
        </Card>

        {/* Ingredients */}
        <Card className="mt-6 p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">Ingredients</h2>
          <div className="flex flex-wrap gap-2">
            {item.ingredients.map((ingredient) => (
              <Badge key={ingredient} variant="outline">
                {ingredient}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
