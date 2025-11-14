import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockRestaurants } from "@/data/mockData";
import { NutritionFilters } from "@/types";
import MenuItemCard from "@/components/MenuItemCard";
import FilterPanel from "@/components/FilterPanel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function RestaurantPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<NutritionFilters>({});

  const restaurant = mockRestaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Restaurant not found</p>
          <Button onClick={() => navigate("/")} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const filteredMenu = restaurant.menu.filter((item) => {
    if (filters.maxCalories && item.nutrition.calories > filters.maxCalories) return false;
    if (filters.minProtein && item.nutrition.protein < filters.minProtein) return false;
    if (filters.maxCarbs && item.nutrition.carbs > filters.maxCarbs) return false;
    if (filters.maxFats && item.nutrition.fats > filters.maxFats) return false;
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some((tag) => item.tags.includes(tag));
      if (!hasMatchingTag) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Restaurants
          </Button>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-32 h-32 rounded-lg object-cover shadow-md"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
              <p className="text-muted-foreground mb-3">{restaurant.cuisine}</p>
              <div className="flex items-center gap-4 text-sm mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{restaurant.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{restaurant.distance}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {restaurant.tags.map((tag) => (
                  <Badge key={tag} className="bg-green-100 text-green-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Menu</h2>
          <FilterPanel filters={filters} onFiltersChange={setFilters} />
        </div>

        {Object.keys(filters).length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredMenu.length} item{filteredMenu.length !== 1 ? "s" : ""} matching your filters
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onClick={() => navigate(`/restaurant/${restaurant.id}/item/${item.id}`)}
              onAddToCart={() => navigate(`/restaurant/${restaurant.id}/item/${item.id}`)}
            />
          ))}
        </div>

        {filteredMenu.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No menu items match your filters. Try adjusting them.</p>
          </div>
        )}
      </div>
    </div>
  );
}
