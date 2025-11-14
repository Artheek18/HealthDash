import { createContext, useContext, useState, ReactNode } from "react";
import { UserGoals, CartItem, NutritionInfo } from "@/types";

interface AppContextType {
  userGoals: UserGoals | null;
  setUserGoals: (goals: UserGoals) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalNutrition: () => NutritionInfo;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userGoals, setUserGoals] = useState<UserGoals | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.menuItem.id === item.menuItem.id);
      if (existing) {
        return prev.map((i) =>
          i.menuItem.id === item.menuItem.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.menuItem.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.menuItem.id === itemId ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalNutrition = (): NutritionInfo => {
    return cart.reduce(
      (total, item) => ({
        calories: total.calories + item.menuItem.nutrition.calories * item.quantity,
        protein: total.protein + item.menuItem.nutrition.protein * item.quantity,
        carbs: total.carbs + item.menuItem.nutrition.carbs * item.quantity,
        fats: total.fats + item.menuItem.nutrition.fats * item.quantity,
        fiber: total.fiber + item.menuItem.nutrition.fiber * item.quantity,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 }
    );
  };

  return (
    <AppContext.Provider
      value={{
        userGoals,
        setUserGoals,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getTotalNutrition,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
