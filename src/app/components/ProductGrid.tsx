import { ShoppingCart } from 'lucide-react';
import { Product } from '../context/WebBossContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductGridProps {
  products: Product[];
  whatsappNumber?: string;
}

export function ProductGrid({ products, whatsappNumber }: ProductGridProps) {
  const handleBuyClick = (product: Product) => {
    if (!whatsappNumber) return;
    
    // Clean number (remove https://wa.me/ or other prefixes if they exist)
    const cleanNumber = whatsappNumber.replace('https://wa.me/', '').replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hello! I'm interested in buying "${product.name}" for ${product.price}.`);
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  if (products.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider opacity-70 px-1">
        Featured Products
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col group cursor-pointer active:scale-95 transition-transform"
            onClick={() => handleBuyClick(product)}
          >
            <div className="aspect-square relative overflow-hidden bg-slate-100">
              <ImageWithFallback 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                <ShoppingCart size={14} className="text-[#22C55E]" />
              </div>
            </div>
            <div className="p-3 flex flex-col flex-1">
              <h3 className="text-slate-900 text-xs font-semibold truncate mb-1">
                {product.name}
              </h3>
              <p className="text-[#22C55E] text-sm font-bold mt-auto">
                {product.price}
              </p>
              <button 
                className="w-full mt-2 bg-[#22C55E] text-white text-[10px] font-bold py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                BUY NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
