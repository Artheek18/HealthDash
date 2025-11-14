import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart, getTotalNutrition, userGoals } = useApp();

  const totalNutrition = getTotalNutrition();
  const totalPrice = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some delicious healthy meals to get started!</p>
            <Button onClick={() => navigate("/")} className="bg-green-600 hover:bg-green-700">
              Browse Restaurants
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.menuItem.id} className="p-4 bg-white">
                <div className="flex gap-4">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{item.menuItem.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.restaurantName}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.menuItem.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.menuItem.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateCartQuantity(item.menuItem.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateCartQuantity(item.menuItem.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <span className="font-bold text-green-600">
                        ${(item.menuItem.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <Card className="p-6 bg-white sticky top-4">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>$3.99</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-green-600">${(totalPrice + 3.99).toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 mb-4" size="lg">
                Proceed to Checkout
              </Button>

              <Separator className="my-4" />

              <h3 className="font-semibold mb-3">Total Nutrition</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Calories</span>
                  <span className="font-semibold">{Math.round(totalNutrition.calories)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Protein</span>
                  <span className="font-semibold">{Math.round(totalNutrition.protein)}g</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbs</span>
                  <span className="font-semibold">{Math.round(totalNutrition.carbs)}g</span>
                </div>
                <div className="flex justify-between">
                  <span>Fats</span>
                  <span className="font-semibold">{Math.round(totalNutrition.fats)}g</span>
                </div>
              </div>

              {userGoals && (
                <>
                  <Separator className="my-4" />
                  <h3 className="font-semibold mb-2 text-sm">Daily Goal Progress</h3>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>
                      Calories: {Math.round((totalNutrition.calories / userGoals.dailyCalories) * 100)}%
                    </div>
                    <div>
                      Protein: {Math.round((totalNutrition.protein / userGoals.dailyProtein) * 100)}%
                    </div>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
