import React from 'react';
import { Wifi, ShieldCheck, Terminal, HelpCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { ServerStatus } from '../../types';
import { ServerStatusCard } from '../common/ServerStatusCard';
import { CopyIpButton } from '../common/CopyIpButton';
import { DiscordButton } from '../common/DiscordButton';
import { SERVER_CONFIG } from '../../config/serverConfig';

interface StatusPageProps {
  status: ServerStatus;
  onRefresh: () => void;
}

export const StatusPage: React.FC<StatusPageProps> = ({ status, onRefresh }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-heading font-bold uppercase tracking-wider">
          <Wifi className="w-3.5 h-3.5" />
          <span>Real-Time Network Telemetry</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
          SERVER STATUS & NETWORK HEALTH
        </h1>
        <p className="text-sm text-[#C6B7A5]">
          Inspect live player count, server uptime, version compatibility, and connection diagnostics.
        </p>
      </div>

      {/* Main Server Status Card */}
      <ServerStatusCard status={status} onRefresh={onRefresh} />

      {/* Connection Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Java Edition */}
        <div className="p-6 rounded-2xl bg-[#2A1A12] border border-amber-500/25 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#382217] text-amber-400 border border-amber-500/30">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Minecraft Java Edition
              </h3>
              <p className="text-xs text-stone-400 font-mono">Recommended Version: 1.20 - 1.21.x</p>
            </div>
          </div>

          <ol className="space-y-2.5 text-xs text-[#FFF8E7] list-decimal list-inside leading-relaxed">
            <li>Launch Minecraft Java Edition (Version 1.20.x or higher).</li>
            <li>Click <strong>Multiplayer</strong> from the main menu.</li>
            <li>Click <strong>Add Server</strong> at the bottom.</li>
            <li>
              Set Server Address to:{' '}
              <span className="font-mono text-amber-300 font-bold bg-[#1E120D] px-2 py-0.5 rounded">
                {SERVER_CONFIG.serverAddress}
              </span>
            </li>
            <li>Click <strong>Done</strong> and double-click to connect!</li>
          </ol>

          <CopyIpButton variant="button" className="w-full" />
        </div>

        {/* Network & Rules Verification */}
        <div className="p-6 rounded-2xl bg-[#2A1A12] border border-amber-500/25 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#382217] text-orange-400 border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Connection Diagnostics
              </h3>
              <p className="text-xs text-stone-400 font-mono">DDoS Protection & Latency</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-[#C6B7A5]">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Zero Lag Policy:</strong> Dedicated 128GB RAM node with automatic chunk cleanup and TPS optimization.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Global Anycast Routing:</strong> Low latency from India, Southeast Asia, Europe, and Americas.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>24/7 Monitoring:</strong> If status reports offline or unavailable, staff are immediately notified in Discord.
              </span>
            </div>
          </div>

          <DiscordButton variant="secondary" label="REPORT SERVER ISSUE ON DISCORD" className="w-full" />
        </div>
      </div>
    </div>
  );
};
