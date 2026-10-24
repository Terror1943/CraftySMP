import React from 'react';
import { ShoppingBag, Menu, Volume2, VolumeX, Sword, ShieldAlert, User, LogIn, LogOut } from 'lucide-react';
import { ServerStatus } from '../../types';
import { DiscordButton } from '../common/DiscordButton';
import { sfx } from '../../utils/sound';
import { useAuth } from '../../context/AuthContext';


interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenMobileMenu: () => void;
  serverStatus: ServerStatus;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  onOpenMobileMenu,
  serverStatus,
  soundEnabled,
  onToggleSound,
}) => {
  const { currentUser, profile, login } = useAuth();

  const handleTabClick = (tab: string) => {
    sfx.playClick();
    onSelectTab(tab);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'weapons', label: 'Weapons' },
    { id: 'kits', label: 'Kits' },
    { id: 'ranks', label: 'Ranks' },
    { id: 'coins', label: 'Coins' },
    { id: 'specials', label: 'Specials' },
    { id: 'status', label: 'Status' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#1E120D]/95 backdrop-blur-md border-b border-amber-500/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single element) */}
        <button
          type="button"
          onClick={() => handleTabClick('home')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 focus-visible:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFD700] via-[#FF8C00] to-[#D7261E] p-0.5 shadow-[0_0_15px_rgba(255,140,0,0.4)] group-hover:shadow-[0_0_20px_rgba(255,193,7,0.6)] transition-shadow">
            <div className="w-full h-full bg-[#1E120D] rounded-[10px] flex items-center justify-center">
              <Sword className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
              CraftySMP <span className="text-amber-400 text-sm font-extrabold ml-0.5">S2</span>
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Clean single line typography) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#C6B7A5]">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleTabClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-white py-1 relative ${
                  isActive ? 'text-amber-300 font-bold' : ''
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Controls Area */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Mini Server Status indicator (desktop only) */}
          <button
            type="button"
            onClick={() => handleTabClick('status')}
            title="View Server Status"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2A1A12] border border-amber-500/25 hover:border-amber-400/50 text-xs text-[#C6B7A5] transition-colors whitespace-nowrap"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                serverStatus.online ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
              }`}
            />
            <span className="font-mono text-white text-[11px]">
              {serverStatus.online ? `${serverStatus.playersOnline} Online` : 'Status'}
            </span>
          </button>

          {/* Sound Mute/Unmute */}
          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Disable SFX' : 'Enable SFX'}
            className="p-2 rounded-lg bg-[#2A1A12] border border-amber-500/20 text-[#C6B7A5] hover:text-amber-300 hover:border-amber-400/40 transition-colors"
            title={soundEnabled ? 'Sound ON' : 'Sound MUTED'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Discord CTA */}
          <div className="hidden sm:block">
            <DiscordButton variant="secondary" label="DISCORD" />
          </div>

          {/* Shopping Bag Drawer Button */}
          <button
            type="button"
            onClick={() => {
              sfx.playClick();
              onOpenCart();
            }}
            aria-label={`Open shopping cart, ${cartCount} items`}
            className="relative p-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/40 text-amber-300 hover:text-white hover:border-amber-400 hover:bg-amber-500/20 transition-all duration-200 active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-mono font-bold text-[10px] min-w-[20px] text-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Quick Access */}
          <button
            type="button"
            onClick={() => handleTabClick('admin')}
            aria-label="Open Admin Dashboard"
            title="Admin Dashboard"
            className="hidden md:flex p-2 rounded-lg bg-[#2A1A12] border border-amber-500/20 text-[#C6B7A5] hover:text-amber-300 transition-colors"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>

          {/* User Account / Google Sign-In */}
          {currentUser ? (
            <button
              type="button"
              onClick={() => handleTabClick('account')}
              aria-label="View Player Account"
              title={`Logged in as ${currentUser.displayName || currentUser.email}`}
              className="hidden sm:flex items-center gap-1.5 p-1.5 pr-2.5 rounded-xl bg-[#2A1A12] border border-amber-500/30 text-amber-200 hover:border-amber-400 transition-colors"
            >
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'Player'}
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 rounded-lg object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                  {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'P'}
                </div>
              )}
              <span className="text-xs font-heading font-semibold max-w-[80px] truncate">
                {profile?.minecraftUsername || currentUser.displayName?.split(' ')[0] || 'Player'}
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                sfx.playClick();
                login();
              }}
              aria-label="Sign In with Google"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-bold text-amber-300 bg-[#2A1A12] border border-amber-500/30 hover:border-amber-400 hover:text-white transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>SIGN IN</span>
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open mobile menu"
            className="lg:hidden p-2 rounded-lg bg-[#2A1A12] border border-amber-500/30 text-amber-300 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
