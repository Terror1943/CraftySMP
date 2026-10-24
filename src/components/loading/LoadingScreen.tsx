import React, { useEffect, useState } from 'react';
import { Sword, Flame, Sparkles } from 'lucide-react';
import { SERVER_CONFIG } from '../../config/serverConfig';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const initialDelay = prefersReducedMotion ? 100 : 700;

    const timer = setTimeout(() => {
      setFadingOut(true);
      const exitTimer = setTimeout(() => {
        onComplete();
      }, prefersReducedMotion ? 50 : 500);
      return () => clearTimeout(exitTimer);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1E120D] text-[#FFF8E7] transition-opacity duration-500 ease-out ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
    >
      {/* Background ambient radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.18)_0%,rgba(30,18,13,0.95)_70%)] pointer-events-none" />

      {/* Floating Ember Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-amber-400 blur-[1px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-orange-500 blur-[1px] animate-pulse delay-200" />
        <div className="absolute bottom-1/3 left-1/4 w-2.5 h-2.5 rounded-full bg-yellow-300 blur-[1px] animate-pulse delay-500" />
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 rounded-full bg-red-400 blur-[1px] animate-pulse delay-300" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Emblem */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFD700] via-[#FF8C00] to-[#D7261E] p-1 shadow-[0_0_35px_rgba(255,140,0,0.6)] flex items-center justify-center animate-fire">
            <div className="w-full h-full bg-[#1E120D] rounded-xl flex items-center justify-center relative overflow-hidden">
              <Sword className="w-10 h-10 text-amber-400 transform -rotate-45" />
              <Flame className="w-6 h-6 text-orange-500 absolute bottom-1 right-1 opacity-90 animate-bounce" />
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-yellow-300 absolute -top-2 -right-2 animate-spin" />
        </div>

        {/* Title */}
        <h1 className="font-heading font-black text-3xl sm:text-4xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF8C00] to-[#FF5722] drop-shadow-md">
          CRAFTYSMP
        </h1>
        <div className="inline-block px-3 py-0.5 mt-1 rounded bg-[#382217] border border-amber-500/40 font-heading font-extrabold text-xs sm:text-sm tracking-widest text-amber-300">
          SEASON 2
        </div>

        <p className="mt-4 text-xs sm:text-sm text-[#C6B7A5] font-medium tracking-wide">
          Preparing Your Adventure...
        </p>

        {/* Golden Progress Bar Indicator */}
        <div className="w-48 h-1.5 bg-[#2A1A12] border border-amber-500/30 rounded-full mt-4 overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 rounded-full animate-shimmer w-full" />
        </div>

        {/* Server IP quiet reminder */}
        <span className="mt-6 text-[11px] font-mono text-amber-500/70 tracking-tight">
          {SERVER_CONFIG.serverAddress}
        </span>
      </div>
    </div>
  );
};
