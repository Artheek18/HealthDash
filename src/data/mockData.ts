import { Restaurant } from "@/types";

export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Green Bowl Kitchen",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    rating: 4.8,
    deliveryTime: "25-35 min",
    cuisine: "Healthy Bowls",
    distance: "1.2 km",
    tags: ["High Protein", "Low Calorie", "Keto-Friendly"],
    menu: [
      {
        id: "m1",
        name: "Grilled Chicken Power Bowl",
        description: "Grilled chicken breast with quinoa, roasted vegetables, and tahini dressing",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
        nutrition: {
          calories: 450,
          protein: 42,
          carbs: 38,
          fats: 12,
          fiber: 8
        },
        ingredients: ["Chicken breast", "Quinoa", "Broccoli", "Sweet potato", "Tahini", "Lemon"],
        tags: ["High Protein", "Low Calorie"]
      },
      {
        id: "m2",
        name: "Salmon Superfood Salad",
        description: "Wild-caught salmon with kale, avocado, and omega-3 rich seeds",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
        nutrition: {
          calories: 520,
          protein: 38,
          carbs: 22,
          fats: 32,
          fiber: 10
        },
        ingredients: ["Salmon", "Kale", "Avocado", "Chia seeds", "Olive oil", "Lemon"],
        tags: ["High Protein", "Keto-Friendly"]
      },
      {
        id: "m3",
        name: "Vegan Buddha Bowl",
        description: "Chickpeas, brown rice, roasted veggies with tahini sauce",
        price: 10.99,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
        nutrition: {
          calories: 380,
          protein: 18,
          carbs: 52,
          fats: 10,
          fiber: 12
        },
        ingredients: ["Chickpeas", "Brown rice", "Carrots", "Zucchini", "Tahini"],
        tags: ["Vegan", "High Fiber"]
      }
    ]
  },
  {
    id: "2",
    name: "Protein Palace",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
    rating: 4.6,
    deliveryTime: "30-40 min",
    cuisine: "High Protein",
    distance: "2.1 km",
    tags: ["High Protein", "Keto-Friendly"],
    menu: [
      {
        id: "m4",
        name: "Steak & Eggs Plate",
        description: "Grass-fed sirloin steak with scrambled eggs and asparagus",
        price: 16.99,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
        nutrition: {
          calories: 580,
          protein: 52,
          carbs: 8,
          fats: 38,
          fiber: 3
        },
        ingredients: ["Sirloin steak", "Eggs", "Asparagus", "Butter", "Garlic"],
        tags: ["High Protein", "Keto-Friendly", "Low Carb"]
      },
      {
        id: "m5",
        name: "Turkey Meatballs with Zoodles",
        description: "Lean turkey meatballs over zucchini noodles with marinara",
        price: 13.99,
        image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&q=80",
        nutrition: {
          calories: 420,
          protein: 45,
          carbs: 18,
          fats: 16,
          fiber: 6
        },
        ingredients: ["Turkey", "Zucchini", "Tomato sauce", "Herbs", "Parmesan"],
        tags: ["High Protein", "Low Calorie", "Low Carb"]
      }
    ]
  },
  {
    id: "3",
    name: "Fresh & Fit Cafe",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
    rating: 4.9,
    deliveryTime: "20-30 min",
    cuisine: "Salads & Wraps",
    distance: "0.8 km",
    tags: ["Low Calorie", "Vegan Options"],
    menu: [
      {
        id: "m6",
        name: "Mediterranean Wrap",
        description: "Grilled chicken, hummus, cucumber, tomato in whole wheat wrap",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80",
        nutrition: {
          calories: 380,
          protein: 32,
          carbs: 42,
          fats: 10,
          fiber: 8
        },
        ingredients: ["Chicken", "Whole wheat tortilla", "Hummus", "Cucumber", "Tomato"],
        tags: ["High Protein", "Low Calorie"]
      },
      {
        id: "m7",
        name: "Kale Caesar Salad",
        description: "Kale, grilled chicken, parmesan, light caesar dressing",
        price: 11.99,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
        nutrition: {
          calories: 320,
          protein: 28,
          carbs: 15,
          fats: 16,
          fiber: 5
        },
        ingredients: ["Kale", "Chicken", "Parmesan", "Caesar dressing", "Croutons"],
        tags: ["Low Calorie", "High Protein"]
      }
    ]
  },
  {
    id: "4",
    name: "Macro Meals",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    rating: 4.7,
    deliveryTime: "35-45 min",
    cuisine: "Meal Prep",
    distance: "3.5 km",
    tags: ["High Protein", "Balanced Macros"],
    menu: [
      {
        id: "m8",
        name: "Teriyaki Chicken & Rice",
        description: "Grilled teriyaki chicken with jasmine rice and steamed broccoli",
        price: 12.49,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
        nutrition: {
          calories: 520,
          protein: 40,
          carbs: 58,
          fats: 12,
          fiber: 4
        },
        ingredients: ["Chicken", "Jasmine rice", "Broccoli", "Teriyaki sauce", "Sesame seeds"],
        tags: ["High Protein", "Balanced Macros"]
      },
      {
        id: "m9",
        name: "Beef Stir Fry",
        description: "Lean beef with mixed vegetables and brown rice",
        price: 13.99,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80",
        nutrition: {
          calories: 480,
          protein: 38,
          carbs: 45,
          fats: 14,
          fiber: 6
        },
        ingredients: ["Beef", "Bell peppers", "Onions", "Brown rice", "Soy sauce"],
        tags: ["High Protein"]
      }
    ]
  }
];
