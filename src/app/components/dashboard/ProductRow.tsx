import { Trash2, Edit2, Eye, EyeOff, Package } from 'lucide-react';
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Product } from "../../context/WebBossContext";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ProductRowProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string) => void;
}

export function ProductRow({ product, onEdit, onDelete, onToggleVisibility }: ProductRowProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 group">
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100 bg-slate-50">
        {product.image ? (
          <ImageWithFallback 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <Package size={24} />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-900 truncate">{product.name}</h3>
          {product.inventory <= 0 ? (
            <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold uppercase">Out of Stock</span>
          ) : product.inventory <= 5 ? (
            <span className="text-[10px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded font-bold uppercase">Low Stock: {product.inventory}</span>
          ) : (
            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold uppercase">Stock: {product.inventory}</span>
          )}
        </div>
        <p className="text-sm text-green-600 font-medium">{product.price}</p>
        {product.description && (
          <p className="text-xs text-slate-500 truncate mt-0.5">{product.description}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 mr-2">
          {product.isVisible ? (
            <Eye size={16} className="text-slate-400" />
          ) : (
            <EyeOff size={16} className="text-slate-400" />
          )}
          <Switch 
            checked={product.isVisible} 
            onCheckedChange={() => onToggleVisibility(product.id)}
          />
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-slate-400 hover:text-slate-600"
          onClick={() => onEdit(product)}
        >
          <Edit2 size={18} />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-slate-400 hover:text-red-500"
          onClick={() => onDelete(product.id)}
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  );
}
