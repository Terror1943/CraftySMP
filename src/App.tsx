import React, { useState, useEffect } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { MobileDrawer } from './components/navigation/MobileDrawer';
import { Footer } from './components/common/Footer';
import { BackgroundParticles } from './components/common/BackgroundParticles';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { ProductDetailModal } from './components/products/ProductDetailModal';

// Pages
import { HomePage } from './components/pages/HomePage';
import { StorePage } from './components/pages/StorePage';
import { RanksPage } from './components/pages/RanksPage';
import { StatusPage } from './components/pages/StatusPage';
import { AccountPage } from './components/pages/AccountPage';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Config & Data
import { SERVER_CONFIG } from './config/serverConfig';
import { INITIAL_PRODUCTS, INITIAL_RANKS } from './data/initialData';
import { useServerStatus } from './hooks/useServerStatus';
import { Product, CartItem, UserAccount, DeliveryOrder, RankApplication, ProductCategory } from './types';
import { sfx } from './utils/sound';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { SEOHead } from './components/seo/SEOHead';
import { SECTION_SEO, getProductStructuredData } from './config/seoConfig';
import { api } from './lib/api';
import { useAuth } from './context/AuthContext';



export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Server Status Hook
  const { status: serverStatus, refresh: refreshServerStatus } = useServerStatus();

  // Catalog State
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('craftysmp_catalog');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [ranks, setRanks] = useState(INITIAL_RANKS);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('craftysmp_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User & Orders State
  const [user, setUser] = useState<UserAccount>(() => {
    try {
      const saved = localStorage.getItem('craftysmp_user');
      return saved
        ? JSON.parse(saved)
        : {
            id: 'usr_default',
            username: 'Steve',
            minecraftUsername: '',
            discordTag: '',
            coinsBalance: 25000,
            role: 'player',
            orders: [],
            rankApplications: [],
          };
    } catch {
      return {
        id: 'usr_default',
        username: 'Steve',
        minecraftUsername: '',
        discordTag: '',
        coinsBalance: 25000,
        role: 'player',
        orders: [],
        rankApplications: [],
      };
    }
  });

  // Admin & Delivery Queue State
  const [deliveryOrders, setDeliveryOrders] = useState<DeliveryOrder[]>(() => {
    try {
      const saved = localStorage.getItem('craftysmp_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [rankApplications, setRankApplications] = useState<RankApplication[]>(() => {
    try {
      const saved = localStorage.getItem('craftysmp_applications');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Central config overrides
  const [serverAddress, setServerAddress] = useState(SERVER_CONFIG.serverAddress);
  const [discordInviteUrl, setDiscordInviteUrl] = useState(SERVER_CONFIG.discordInviteUrl);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const { user: authUser, idToken, signInWithGoogle, logOut } = useAuth();

  // Load persistent orders and rank applications from Cloud SQL backend
  useEffect(() => {
    api.getOrders().then((dbOrders) => {
      if (dbOrders && dbOrders.length > 0) {
        setDeliveryOrders(dbOrders);
      }
    });
    api.getRankApplications().then((dbApps) => {
      if (dbApps && dbApps.length > 0) {
        setRankApplications(dbApps);
      }
    });
  }, []);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('craftysmp_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('craftysmp_catalog', JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('craftysmp_user', JSON.stringify(user));
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('craftysmp_orders', JSON.stringify(deliveryOrders));
    } catch {}
  }, [deliveryOrders]);

  useEffect(() => {
    try {
      localStorage.setItem('craftysmp_applications', JSON.stringify(rankApplications));
    } catch {}
  }, [rankApplications]);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to cart!`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.product.id === productId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderCompleted = (order: DeliveryOrder) => {
    setDeliveryOrders((prev) => [order, ...prev]);
    setUser((prev) => ({
      ...prev,
      minecraftUsername: order.minecraftUsername,
      orders: [order, ...prev.orders],
    }));
    api.createOrder(order, idToken);
    setCart([]);
    setIsCartOpen(false);
    showToast(`Order ${order.orderNumber} dispatched to server delivery queue!`);
  };

  const handleApplyRank = (app: RankApplication) => {
    setRankApplications((prev) => [app, ...prev]);
    setUser((prev) => ({
      ...prev,
      minecraftUsername: app.minecraftUsername,
      discordTag: app.discordTag || prev.discordTag,
      rankApplications: [app, ...prev.rankApplications],
    }));
    api.createRankApplication(app);
    showToast(`Rank claim for ${app.rankName} submitted for review!`);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sfx.enabled = next;
    if (next) sfx.playClick();
  };

  const cartTotalCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  // Dynamic SEO meta tags per section & product preview via React Helmet
  const activeSectionSEO = SECTION_SEO[activeTab] || SECTION_SEO.home;
  const currentSEO = selectedProductForModal
    ? {
        title: `${selectedProductForModal.name} (${selectedProductForModal.currency === 'INR' ? '₹' + selectedProductForModal.price : selectedProductForModal.price.toLocaleString() + ' Coins'}) — ${SERVER_CONFIG.serverName}`,
        description: `${selectedProductForModal.name}: ${selectedProductForModal.description} Instant automated delivery to ${serverAddress}.`,
        canonicalPath: `/${selectedProductForModal.category}?item=${selectedProductForModal.id}`,
        ogImage: selectedProductForModal.image,
        ogType: 'product' as const,
        structuredData: getProductStructuredData(selectedProductForModal),
        keywords: [
          selectedProductForModal.name,
          selectedProductForModal.category,
          'CraftySMP store',
          'Minecraft custom gear',
        ],
      }
    : activeSectionSEO;

  return (
    <div className="min-h-screen bg-[#1E120D] text-[#FFF8E7] flex flex-col relative selection:bg-amber-500 selection:text-black">
      {/* Dynamic React Helmet Meta & Structured Data */}
      <SEOHead
        title={currentSEO.title}
        description={currentSEO.description}
        canonicalPath={currentSEO.canonicalPath}
        ogImage={currentSEO.ogImage}
        ogType={currentSEO.ogType as 'website' | 'product'}
        structuredData={currentSEO.structuredData}
        keywords={currentSEO.keywords}
      />

      {/* 1. Animated Initial Loading Screen */}
      {initialLoading && (
        <LoadingScreen onComplete={() => setInitialLoading(false)} />
      )}

      {/* 2. Floating Fire Ember Particles */}
      <BackgroundParticles />

      {/* 3. Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        serverStatus={serverStatus}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* 4. Main Page View */}
      <main className="flex-1 relative z-10">
        {activeTab === 'home' && (
          <HomePage
            serverStatus={serverStatus}
            onRefreshServerStatus={refreshServerStatus}
            featuredProducts={products}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
            onViewDetails={(prod) => setSelectedProductForModal(prod)}
          />
        )}

        {/* Weapons Store */}
        {activeTab === 'weapons' && (
          <StorePage
            products={products}
            initialCategory="custom-weapons"
            onAddToCart={handleAddToCart}
            onViewDetails={(prod) => setSelectedProductForModal(prod)}
          />
        )}

        {/* Kits Store */}
        {activeTab === 'kits' && (
          <StorePage
            products={products}
            initialCategory="kits-inr"
            onAddToCart={handleAddToCart}
            onViewDetails={(prod) => setSelectedProductForModal(prod)}
          />
        )}

        {/* Coins Store */}
        {activeTab === 'coins' && (
          <StorePage
            products={products}
            initialCategory="coins"
            onAddToCart={handleAddToCart}
            onViewDetails={(prod) => setSelectedProductForModal(prod)}
          />
        )}

        {/* Specials Store */}
        {activeTab === 'specials' && (
          <StorePage
            products={products}
            initialCategory="special-items"
            onAddToCart={handleAddToCart}
            onViewDetails={(prod) => setSelectedProductForModal(prod)}
          />
        )}

        {/* Ranks Page */}
        {activeTab === 'ranks' && (
          <RanksPage
            ranks={ranks}
            onApplyRank={handleApplyRank}
            currentUserMinecraftName={user.minecraftUsername}
            currentUserDiscordTag={user.discordTag}
          />
        )}

        {/* Status Page */}
        {activeTab === 'status' && (
          <StatusPage
            status={serverStatus}
            onRefresh={refreshServerStatus}
          />
        )}

        {/* User Account & History */}
        {activeTab === 'account' && (
          <AccountPage
            user={user}
            onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
          />
        )}

        {/* Protected Admin Dashboard */}
        {activeTab === 'admin' && (
          <AdminDashboard
            products={products}
            onUpdateProduct={(updated) => {
              setProducts((prev) =>
                prev.map((p) => (p.id === updated.id ? updated : p))
              );
              showToast(`Updated product ${updated.name}`);
            }}
            onAddProduct={(newProd) => {
              setProducts((prev) => [newProd, ...prev]);
              showToast(`Added new product ${newProd.name}`);
            }}
            applications={rankApplications}
            onUpdateApplicationStatus={(appId, status, notes) => {
              setRankApplications((prev) =>
                prev.map((a) => (a.id === appId ? { ...a, status, adminNotes: notes } : a))
              );
              api.updateRankApplicationStatus(appId, status, notes);
              showToast(`Application marked as ${status}`);
            }}
            deliveryOrders={deliveryOrders}
            onUpdateOrderStatus={(orderId, status) => {
              setDeliveryOrders((prev) =>
                prev.map((o) => (o.id === orderId ? { ...o, deliveryStatus: status } : o))
              );
              const found = deliveryOrders.find((o) => o.id === orderId);
              if (found) {
                api.updateOrderStatus(found.orderNumber, status);
              }
              showToast(`Order delivery status set to ${status}`);
            }}
            serverAddress={serverAddress}
            onUpdateServerAddress={setServerAddress}
            discordInviteUrl={discordInviteUrl}
            onUpdateDiscordInviteUrl={setDiscordInviteUrl}
          />
        )}
      </main>

      {/* 5. Footer */}
      <Footer
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 6. Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* 7. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderCompleted={handleOrderCompleted}
        defaultMinecraftUsername={user.minecraftUsername}
        defaultDiscordTag={user.discordTag}
      />

      {/* 8. Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={(prod) => {
          handleAddToCart(prod);
          setSelectedProductForModal(null);
        }}
      />

      {/* 9. Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        serverStatus={serverStatus}
      />

      {/* 10. Transient Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#2A1A12] border-2 border-amber-500/50 text-white text-xs font-semibold shadow-2xl shadow-black/80 animate-slideUp">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
