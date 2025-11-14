export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  nutrition: NutritionInfo;
  ingredients: string[];
  tags: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisine: string;
  distance: string;
  menu: MenuItem[];
  tags: string[];
}

export interface UserGoals {
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFats: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

export interface NutritionFilters {
  maxCalories?: number;
  minProtein?: number;
  maxCarbs?: number;
  maxFats?: number;
  tags?: string[];
}
