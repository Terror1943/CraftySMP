import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Package, 
  Terminal, 
  Award, 
  Settings, 
  Image as ImageIcon, 
  Check, 
  X, 
  AlertTriangle, 
  Lock, 
  Unlock, 
  Edit3, 
  Save, 
  Plus, 
  RefreshCw,
  Database
} from 'lucide-react';
import { Product, RankApplication, DeliveryOrder } from '../../types';
import { SERVER_CONFIG } from '../../config/serverConfig';
import { ProductImage } from '../common/ProductImage';
import { sfx } from '../../utils/sound';

interface AdminDashboardProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  applications: RankApplication[];
  onUpdateApplicationStatus: (appId: string, status: 'approved' | 'rejected', notes?: string) => void;
  deliveryOrders: DeliveryOrder[];
  onUpdateOrderStatus: (orderId: string, status: 'queued' | 'delivering' | 'delivered' | 'failed') => void;
  serverAddress: string;
  onUpdateServerAddress: (addr: string) => void;
  discordInviteUrl: string;
  onUpdateDiscordInviteUrl: (url: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onUpdateProduct,
  onAddProduct,
  applications,
  onUpdateApplicationStatus,
  deliveryOrders,
  onUpdateOrderStatus,
  serverAddress,
  onUpdateServerAddress,
  discordInviteUrl,
  onUpdateDiscordInviteUrl,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'catalog' | 'queue' | 'ranks' | 'config' | 'images'>('catalog');

  // Edit Product State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Server config local edits
  const [tempAddress, setTempAddress] = useState(serverAddress);
  const [tempDiscord, setTempDiscord] = useState(discordInviteUrl);
  const [configSaved, setConfigSaved] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'crafty2026' || passcode.trim() === 'admin') {
      sfx.playSuccess();
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid administrator passkey. Use default demo key: "crafty2026"');
    }
  };

  const handleQuickUnlock = () => {
    sfx.playSuccess();
    setPasscode('crafty2026');
    setIsAuthenticated(true);
    setAuthError('');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      sfx.playSuccess();
      onUpdateProduct(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playSuccess();
    onUpdateServerAddress(tempAddress.trim());
    onUpdateDiscordInviteUrl(tempDiscord.trim());
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 2500);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#2A1A12] border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto shadow-lg">
          <Lock className="w-8 h-8" />
        </div>
        <div>
          <h1 className="font-heading font-black text-2xl text-white">
            ADMINISTRATOR SECURITY PORTAL
          </h1>
          <p className="text-xs text-[#C6B7A5] mt-1">
            Protected operational dashboard for catalog, images, commands, and ranks.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3 p-6 rounded-2xl bg-[#2A1A12] border border-amber-500/25 text-left">
          {authError && (
            <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-amber-300 mb-1">
              Admin Passkey
            </label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1E120D] border border-amber-500/30 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-[#1E120D] bg-amber-400 hover:bg-amber-300 transition-colors"
          >
            AUTHORIZE & ENTER
          </button>

          <button
            type="button"
            onClick={handleQuickUnlock}
            className="w-full py-2 rounded-xl text-[11px] font-mono text-stone-400 hover:text-amber-300 border border-amber-500/10 hover:border-amber-500/30"
          >
            Click here for 1-Click Demo Unlock (crafty2026)
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner with Alert Notice from PRD Section 20-B */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-[#2A1A12] border-2 border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="font-heading font-bold text-xs uppercase tracking-wider text-amber-400 block">
              PRD Section 20-B Catalog Audit Notice
            </span>
            <p className="text-xs text-[#FFF8E7] mt-0.5 leading-relaxed">
              {SERVER_CONFIG.catalogDiscrepancyNotice.message}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">Firebase Firestore: round-backup-hlcf1</span>
          </div>
          <button
            type="button"
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1.5 rounded-lg bg-[#382217] text-xs font-semibold text-stone-300 hover:text-white shrink-0"
          >
            Lock Console
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-2 border-b border-amber-500/20 pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('catalog')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
            activeTab === 'catalog'
              ? 'bg-amber-400 text-black shadow-md'
              : 'text-[#C6B7A5] hover:text-white bg-[#2A1A12]'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Product Catalog & Prices</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('queue')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
            activeTab === 'queue'
              ? 'bg-amber-400 text-black shadow-md'
              : 'text-[#C6B7A5] hover:text-white bg-[#2A1A12]'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Minecraft Delivery Queue ({deliveryOrders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ranks')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
            activeTab === 'ranks'
              ? 'bg-amber-400 text-black shadow-md'
              : 'text-[#C6B7A5] hover:text-white bg-[#2A1A12]'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Rank Applications ({applications.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('config')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
            activeTab === 'config'
              ? 'bg-amber-400 text-black shadow-md'
              : 'text-[#C6B7A5] hover:text-white bg-[#2A1A12]'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Server & Discord Config</span>
        </button>
      </div>

      {/* Tab 1: Product Catalog Management */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-lg text-white">
              Inventory & Price Management ({products.length} Products)
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl bg-[#2A1A12] border border-amber-500/20">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1E120D] text-amber-400 font-heading uppercase tracking-wider text-[11px] border-b border-amber-500/20">
                <tr>
                  <th className="p-3.5">Asset</th>
                  <th className="p-3.5">Product Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Currency</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-500/10 text-[#FFF8E7]">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#382217]/40 transition-colors">
                    <td className="p-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#1E120D] border border-amber-500/20">
                        <ProductImage src={p.image} alt={p.name} allowEnlarge={false} className="w-full h-full" />
                      </div>
                    </td>
                    <td className="p-3 font-semibold text-white">
                      <div>{p.name}</div>
                      <div className="text-[10px] text-stone-400 font-mono">{p.id}</div>
                    </td>
                    <td className="p-3 text-stone-300 uppercase text-[11px] font-mono">
                      {p.category}
                    </td>
                    <td className="p-3 font-mono font-bold text-amber-400 text-sm">
                      {p.currency === 'INR' ? `₹${p.price}` : `${p.price.toLocaleString()} Coins`}
                    </td>
                    <td className="p-3 text-stone-400 font-mono">{p.currency}</td>
                    <td className="p-3 text-right">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(p)}
                        className="px-3 py-1 rounded-lg bg-[#382217] text-amber-300 hover:bg-amber-500 hover:text-black font-semibold transition-colors flex items-center gap-1.5 ml-auto"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Minecraft Delivery Queue */}
      {activeTab === 'queue' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-lg text-white">
                Automated Minecraft Delivery Queue
              </h2>
              <p className="text-xs text-[#C6B7A5]">
                Dispatches player rewards to <strong>{serverAddress}</strong> via RCON/plugin API.
              </p>
            </div>
          </div>

          {deliveryOrders.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-[#2A1A12] border border-amber-500/20 text-[#C6B7A5] text-xs">
              No delivery orders in queue yet. Orders placed through checkout appear here immediately.
            </div>
          ) : (
            <div className="space-y-3">
              {deliveryOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-xl bg-[#2A1A12] border border-amber-500/20 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/10 pb-2">
                    <div className="flex items-center gap-2">
                      <strong className="text-white font-mono">{order.orderNumber}</strong>
                      <span className="text-stone-400">·</span>
                      <span className="text-amber-300 font-mono">Player: {order.minecraftUsername}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold uppercase">
                        {order.deliveryStatus}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateOrderStatus(order.id, 'delivered')}
                        className="px-2.5 py-1 rounded bg-[#382217] text-xs text-amber-300 hover:bg-emerald-600 hover:text-white"
                      >
                        Mark Delivered
                      </button>
                      <button
                        type="button"
                        onClick={() => onUpdateOrderStatus(order.id, 'delivering')}
                        className="px-2.5 py-1 rounded bg-[#382217] text-xs text-stone-300 hover:bg-amber-600 hover:text-black"
                      >
                        Retry Dispatch
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#1E120D] p-3 rounded-lg border border-amber-500/15 font-mono text-xs space-y-1">
                    <span className="text-stone-400 text-[10px] uppercase block">Commands to Execute on Server:</span>
                    {order.commandsExecuted.map((cmd, i) => (
                      <div key={i} className="text-amber-300 truncate">
                        &gt; {cmd}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Rank Applications */}
      {activeTab === 'ranks' && (
        <div className="space-y-6">
          <h2 className="font-heading font-bold text-lg text-white">
            Player Rank Claims & Proof Submissions
          </h2>

          {applications.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-[#2A1A12] border border-amber-500/20 text-[#C6B7A5] text-xs">
              No pending rank verification applications.
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl bg-[#2A1A12] border border-amber-500/25 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-white text-base">
                        {app.rankName} Rank Application
                      </h4>
                      <span className="text-xs text-[#C6B7A5] font-mono">
                        IGN: <strong className="text-amber-300">{app.minecraftUsername}</strong> | Discord: {app.discordTag}
                      </span>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
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

                  {app.evidenceUrl && (
                    <div className="text-xs">
                      <span className="text-stone-400 mr-2">Evidence URL:</span>
                      <a
                        href={app.evidenceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 underline break-all font-mono"
                      >
                        {app.evidenceUrl}
                      </a>
                    </div>
                  )}

                  {app.notes && (
                    <p className="text-xs text-[#FFF8E7] bg-[#1E120D] p-2.5 rounded-lg border border-amber-500/10">
                      &quot;{app.notes}&quot;
                    </p>
                  )}

                  {app.status === 'pending' && (
                    <div className="flex items-center gap-2 pt-2 border-t border-amber-500/15">
                      <button
                        type="button"
                        onClick={() => onUpdateApplicationStatus(app.id, 'approved')}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase"
                      >
                        Approve & Grant Rank
                      </button>
                      <button
                        type="button"
                        onClick={() => onUpdateApplicationStatus(app.id, 'rejected')}
                        className="px-4 py-1.5 rounded-lg bg-red-800 hover:bg-red-700 text-white font-heading font-bold text-xs uppercase"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Server & Discord Configuration */}
      {activeTab === 'config' && (
        <form onSubmit={handleSaveConfig} className="max-w-xl space-y-4 p-6 rounded-2xl bg-[#2A1A12] border border-amber-500/25">
          <h2 className="font-heading font-bold text-lg text-white">
            Server & Social Link Settings
          </h2>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-amber-300 mb-1">
              Minecraft Server Address (Public IP)
            </label>
            <input
              type="text"
              value={tempAddress}
              onChange={(e) => setTempAddress(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#1E120D] border border-amber-500/30 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-amber-300 mb-1">
              Discord Invitation URL
            </label>
            <input
              type="url"
              value={tempDiscord}
              onChange={(e) => setTempDiscord(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#1E120D] border border-amber-500/30 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            className="py-2.5 px-6 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-[#1E120D] bg-amber-400 hover:bg-amber-300 transition-colors"
          >
            SAVE CONFIGURATION
          </button>

          {configSaved && (
            <span className="text-xs text-emerald-400 block font-semibold">
              Server settings updated across entire portal!
            </span>
          )}
        </form>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setEditingProduct(null)}
        >
          <div
            className="relative w-full max-w-lg bg-[#1E120D] border-2 border-amber-500/40 rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-4">
              <h3 className="font-heading font-extrabold text-lg text-white">
                Edit Product: {editingProduct.name}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="p-1 rounded bg-[#2A1A12] text-[#C6B7A5] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-amber-300 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#2A1A12] border border-amber-500/30 text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-amber-300 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#2A1A12] border border-amber-500/30 text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-amber-300 mb-1">
                    Currency
                  </label>
                  <select
                    value={editingProduct.currency}
                    onChange={(e) => setEditingProduct({ ...editingProduct, currency: e.target.value as 'INR' | 'COINS' })}
                    className="w-full px-3 py-2 rounded-xl bg-[#2A1A12] border border-amber-500/30 text-white text-sm"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="COINS">Coins (🪙)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-amber-300 mb-1">
                  Image URL / Asset Reference
                </label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#2A1A12] border border-amber-500/30 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-amber-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#2A1A12] border border-amber-500/30 text-white text-xs"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#382217] text-xs font-semibold text-[#C6B7A5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300"
                >
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
