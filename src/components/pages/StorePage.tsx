import React, { useState, useMemo } from 'react';
import { Search, Filter, Sword, Shield, Coins, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Product, ProductCategory, Currency } from '../../types';
import { ProductCard } from '../products/ProductCard';
import { SERVER_CONFIG } from '../../config/serverConfig';
import { sfx } from '../../utils/sound';

interface StorePageProps {
  products: Product[];
  initialCategory?: ProductCategory;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const StorePage: React.FC<StorePageProps> = ({
  products,
  initialCategory = 'all',
  onAddToCart,
  onViewDetails,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState<'ALL' | Currency>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  const categories: { id: ProductCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'all', label: 'All Items', icon: Sparkles },
    { id: 'custom-weapons', label: 'Custom Weapons', icon: Sword },
    { id: 'legendary-weapons', label: 'Legendary Weapons', icon: Sword },
    { id: 'kits-inr', label: 'Real-Money Kits (INR)', icon: Shield },
    { id: 'kits-coins', label: 'Coin Kits', icon: Shield },
    { id: 'coins', label: 'Coin Packages', icon: Coins },
    { id: 'special-items', label: 'Special Items', icon: Sparkles },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Currency filter
      if (currencyFilter !== 'ALL' && p.currency !== currencyFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesAbility = p.stats?.ability?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesAbility) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      // featured default
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, currencyFilter, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Title & Slogan */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-500/20 pb-6">
        <div>
          <span className="text-xs font-heading font-bold uppercase tracking-widest text-amber-400">
            Official CraftySMP Store
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight mt-1">
            ARSENAL & SUPPLIES CATALOG
          </h1>
          <p className="text-xs sm:text-sm text-[#C6B7A5] mt-1">
            {SERVER_CONFIG.brandSlogan}
          </p>
        </div>

        {/* Currency Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#2A1A12] border border-amber-500/20 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setCurrencyFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              currencyFilter === 'ALL'
                ? 'bg-amber-500 text-black shadow-sm font-bold'
                : 'text-[#C6B7A5] hover:text-white'
            }`}
          >
            All Currencies
          </button>
          <button
            type="button"
            onClick={() => setCurrencyFilter('INR')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              currencyFilter === 'INR'
                ? 'bg-amber-500 text-black shadow-sm font-bold'
                : 'text-[#C6B7A5] hover:text-white'
            }`}
          >
            Real INR ({SERVER_CONFIG.currencies.inrSymbol})
          </button>
          <button
            type="button"
            onClick={() => setCurrencyFilter('COINS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              currencyFilter === 'COINS'
                ? 'bg-amber-500 text-black shadow-sm font-bold'
                : 'text-[#C6B7A5] hover:text-white'
            }`}
          >
            SMP Coins ({SERVER_CONFIG.currencies.coinsSymbol})
          </button>
        </div>
      </div>

      {/* Filter / Search Bar Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search custom weapons, kits, enchantments..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#2A1A12] border border-amber-500/30 text-white placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-amber-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'name')}
            aria-label="Sort products by"
            className="px-3 py-2 rounded-xl bg-[#2A1A12] border border-amber-500/30 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Category Pills / Filter bar (Interactive Segmented buttons) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                sfx.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold shadow-md shadow-orange-950/30'
                  : 'bg-[#2A1A12] text-[#C6B7A5] border border-amber-500/20 hover:border-amber-500/40 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-[#2A1A12]/40 border border-amber-500/20 p-8 space-y-3">
          <Filter className="w-10 h-10 text-amber-400/40 mx-auto" />
          <h3 className="font-heading font-bold text-lg text-white">No products match your filter</h3>
          <p className="text-xs text-[#C6B7A5] max-w-sm mx-auto">
            Try adjusting your search query, selecting another category, or resetting currency filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setCurrencyFilter('ALL');
            }}
            className="px-4 py-2 rounded-xl bg-[#382217] text-amber-300 text-xs font-semibold hover:bg-amber-600 hover:text-white transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};
