import React from 'react';
import { X, ShoppingBag, ShieldCheck, Zap, Sparkles, Check } from 'lucide-react';
import { Product } from '../../types';
import { ProductImage } from '../common/ProductImage';
import { SERVER_CONFIG } from '../../config/serverConfig';
import { sfx } from '../../utils/sound';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const handleAdd = () => {
    sfx.playSuccess();
    onAddToCart(product);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#1E120D] border-2 border-amber-500/40 rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details modal"
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#2A1A12] text-[#C6B7A5] hover:text-white hover:bg-[#382217] transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Product Media Column */}
          <div className="space-y-3">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              className="w-full aspect-square border-2 border-amber-500/30 rounded-xl"
            />
            {product.originalImageUrl && (
              <p className="text-[11px] text-amber-500/60 font-mono text-center">
                Original Verified Asset Mapped
              </p>
            )}
          </div>

          {/* Product Info Column */}
          <div className="flex flex-col justify-between h-full space-y-4">
            <div>
              {/* Category / Tier Tag */}
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                <span>{product.category.replace('-', ' ')}</span>
                {product.badge && (
                  <>
                    <span>·</span>
                    <span className="text-orange-400 font-bold">{product.badge}</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h2 className="font-heading font-black text-2xl text-white tracking-wide">
                {product.name}
              </h2>

              {/* Price */}
              <div className="text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mt-2">
                {product.currency === 'INR' ? (
                  <span>{SERVER_CONFIG.currencies.inrSymbol}{product.price}</span>
                ) : (
                  <span>{product.price.toLocaleString()} {SERVER_CONFIG.currencies.coinsSymbol}</span>
                )}
              </div>

              {/* Description & Lore */}
              <p className="text-sm text-[#C6B7A5] mt-3 leading-relaxed">
                {product.description}
              </p>
              {product.lore && (
                <div className="mt-3 p-3 rounded-lg bg-[#2A1A12] border-l-2 border-amber-500/60 text-xs text-amber-200/90 italic font-serif">
                  &ldquo;{product.lore}&rdquo;
                </div>
              )}

              {/* Stats Box if available */}
              {product.stats && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {Object.entries(product.stats).map(([k, v]) => (
                    <div key={k} className="p-2 rounded-lg bg-[#2A1A12] border border-amber-500/20 text-xs">
                      <span className="text-stone-400 uppercase font-mono text-[10px] block">{k}:</span>
                      <strong className="text-amber-300 font-semibold">{v}</strong>
                    </div>
                  ))}
                </div>
              )}

              {/* Kit Contents if available */}
              {product.kitContents && product.kitContents.length > 0 && (
                <div className="mt-4 p-3 rounded-xl bg-[#2A1A12] border border-amber-500/25">
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Kit Bundle Contents</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#FFF8E7]">
                    {product.kitContents.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-amber-500/20">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-heading font-bold text-sm text-[#1E120D] bg-gradient-to-r from-[#FFD700] via-[#FF8C00] to-[#FF5722] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-orange-950/40"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO ARSENAL CART</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
