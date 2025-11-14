import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockRestaurants } from "@/data/mockData";
import { NutritionFilters } from "@/types";
import RestaurantCard from "@/components/RestaurantCard";
import FilterPanel from "@/components/FilterPanel";
import NutritionProgress from "@/components/NutritionProgress";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<NutritionFilters>({});
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRestaurants = mockRestaurants.filter((restaurant) => {
    // Search filter
    if (searchQuery && !restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Tag filter
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some((tag) => restaurant.tags.includes(tag));
      if (!hasMatchingTag) return false;
    }

    // Check if restaurant has items matching nutrition filters
    if (filters.maxCalories || filters.minProtein || filters.maxCarbs || filters.maxFats) {
      const hasMatchingItem = restaurant.menu.some((item) => {
        if (filters.maxCalories && item.nutrition.calories > filters.maxCalories) return false;
        if (filters.minProtein && item.nutrition.protein < filters.minProtein) return false;
        if (filters.maxCarbs && item.nutrition.carbs > filters.maxCarbs) return false;
        if (filters.maxFats && item.nutrition.fats > filters.maxFats) return false;
        return true;
      });
      if (!hasMatchingItem) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-green-600">HealthDash</h1>
              <p className="text-sm text-muted-foreground">Nutrition-focused food delivery</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search restaurants or cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <FilterPanel filters={filters} onFiltersChange={setFilters} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Nutrition Progress */}
        <div className="mb-6">
          <NutritionProgress />
        </div>

        {/* Active Filters */}
        {Object.keys(filters).length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? "s" : ""} matching your filters
            </p>
          </div>
        )}

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            />
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No restaurants match your filters. Try adjusting them.</p>
          </div>
        )}
      </div>
    </div>
  );
}
