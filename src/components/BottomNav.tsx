import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Home, Search, ShoppingCart, User, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useApp();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/" },
    { icon: ShoppingCart, label: "Cart", path: "/cart", badge: cart.length },
    { icon: Target, label: "Goals", path: "/goals" },
    { icon: User, label: "Profile", path: "/" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center flex-1 h-full relative ${
                  isActive ? "text-green-600" : "text-gray-500"
                }`}
              >
                <div className="relative">
                  <Icon className="w-6 h-6" />
                  {item.badge && item.badge > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
