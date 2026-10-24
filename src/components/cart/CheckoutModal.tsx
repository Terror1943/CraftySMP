import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, Terminal, CreditCard, Sparkles } from 'lucide-react';
import { CartItem, DeliveryOrder } from '../../types';
import { SERVER_CONFIG } from '../../config/serverConfig';
import { sfx } from '../../utils/sound';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: (order: DeliveryOrder) => void;
  defaultMinecraftUsername?: string;
  defaultDiscordTag?: string;
  userId?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
  defaultMinecraftUsername = '',
  defaultDiscordTag = '',
  userId,
}) => {
  const [minecraftUsername, setMinecraftUsername] = useState(defaultMinecraftUsername);
  const [discordTag, setDiscordTag] = useState(defaultDiscordTag);
  const [paymentMode, setPaymentMode] = useState<'sandbox' | 'upi_qr' | 'coins'>('sandbox');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<DeliveryOrder | null>(null);

  if (!isOpen) return null;

  const totalInr = items
    .filter((i) => i.product.currency === 'INR')
    .reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const totalCoins = items
    .filter((i) => i.product.currency === 'COINS')
    .reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanUsername = minecraftUsername.trim();
    if (!cleanUsername) {
      setError('Please provide your exact Minecraft Username for server delivery.');
      return;
    }

    if (!/^[a-zA-Z0-9_]{3,16}$/.test(cleanUsername)) {
      setError('Minecraft usernames must be 3-16 characters and contain only letters, numbers, and underscores.');
      return;
    }

    setIsProcessing(true);

    // Build delivery commands for this order
    const commands: string[] = [];
    items.forEach((item) => {
      for (let q = 0; q < item.quantity; q++) {
        if (item.product.category.includes('kit')) {
          const kitName = item.product.id.replace('kit-inr-', '').replace('kit-coins-', '');
          commands.push(`kit give ${cleanUsername} ${kitName}`);
        } else if (item.product.category.includes('weapon')) {
          const weaponId = item.product.id.replace('cw-', '').replace('leg-', '');
          commands.push(`customweapons give ${cleanUsername} ${weaponId}`);
        } else if (item.product.category === 'coins') {
          // Extract amount
          const coinAmount = item.product.name.includes('Lakh')
            ? 100000
            : item.product.name.includes('Million')
            ? 1000000
            : 25000;
          commands.push(`eco give ${cleanUsername} ${coinAmount}`);
        } else {
          commands.push(`give ${cleanUsername} minecraft:${item.product.id} 1`);
        }
      }
    });

    const newOrder: DeliveryOrder = {
      id: 'ord_' + Math.random().toString(36).substring(2, 9),
      orderNumber: `CSMP-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: userId || undefined,
      minecraftUsername: cleanUsername,
      items: [...items],
      totalInr,
      totalCoins,
      paymentMethod:
        paymentMode === 'sandbox'
          ? 'Test Gateway (Development Sandbox)'
          : paymentMode === 'upi_qr'
          ? 'UPI / Card Demo Sandbox'
          : 'In-Game Coins Wallet',
      paymentStatus: 'completed',
      deliveryStatus: 'queued',
      createdAt: new Date().toISOString(),
      commandsExecuted: commands,
      retryCount: 0,
      notes: discordTag ? `Discord: ${discordTag}` : undefined,
    };

    setTimeout(() => {
      setIsProcessing(false);
      sfx.playSuccess();
      setCompletedOrder(newOrder);
      onOrderCompleted(newOrder);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#1E120D] border-2 border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-white">
                Secure Minecraft Checkout
              </h3>
              <p className="text-xs text-[#C6B7A5]">CraftySMP Season 2 Dispatch</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout modal"
            className="p-1.5 rounded-lg bg-[#2A1A12] text-[#C6B7A5] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedOrder ? (
          /* Success Screen */
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-heading font-extrabold text-xl text-white">
                Order Confirmed & Queued!
              </h4>
              <p className="font-mono text-xs text-amber-400 mt-1">
                Order ID: {completedOrder.orderNumber}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#2A1A12] border border-amber-500/20 text-left text-xs space-y-2 text-[#C6B7A5]">
              <div className="flex justify-between">
                <span>Minecraft Player:</span>
                <strong className="text-white font-mono">{completedOrder.minecraftUsername}</strong>
              </div>
              <div className="flex justify-between">
                <span>Server Address:</span>
                <span className="text-amber-300 font-mono">{SERVER_CONFIG.serverAddress}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Status:</span>
                <span className="text-emerald-400 font-bold uppercase tracking-wider">
                  Dispatched to Delivery Queue
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#150c08] border border-amber-500/15 text-[11px] text-amber-200/90 text-left font-mono space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                <Terminal className="w-3.5 h-3.5" />
                <span>Commands Queued For Server:</span>
              </div>
              {completedOrder.commandsExecuted.map((cmd, idx) => (
                <div key={idx} className="text-[#C6B7A5] truncate">
                  &gt; {cmd}
                </div>
              ))}
            </div>

            <p className="text-xs text-[#C6B7A5]">
              Log onto <strong className="text-white">{SERVER_CONFIG.serverAddress}</strong>. Your items will be placed into your inventory or claim box automatically.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl font-heading font-bold text-sm text-[#1E120D] bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-110 transition-all"
            >
              RETURN TO STORE
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Minecraft Username (Required) */}
            <div>
              <label htmlFor="ign" className="block text-xs font-heading font-bold uppercase tracking-wider text-amber-300 mb-1.5">
                Minecraft Username (IGN) <span className="text-red-400">*</span>
              </label>
              <input
                id="ign"
                type="text"
                required
                value={minecraftUsername}
                onChange={(e) => setMinecraftUsername(e.target.value)}
                placeholder="e.g. Steve_Crafty"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2A1A12] border border-amber-500/30 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 font-mono"
              />
              <span className="text-[11px] text-[#C6B7A5] mt-1 block">
                Items will be delivered to this exact player name upon join.
              </span>
            </div>

            {/* Discord Username (Optional) */}
            <div>
              <label htmlFor="discord" className="block text-xs font-heading font-bold uppercase tracking-wider text-[#C6B7A5] mb-1.5">
                Discord Username (Optional for role sync)
              </label>
              <input
                id="discord"
                type="text"
                value={discordTag}
                onChange={(e) => setDiscordTag(e.target.value)}
                placeholder="e.g. player#1234 or crafty_user"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2A1A12] border border-amber-500/30 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Payment Method / Mode Notice */}
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-amber-300 mb-1.5">
                Payment & Authorization Mode
              </label>
              <div className="space-y-2">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-[#2A1A12] border border-amber-500/30 cursor-pointer hover:border-amber-400">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="sandbox"
                    checked={paymentMode === 'sandbox'}
                    onChange={() => setPaymentMode('sandbox')}
                    className="mt-1 accent-amber-500"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-white block">Instant Test Checkout (Development Sandbox)</span>
                    <span className="text-[#C6B7A5]">
                      Simulates instant backend webhook verification & queues server delivery commands immediately.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-[#2A1A12] border border-amber-500/30 cursor-pointer hover:border-amber-400">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="upi_qr"
                    checked={paymentMode === 'upi_qr'}
                    onChange={() => setPaymentMode('upi_qr')}
                    className="mt-1 accent-amber-500"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-white block">UPI / Card Gateway Simulation</span>
                    <span className="text-[#C6B7A5]">
                      Simulates Indian Payment Gateway flow with Razorpay/UPI test webhook verification.
                    </span>
                  </div>
                </label>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300/90 mt-2">
                <strong>PRD Notice:</strong> No live payment gateway credentials are hardcoded into the client. Purchases run via the verified delivery sandbox queue.
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-3.5 rounded-xl bg-[#2A1A12] border border-amber-500/20 text-xs space-y-1.5">
              <div className="font-heading font-bold text-white uppercase text-[11px] tracking-wider mb-2">
                Order Summary ({items.length} items)
              </div>
              {totalInr > 0 && (
                <div className="flex justify-between text-[#C6B7A5]">
                  <span>Total Real Amount:</span>
                  <span className="font-mono font-bold text-base text-amber-400">
                    {SERVER_CONFIG.currencies.inrSymbol}{totalInr}
                  </span>
                </div>
              )}
              {totalCoins > 0 && (
                <div className="flex justify-between text-[#C6B7A5]">
                  <span>Total In-Game Coins:</span>
                  <span className="font-mono font-bold text-base text-yellow-300">
                    {totalCoins.toLocaleString()} {SERVER_CONFIG.currencies.coinsSymbol}
                  </span>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 rounded-xl font-heading font-bold text-sm text-[#1E120D] bg-gradient-to-r from-[#FFD700] via-[#FF8C00] to-[#FF5722] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-orange-950/40 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>DISPATCHING ORDER TO SERVER...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>CONFIRM & QUEUE MINECRAFT DELIVERY</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
