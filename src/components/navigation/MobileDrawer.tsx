import React from 'react';
import { X, Sword, Shield, Award, Coins, Sparkles, Home, User, ShieldAlert, Wifi } from 'lucide-react';
import { ServerStatus } from '../../types';
import { CopyIpButton } from '../common/CopyIpButton';
import { DiscordButton } from '../common/DiscordButton';
import { SERVER_CONFIG } from '../../config/serverConfig';
import { sfx } from '../../utils/sound';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  serverStatus: ServerStatus;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  serverStatus,
}) => {
  if (!isOpen) return null;

  const handleNav = (tab: string) => {
    sfx.playClick();
    onSelectTab(tab);
    onClose();
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'weapons', label: 'Custom & Legendary Weapons', icon: Sword },
    { id: 'kits', label: 'In-Game & Real Kits', icon: Shield },
    { id: 'ranks', label: 'Server Ranks', icon: Award },
    { id: 'coins', label: 'Coin Packages', icon: Coins },
    { id: 'specials', label: 'Special Items', icon: Sparkles },
    { id: 'status', label: 'Live Server Status', icon: Wifi },
    { id: 'account', label: 'My Account & Orders', icon: User },
    { id: 'admin', label: 'Admin Dashboard', icon: ShieldAlert },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xs h-full bg-[#1E120D] border-l border-amber-500/30 p-5 flex flex-col justify-between overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title and Close */}
        <div>
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-black font-bold text-sm">
                C2
              </div>
              <span className="font-heading font-extrabold text-base text-amber-300">
                CraftySMP Season 2
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="p-1.5 rounded-lg bg-[#2A1A12] text-[#C6B7A5] hover:text-white hover:bg-[#382217]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 mb-6" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 text-amber-300 border border-amber-500/40'
                      : 'text-[#C6B7A5] hover:text-white hover:bg-[#2A1A12]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Quick Actions: Server IP, Discord, Status */}
        <div className="pt-4 border-t border-amber-500/20 flex flex-col gap-3">
          {/* Status Snapshot */}
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#2A1A12] border border-amber-500/20 text-xs">
            <span className="text-[#C6B7A5]">Status:</span>
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  serverStatus.online ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                }`}
              />
              <span className="font-mono text-white">
                {serverStatus.online
                  ? `${serverStatus.playersOnline} Players Online`
                  : serverStatus.isUnavailable
                  ? 'Unavailable'
                  : 'Offline'}
              </span>
            </div>
          </div>

          {/* Copy IP */}
          <CopyIpButton variant="button" className="w-full justify-center" />

          {/* Discord Button */}
          <DiscordButton variant="primary" label="JOIN DISCORD" className="w-full justify-center" />

          <p className="text-[10px] text-center text-[#C6B7A5]/70 font-mono mt-1">
            {SERVER_CONFIG.serverAddress}
          </p>
        </div>
      </div>
    </div>
  );
};
