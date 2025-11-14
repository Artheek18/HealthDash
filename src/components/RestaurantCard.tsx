import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Restaurant } from "@/types";
import { Clock, MapPin, Star } from "lucide-react";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export default function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow bg-white"
      onClick={onClick}
    >
      <div className="relative h-48">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold">{restaurant.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{restaurant.cuisine}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
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
            <Badge key={tag} variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
