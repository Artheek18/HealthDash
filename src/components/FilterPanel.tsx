import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { NutritionFilters } from "@/types";
import { Filter, X } from "lucide-react";
import { useState } from "react";

interface FilterPanelProps {
  filters: NutritionFilters;
  onFiltersChange: (filters: NutritionFilters) => void;
}

const DIET_TAGS = ["High Protein", "Low Calorie", "Keto-Friendly", "Vegan", "Low Carb", "High Fiber"];

export default function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<NutritionFilters>(filters);

  const handleApply = () => {
    onFiltersChange(localFilters);
  };

  const handleReset = () => {
    const emptyFilters: NutritionFilters = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const toggleTag = (tag: string) => {
    setLocalFilters((prev) => {
      const currentTags = prev.tags || [];
      const newTags = currentTags.includes(tag)
        ? currentTags.filter((t) => t !== tag)
        : [...currentTags, tag];
      return { ...prev, tags: newTags.length > 0 ? newTags : undefined };
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
          {Object.keys(filters).length > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {Object.keys(filters).length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Nutrition Filters</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          <div>
            <Label className="text-base font-semibold mb-3 block">Max Calories</Label>
            <Slider
              value={[localFilters.maxCalories || 1000]}
              onValueChange={([value]) =>
                setLocalFilters((prev) => ({ ...prev, maxCalories: value }))
              }
              max={1000}
              min={100}
              step={50}
              className="mb-2"
            />
            <div className="text-sm text-muted-foreground">
              {localFilters.maxCalories ? `Up to ${localFilters.maxCalories} cal` : "No limit"}
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold mb-3 block">Min Protein</Label>
            <Slider
              value={[localFilters.minProtein || 0]}
              onValueChange={([value]) =>
                setLocalFilters((prev) => ({ ...prev, minProtein: value }))
              }
              max={60}
              min={0}
              step={5}
              className="mb-2"
            />
            <div className="text-sm text-muted-foreground">
              {localFilters.minProtein ? `At least ${localFilters.minProtein}g` : "No minimum"}
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold mb-3 block">Max Carbs</Label>
            <Slider
              value={[localFilters.maxCarbs || 100]}
              onValueChange={([value]) =>
                setLocalFilters((prev) => ({ ...prev, maxCarbs: value }))
              }
              max={100}
              min={0}
              step={5}
              className="mb-2"
            />
            <div className="text-sm text-muted-foreground">
              {localFilters.maxCarbs ? `Up to ${localFilters.maxCarbs}g` : "No limit"}
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold mb-3 block">Max Fats</Label>
            <Slider
              value={[localFilters.maxFats || 50]}
              onValueChange={([value]) =>
                setLocalFilters((prev) => ({ ...prev, maxFats: value }))
              }
              max={50}
              min={0}
              step={5}
              className="mb-2"
            />
            <div className="text-sm text-muted-foreground">
              {localFilters.maxFats ? `Up to ${localFilters.maxFats}g` : "No limit"}
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold mb-3 block">Diet Tags</Label>
            <div className="flex flex-wrap gap-2">
              {DIET_TAGS.map((tag) => (
                <Badge
                  key={tag}
                  variant={localFilters.tags?.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    localFilters.tags?.includes(tag)
                      ? "bg-green-600 hover:bg-green-700"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                  {localFilters.tags?.includes(tag) && <X className="w-3 h-3 ml-1" />}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleApply} className="flex-1 bg-green-600 hover:bg-green-700">
              Apply Filters
            </Button>
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Reset
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
