import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../../types';
import { ProductImage } from '../common/ProductImage';
import { SERVER_CONFIG } from '../../config/serverConfig';
import { sfx } from '../../utils/sound';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const totalInr = items
    .filter((i) => i.product.currency === 'INR')
    .reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const totalCoins = items
    .filter((i) => i.product.currency === 'COINS')
    .reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md h-full bg-[#1E120D] border-l border-amber-500/30 flex flex-col justify-between shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-amber-500/20 flex items-center justify-between bg-[#2A1A12]/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-white">
                Your Arsenal Cart
              </h3>
              <p className="text-xs text-[#C6B7A5]">
                {totalCount} {totalCount === 1 ? 'item' : 'items'} ready for deployment
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart drawer"
            className="p-2 rounded-lg bg-[#2A1A12] text-[#C6B7A5] hover:text-white hover:bg-[#382217] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#C6B7A5]">
              <div className="w-16 h-16 rounded-2xl bg-[#2A1A12] border border-amber-500/20 flex items-center justify-center text-amber-500/40 mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-bold text-white text-base">Your cart is empty</h4>
              <p className="text-xs text-[#C6B7A5] mt-1 max-w-xs">
                Browse our custom weapons, kits, coin packages, and ranks to power up your game.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#2A1A12] border border-amber-500/20 hover:border-amber-500/40 transition-colors"
              >
                <div className="w-14 h-14 shrink-0">
                  <ProductImage
                    src={item.product.image}
                    alt={item.product.name}
                    category={item.product.category}
                    allowEnlarge={false}
                    className="w-full h-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-bold text-sm text-white truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-xs font-mono font-semibold text-amber-400 mt-0.5">
                    {item.product.currency === 'INR' ? (
                      <span>{SERVER_CONFIG.currencies.inrSymbol}{item.product.price} each</span>
                    ) : (
                      <span>{item.product.price.toLocaleString()} {SERVER_CONFIG.currencies.coinsSymbol}</span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 bg-[#1E120D] px-2 py-1 rounded-lg border border-amber-500/20">
                  <button
                    type="button"
                    onClick={() => {
                      sfx.playClick();
                      onUpdateQuantity(item.product.id, -1);
                    }}
                    aria-label="Decrease quantity"
                    className="text-[#C6B7A5] hover:text-white p-0.5"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-mono text-xs font-bold text-white min-w-[16px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      sfx.playClick();
                      onUpdateQuantity(item.product.id, 1);
                    }}
                    aria-label="Increase quantity"
                    className="text-[#C6B7A5] hover:text-white p-0.5"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => {
                    sfx.playClick();
                    onRemoveItem(item.product.id);
                  }}
                  aria-label={`Remove ${item.product.name}`}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer with Subtotals & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-amber-500/20 bg-[#2A1A12]/80 space-y-3">
            {/* Totals Breakdown */}
            <div className="space-y-1.5 text-xs">
              {totalInr > 0 && (
                <div className="flex items-center justify-between text-[#C6B7A5]">
                  <span>Total Real Currency (INR):</span>
                  <span className="font-mono text-base font-bold text-amber-300">
                    {SERVER_CONFIG.currencies.inrSymbol}{totalInr}
                  </span>
                </div>
              )}
              {totalCoins > 0 && (
                <div className="flex items-center justify-between text-[#C6B7A5]">
                  <span>Total In-Game Coins:</span>
                  <span className="font-mono text-base font-bold text-yellow-400">
                    {totalCoins.toLocaleString()} {SERVER_CONFIG.currencies.coinsSymbol}
                  </span>
                </div>
              )}
              <div className="text-[11px] text-amber-500/70 pt-1">
                * Real currency & in-game coins are processed separately.
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={onClearCart}
                className="px-3 py-2.5 rounded-xl border border-amber-500/20 text-xs font-semibold text-[#C6B7A5] hover:text-white hover:bg-[#382217] transition-colors"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => {
                  sfx.playClick();
                  onProceedToCheckout();
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-heading font-bold text-sm text-[#1E120D] bg-gradient-to-r from-[#FFD700] via-[#FF8C00] to-[#FF5722] hover:brightness-110 shadow-lg shadow-orange-950/40 active:scale-95 transition-all"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
