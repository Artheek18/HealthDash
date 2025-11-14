import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MenuItem } from "@/types";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuItemCardProps {
  item: MenuItem;
  onClick: () => void;
  onAddToCart?: () => void;
}

export default function MenuItemCard({ item, onClick, onAddToCart }: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
      <div className="relative h-40">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {item.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} className="bg-green-600 text-white text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="p-4 cursor-pointer" onClick={onClick}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-base">{item.name}</h3>
          <span className="font-bold text-green-600">${item.price}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {item.description}
        </p>
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Cal</div>
            <div className="font-semibold text-sm">{item.nutrition.calories}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Protein</div>
            <div className="font-semibold text-sm">{item.nutrition.protein}g</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Carbs</div>
            <div className="font-semibold text-sm">{item.nutrition.carbs}g</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Fats</div>
            <div className="font-semibold text-sm">{item.nutrition.fats}g</div>
          </div>
        </div>
        {onAddToCart && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="w-full bg-green-600 hover:bg-green-700"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
        )}
      </div>
    </Card>
  );
}
