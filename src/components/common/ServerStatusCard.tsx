import React from 'react';
import { RefreshCw, Users, Wifi, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ServerStatus } from '../../types';
import { CopyIpButton } from './CopyIpButton';
import { DiscordButton } from './DiscordButton';
import { SERVER_CONFIG } from '../../config/serverConfig';
import { sfx } from '../../utils/sound';

interface ServerStatusCardProps {
  status: ServerStatus;
  onRefresh: () => void;
  className?: string;
  variant?: 'full' | 'compact' | 'hero';
}

export const ServerStatusCard: React.FC<ServerStatusCardProps> = ({
  status,
  onRefresh,
  className = '',
  variant = 'full',
}) => {
  const handleRefreshClick = () => {
    sfx.playClick();
    onRefresh();
  };

  const getStatusBadge = () => {
    if (status.loading && !status.lastUpdated) {
      return (
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span>Checking server...</span>
        </div>
      );
    }

    if (status.isUnavailable) {
      return (
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Status Unavailable</span>
        </div>
      );
    }

    if (status.online) {
      return (
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="uppercase tracking-wider font-heading">Server Online</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 text-xs font-semibold text-red-400">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
        <span className="uppercase tracking-wider font-heading">Server Offline</span>
      </div>
    );
  };

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-[#2A1A12]/90 border border-amber-500/30 backdrop-blur-sm ${className}`}>
        {getStatusBadge()}
        {status.online && !status.isUnavailable && (
          <span className="text-xs font-mono text-[#C6B7A5]">
            <strong className="text-white">{status.playersOnline}</strong>/{status.playersMax}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2A1A12] via-[#23150e] to-[#1E120D] border-2 border-amber-500/30 p-5 sm:p-6 shadow-2xl ${className}`}
    >
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Row */}
      <div className="flex items-center justify-between gap-4 border-b border-amber-500/20 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#382217] border border-amber-500/40 text-amber-400 shadow-inner">
            <Wifi className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-white tracking-wide">
              {SERVER_CONFIG.serverName}
            </h3>
            <p className="text-xs text-[#C6B7A5] font-mono">{SERVER_CONFIG.serverAddress}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {getStatusBadge()}
          <button
            type="button"
            onClick={handleRefreshClick}
            disabled={status.loading}
            aria-label="Refresh Minecraft server status"
            className="p-2 rounded-lg bg-[#382217] text-amber-300 hover:text-white hover:bg-amber-600 transition-all duration-150 disabled:opacity-50"
            title="Refresh status"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${status.loading ? 'animate-spin text-amber-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Server Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        {/* Players Metric */}
        <div className="p-3 rounded-xl bg-[#1E120D]/80 border border-amber-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#C6B7A5] mb-1">
            <span>PLAYERS</span>
            <Users className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg sm:text-xl font-heading font-extrabold text-amber-300">
            {status.isUnavailable ? (
              <span className="text-sm font-normal text-amber-500/80">Unavailable</span>
            ) : status.online ? (
              <span>
                {status.playersOnline} <span className="text-xs text-[#C6B7A5] font-normal">/ {status.playersMax}</span>
              </span>
            ) : (
              <span className="text-sm font-normal text-red-400">0 / 0</span>
            )}
          </div>
        </div>

        {/* Version Metric */}
        <div className="p-3 rounded-xl bg-[#1E120D]/80 border border-amber-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#C6B7A5] mb-1">
            <span>VERSION</span>
            <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
          </div>
          <div className="text-sm sm:text-base font-heading font-bold text-white truncate">
            {status.version || '1.20 - 1.21.x'}
          </div>
        </div>

        {/* Status / Last Updated */}
        <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-[#1E120D]/80 border border-amber-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#C6B7A5] mb-1">
            <span>LAST CHECK</span>
            <span className="text-[10px] text-amber-400/80 font-mono">60s Auto</span>
          </div>
          <div className="text-xs font-mono text-amber-200 truncate">
            {status.lastUpdated || 'Checking now...'}
          </div>
        </div>
      </div>

      {/* Motd & Notice */}
      {status.isUnavailable ? (
        <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
          <p className="font-semibold mb-0.5">Note on Live Server Connection:</p>
          <p className="text-amber-300/80">
            Unable to poll public status service at this moment. You can still directly connect to{' '}
            <strong className="text-white font-mono">{SERVER_CONFIG.serverAddress}</strong> in your Minecraft client or join our Discord.
          </p>
        </div>
      ) : status.motd && (
        <div className="mb-5 p-2.5 rounded-xl bg-[#1E120D]/60 border border-amber-500/15 text-xs text-[#C6B7A5] font-mono line-clamp-1">
          {status.motd}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <CopyIpButton variant="hero" className="flex-1" />
        <DiscordButton variant="primary" label="DISCORD COMMUNITY" className="sm:w-auto" />
      </div>
    </div>
  );
};
