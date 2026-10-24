import React from 'react';
import { ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { ProductImage } from '../common/ProductImage';
import { SERVER_CONFIG } from '../../config/serverConfig';
import { sfx } from '../../utils/sound';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
}) => {
  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playSuccess();
    onAddToCart(product);
  };

  const handleDetails = () => {
    sfx.playClick();
    onViewDetails(product);
  };

  return (
    <div
      onClick={handleDetails}
      className="group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#2A1A12] to-[#20130d] border border-amber-500/25 hover:border-amber-400/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(255,140,0,0.2)] cursor-pointer"
    >
      {/* Product Image Slot */}
      <div className="relative mb-3">
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
          aspectRatio="square"
          fit="contain"
          className="w-full h-44 sm:h-48 rounded-xl bg-[#1E120D] border border-amber-500/20 group-hover:border-amber-400/40 transition-colors"
        />

        {/* Quiet text kicker / badge without candy pill sandwich */}
        {product.badge && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-amber-400/40 text-[10px] font-heading font-bold uppercase tracking-wider text-amber-300">
            {product.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Metadata: Category */}
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-500/80 uppercase tracking-wider">
            <span>{product.category.replace('-', ' ')}</span>
            {product.stats?.tier && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-stone-400">{product.stats.tier}</span>
              </>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-heading font-extrabold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors line-clamp-1 mt-0.5">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-[#C6B7A5] line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-amber-500/15 flex items-center justify-between gap-2 mt-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-mono text-stone-400">Price</span>
            <div className="font-mono font-bold text-base sm:text-lg text-amber-400 tabular-nums">
              {product.currency === 'INR' ? (
                <span>{SERVER_CONFIG.currencies.inrSymbol}{product.price}</span>
              ) : (
                <span>{product.price.toLocaleString()} {SERVER_CONFIG.currencies.coinsSymbol}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDetails();
              }}
              title="View Details"
              aria-label={`View details for ${product.name}`}
              className="p-2 rounded-xl bg-[#382217] text-[#C6B7A5] hover:text-white hover:bg-amber-600 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleAdd}
              aria-label={`Add ${product.name} to cart`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-[#1E120D] bg-gradient-to-r from-[#FFD700] via-[#FF8C00] to-[#FF5722] hover:brightness-110 active:scale-95 transition-all shadow-md shadow-orange-950/30"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
