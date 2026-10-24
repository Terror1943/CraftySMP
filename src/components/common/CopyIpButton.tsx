import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { SERVER_CONFIG } from '../../config/serverConfig';
import { sfx } from '../../utils/sound';

interface CopyIpButtonProps {
  className?: string;
  variant?: 'pill' | 'button' | 'hero' | 'minimal';
  showAddress?: boolean;
}

export const CopyIpButton: React.FC<CopyIpButtonProps> = ({
  className = '',
  variant = 'button',
  showAddress = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(SERVER_CONFIG.serverAddress);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = SERVER_CONFIG.serverAddress;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      sfx.playSuccess();
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (variant === 'hero') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy CraftySMP Minecraft Server IP"
        className={`group relative inline-flex items-center justify-between gap-3 px-5 py-3 rounded-xl bg-[#2A1A12] border-2 border-amber-500/40 hover:border-amber-400 text-amber-100 hover:text-white transition-all duration-200 shadow-lg hover:shadow-[0_0_20px_rgba(255,193,7,0.3)] active:scale-95 ${className}`}
      >
        <div className="flex flex-col text-left">
          <span className="text-[11px] uppercase tracking-wider text-amber-400/80 font-bold font-heading">
            Minecraft Java & Bedrock
          </span>
          <span className="font-mono text-sm sm:text-base font-semibold text-white">
            {SERVER_CONFIG.serverAddress}
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 group-hover:bg-amber-500 group-hover:text-black transition-colors font-heading text-xs font-bold shrink-0">
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400 group-hover:text-black" />
              <span>COPIED!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>COPY IP</span>
            </>
          )}
        </div>
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy server address"
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#2A1A12] border border-amber-500/30 text-amber-200 hover:border-amber-400 hover:text-white transition-all duration-150 ${className}`}
      >
        {showAddress && <span>{SERVER_CONFIG.serverAddress}</span>}
        {copied ? (
          <span className="flex items-center gap-1 text-emerald-400 font-sans font-semibold">
            <Check className="w-3.5 h-3.5" /> Copied
          </span>
        ) : (
          <Copy className="w-3.5 h-3.5 text-amber-400" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy server address"
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider bg-[#2A1A12] border border-amber-500/40 text-amber-200 hover:bg-[#382217] hover:border-amber-400 hover:text-white transition-all duration-200 active:scale-95 shadow-sm ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400">COPIED IP</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-amber-400" />
          <span>COPY SERVER IP</span>
        </>
      )}
    </button>
  );
};
