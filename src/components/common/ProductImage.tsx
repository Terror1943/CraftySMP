import React, { useState } from 'react';
import { Maximize2, Shield, Sparkles, Sword, AlertCircle } from 'lucide-react';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  fit?: 'contain' | 'cover';
  category?: string;
  allowEnlarge?: boolean;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'square',
  fit = 'contain',
  category,
  allowEnlarge = true,
}) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'video':
        return 'aspect-video';
      case 'portrait':
        return 'aspect-[3/4]';
      default:
        return '';
    }
  };

  const getCategoryIcon = () => {
    if (category?.includes('weapon')) return <Sword className="w-10 h-10 text-amber-400/80 mb-2" />;
    if (category?.includes('kit')) return <Shield className="w-10 h-10 text-orange-400/80 mb-2" />;
    return <Sparkles className="w-10 h-10 text-yellow-400/80 mb-2" />;
  };

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-xl bg-[#2A1A12] border border-[#FFC107]/25 transition-all duration-300 group flex items-center justify-center ${getAspectClass()} ${className}`}
      >
        {/* Skeleton while loading */}
        {loading && !hasError && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#2A1A12] via-[#382217] to-[#2A1A12] animate-pulse" />
        )}

        {/* Failed or Missing Image Fallback */}
        {(!src || hasError) ? (
          <div className="flex flex-col items-center justify-center p-4 text-center w-full h-full bg-gradient-to-b from-[#2A1A12] to-[#1E120D] text-[#C6B7A5]">
            {getCategoryIcon()}
            <span className="font-heading text-xs tracking-wider text-amber-200/90 uppercase font-semibold px-2 line-clamp-1">
              {alt}
            </span>
            <span className="text-[10px] text-amber-500/60 mt-1 font-mono">
              CraftySMP Custom Item
            </span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setHasError(true);
            }}
            className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
              fit === 'contain' ? 'object-contain p-2' : 'object-cover'
            } ${loading ? 'opacity-0' : 'opacity-100'}`}
          />
        )}

        {/* Enlarge Button */}
        {allowEnlarge && src && !hasError && !loading && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-amber-300 hover:text-white hover:bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm"
            title="Enlarge Image"
            aria-label={`Enlarge image of ${alt}`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Enlarged Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-[#1E120D] border border-amber-500/40 rounded-2xl p-4 shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between w-full mb-3 px-2">
              <h4 className="font-heading text-lg font-bold text-amber-400">{alt}</h4>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1 rounded-md text-xs font-semibold bg-[#382217] text-amber-200 hover:bg-amber-600 hover:text-white transition-colors"
              >
                Close (ESC)
              </button>
            </div>
            <div className="overflow-auto max-h-[75vh] w-full flex items-center justify-center bg-[#2A1A12] rounded-lg p-2">
              <img
                src={src}
                alt={alt}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
