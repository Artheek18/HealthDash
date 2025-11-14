import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Toaster } from "./components/ui/toaster";
import HomePage from "./pages/HomePage";
import RestaurantPage from "./pages/RestaurantPage";
import MenuItemDetailPage from "./pages/MenuItemDetailPage";
import GoalsSetupPage from "./pages/GoalsSetupPage";
import CartPage from "./pages/CartPage";
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <AppProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="pb-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/goals" element={<GoalsSetupPage />} />
            <Route path="/restaurant/:id" element={<RestaurantPage />} />
            <Route path="/restaurant/:id/item/:itemId" element={<MenuItemDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
          <BottomNav />
        </div>
        <Toaster />
      </Suspense>
    </AppProvider>
  );
}

export default App;