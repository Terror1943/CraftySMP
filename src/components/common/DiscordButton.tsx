import React from 'react';
import { SERVER_CONFIG } from '../../config/serverConfig';
import { sfx } from '../../utils/sound';

interface DiscordButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'compact';
  label?: string;
}

export const DiscordButton: React.FC<DiscordButtonProps> = ({
  className = '',
  variant = 'primary',
  label = 'JOIN DISCORD',
}) => {
  const handleClick = () => {
    sfx.playClick();
  };

  const baseStyles =
    'inline-flex items-center justify-center font-heading font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400';

  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles =
      'px-5 py-2.5 rounded-xl text-sm text-[#1E120D] bg-gradient-to-r from-[#FFD700] via-[#FF8C00] to-[#FF5722] hover:brightness-110 shadow-[0_0_20px_rgba(255,140,0,0.35)] hover:shadow-[0_0_25px_rgba(255,140,0,0.5)]';
  } else if (variant === 'secondary') {
    variantStyles =
      'px-4 py-2 rounded-xl text-xs text-[#FFF8E7] bg-[#2A1A12] border border-[#FF8C00]/50 hover:bg-[#382217] hover:border-[#FFC107] hover:text-[#FFD700] shadow-sm';
  } else {
    variantStyles =
      'px-3 py-1.5 rounded-lg text-xs text-[#FFF8E7] bg-[#2A1A12]/80 border border-amber-500/30 hover:border-amber-400 hover:text-amber-300';
  }

  return (
    <a
      href={SERVER_CONFIG.discordInviteUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Join CraftySMP Discord Community"
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {/* Discord Icon SVG */}
      <svg
        className="w-4 h-4 mr-2 fill-current shrink-0"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
      <span>{label}</span>
    </a>
  );
};
