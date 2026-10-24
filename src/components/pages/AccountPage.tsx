import React, { useState } from 'react';
import { User, Shield, Package, Clock, CheckCircle2, AlertCircle, Coins, Terminal } from 'lucide-react';
import { UserAccount, DeliveryOrder } from '../../types';
import { SERVER_CONFIG } from '../../config/serverConfig';
import { sfx } from '../../utils/sound';
import { useAuth } from '../../context/AuthContext';

interface AccountPageProps {
  user: UserAccount;
  onUpdateUser: (updated: Partial<UserAccount>) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ user, onUpdateUser }) => {
  const { user: authUser, signInWithGoogle, logOut } = useAuth();
  const [ign, setIgn] = useState(user.minecraftUsername || '');
  const [discord, setDiscord] = useState(user.discordTag || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playSuccess();
    onUpdateUser({
      minecraftUsername: ign.trim(),
      discordTag: discord.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="border-b border-amber-500/20 pb-4">
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
          PLAYER PROFILE & ARSENAL DISPATCH
        </h1>
        <p className="text-xs sm:text-sm text-[#C6B7A5] mt-1">
          Manage your linked Minecraft character, inspect previous purchases, and track server delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card & Settings */}
        <div className="lg:col-span-1 space-y-5">
          <div className="p-5 rounded-2xl bg-[#2A1A12] border border-amber-500/25 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-black font-heading font-black text-xl">
                {user.minecraftUsername ? user.minecraftUsername.charAt(0).toUpperCase() : 'C'}
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base">
                  {user.minecraftUsername || 'Guest Player'}
                </h3>
                <span className="text-[11px] font-mono text-amber-400 block">
                  Role: {user.role.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#1E120D] border border-amber-500/15 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#C6B7A5]">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>SMP Coins Balance:</span>
              </div>
              <span className="font-mono font-bold text-amber-300 text-sm">
                {user.coinsBalance.toLocaleString()} {SERVER_CONFIG.currencies.coinsSymbol}
              </span>
            </div>

            {/* Google Authentication Box */}
            <div className="p-3 rounded-xl bg-[#1E120D] border border-amber-500/20 text-xs space-y-2">
              <div className="text-[11px] font-heading font-bold uppercase tracking-wider text-amber-300">
                Cloud SQL & Firebase Sync
              </div>
              {authUser ? (
                <div className="space-y-2">
                  <div className="text-stone-300 truncate">
                    Signed in as: <strong className="text-white">{authUser.email}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => logOut()}
                    className="w-full py-1.5 px-3 rounded-lg bg-[#2A1A12] border border-amber-500/20 text-[#C6B7A5] hover:text-white hover:bg-[#382217] text-xs font-semibold"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-[#C6B7A5] text-[11px] mb-2 leading-relaxed">
                    Sign in to sync your orders and character data across devices with our PostgreSQL database.
                  </p>
                  <button
                    type="button"
                    onClick={() => signInWithGoogle()}
                    className="w-full py-2 px-3 rounded-lg bg-[#FFF8E7] text-black hover:bg-white text-xs font-bold font-heading uppercase flex items-center justify-center gap-2 shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Sign In With Google</span>
                  </button>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-amber-300 mb-1">
                  Minecraft Username (IGN)
                </label>
                <input
                  type="text"
                  value={ign}
                  onChange={(e) => setIgn(e.target.value)}
                  placeholder="e.g. Notch or Steve_S2"
                  className="w-full px-3 py-2 rounded-xl bg-[#1E120D] border border-amber-500/30 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#C6B7A5] mb-1">
                  Discord Username
                </label>
                <input
                  type="text"
                  value={discord}
                  onChange={(e) => setDiscord(e.target.value)}
                  placeholder="e.g. crafty_player"
                  className="w-full px-3 py-2 rounded-xl bg-[#1E120D] border border-amber-500/30 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-[#1E120D] bg-amber-400 hover:bg-amber-300 transition-colors"
              >
                SAVE PROFILE
              </button>

              {savedSuccess && (
                <div className="text-center text-emerald-400 text-xs flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Profile updated successfully!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Orders & Rank Claims */}
        <div className="lg:col-span-2 space-y-6">
          {/* Orders History */}
          <div className="p-5 rounded-2xl bg-[#2A1A12] border border-amber-500/25 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-500/15 pb-3">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-400" />
                <h3 className="font-heading font-extrabold text-base text-white">
                  Store Order History & Delivery Status
                </h3>
              </div>
              <span className="text-xs text-[#C6B7A5]">
                {user.orders.length} {user.orders.length === 1 ? 'Order' : 'Orders'}
              </span>
            </div>

            {user.orders.length === 0 ? (
              <div className="py-8 text-center text-[#C6B7A5] space-y-2">
                <Package className="w-8 h-8 text-stone-500 mx-auto" />
                <p className="text-xs">No orders recorded yet. Visit the store to power up your arsenal!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {user.orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3.5 rounded-xl bg-[#1E120D] border border-amber-500/20 space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-300">{order.orderNumber}</span>
                        <span className="text-stone-400">·</span>
                        <span className="text-[#C6B7A5]">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[11px] font-heading font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {order.deliveryStatus}
                      </span>
                    </div>

                    <div className="text-xs text-[#FFF8E7] flex flex-wrap gap-2">
                      {order.items.map((i, idx) => (
                        <span key={idx} className="bg-[#2A1A12] px-2 py-0.5 rounded text-[11px] text-[#C6B7A5]">
                          {i.quantity}x {i.product.name}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-amber-500/10 text-stone-400">
                      <span>IGN: <strong className="text-white font-mono">{order.minecraftUsername}</strong></span>
                      <span className="font-mono font-bold text-amber-400">
                        {order.totalInr > 0 ? `${SERVER_CONFIG.currencies.inrSymbol}${order.totalInr}` : ''}
                        {order.totalCoins > 0 ? ` ${order.totalCoins.toLocaleString()} Coins` : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rank Applications History */}
          <div className="p-5 rounded-2xl bg-[#2A1A12] border border-amber-500/25 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-500/15 pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-400" />
                <h3 className="font-heading font-extrabold text-base text-white">
                  Rank Verification Claims
                </h3>
              </div>
              <span className="text-xs text-[#C6B7A5]">
                {user.rankApplications.length} Submissions
              </span>
            </div>

            {user.rankApplications.length === 0 ? (
              <div className="py-6 text-center text-[#C6B7A5] text-xs">
                No active rank applications. Head over to the Ranks page to submit proof!
              </div>
            ) : (
              <div className="space-y-2.5">
                {user.rankApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-3 rounded-xl bg-[#1E120D] border border-amber-500/15 flex items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <strong className="text-amber-300 font-heading text-sm block">
                        {app.rankName} Rank Claim
                      </strong>
                      <span className="text-stone-400 text-[11px] font-mono">
                        IGN: {app.minecraftUsername} · {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                        app.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : app.status === 'rejected'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
