import React, { useState } from 'react';
import { 
  Sword, 
  Shield, 
  Coins, 
  Award, 
  Sparkles, 
  ArrowRight, 
  ChevronDown, 
  Zap, 
  Flame, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { Product, ServerStatus } from '../../types';
import { ProductCard } from '../products/ProductCard';
import { ProductImage } from '../common/ProductImage';
import { ServerStatusCard } from '../common/ServerStatusCard';
import { CopyIpButton } from '../common/CopyIpButton';
import { DiscordButton } from '../common/DiscordButton';
import { SERVER_CONFIG, productImages } from '../../config/serverConfig';
import { sfx } from '../../utils/sound';

interface HomePageProps {
  serverStatus: ServerStatus;
  onRefreshServerStatus: () => void;
  featuredProducts: Product[];
  onNavigateTab: (tab: string) => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  serverStatus,
  onRefreshServerStatus,
  featuredProducts,
  onNavigateTab,
  onAddToCart,
  onViewDetails,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    sfx.playClick();
    setOpenFaq(openFaq === index ? null : index);
  };

  const categories = [
    {
      id: 'weapons',
      title: 'Custom & Legendary Weapons',
      desc: '30+ Custom abilities, Warden sonic crossbolts & the Hyperion.',
      icon: Sword,
      badge: 'Tier I - Supreme',
    },
    {
      id: 'kits',
      title: 'Combat & Survival Kits',
      desc: 'Instant supply bundles from starter Noob packs to Maxed Netherite.',
      icon: Shield,
      badge: 'INR & Coins',
    },
    {
      id: 'ranks',
      title: 'VIP, Media & Prestiges',
      desc: 'Fly commands, multiple homes, vanity prefixes, and custom perks.',
      icon: Award,
      badge: 'Status & Power',
    },
    {
      id: 'coins',
      title: 'SMP Coins Economy',
      desc: 'In-game wealth packs ranging from 25K to 20 Million SMP Coins.',
      icon: Coins,
      badge: 'Economy',
    },
    {
      id: 'specials',
      title: 'Artifacts & Enchants',
      desc: 'Mending, Thorns III, Elytras, Nether Stars & rare mob drops.',
      icon: Sparkles,
      badge: 'Rare Loot',
    },
  ];

  const faqs = [
    {
      q: 'How do I join the CraftySMP Season 2 Minecraft server?',
      a: `Open your Minecraft client (Java edition 1.20+), navigate to Multiplayer > Add Server, and input "${SERVER_CONFIG.serverAddress}". Connect directly and begin your journey!`,
    },
    {
      q: 'How does store item delivery work?',
      a: 'After checkout, our automated dispatch queue links directly with the Minecraft server. Provide your exact Minecraft in-game name (IGN). When you are online on the server, your items, coins, or kits are deposited into your inventory immediately.',
    },
    {
      q: 'What is the difference between INR and SMP Coins?',
      a: 'Real Currency (INR ₹) allows you to purchase store products and coin packages directly. SMP Coins are the in-game currency earned through trading, farming, quests, or coin bundles, which can be spent on Coin Kit editions in-game.',
    },
    {
      q: 'How do I apply for the Media or SkullCrusher rank?',
      a: 'Visit our Ranks page and click "Apply/Claim". Submit your Minecraft IGN along with a proof URL (5,000+ views for Media, or 25+ PvP kills for SkullCrusher). Our staff team reviews submissions promptly via Discord.',
    },
    {
      q: 'Can I replace or upload my own weapon & rank images?',
      a: 'Yes! Server administrators can update image URLs or upload custom assets directly through the protected Admin Dashboard.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Announcement Bar */}
      <div className="bg-gradient-to-r from-[#D7261E] via-[#FF5722] to-[#FF8C00] text-black px-4 py-2 text-xs sm:text-sm font-heading font-extrabold shadow-md flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <Flame className="w-4 h-4 fill-black animate-fire" />
          <span>🔥 CRAFTYSMP SEASON 2 IS LIVE — YOUR LEGEND STARTS HERE!</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <CopyIpButton variant="pill" showAddress={false} className="bg-black/80 text-amber-300 border-none hover:bg-black" />
          <DiscordButton variant="compact" label="Discord" className="bg-black text-amber-300 hover:text-white" />
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12">
        <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-b from-[#2A1A12] via-[#20130d] to-[#1E120D] border-2 border-amber-500/30 p-6 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl mc-grid-pattern">
          {/* Ambient lava lights */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Quiet kicker */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-heading font-bold text-amber-400 tracking-wider uppercase">
                <Sparkles className="w-4 h-4" />
                <span>The Premier Minecraft SMP Experience</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase text-balance leading-none">
                CRAFTYSMP <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF8C00] to-[#FF5722]">
                  SEASON 2
                </span>
              </h1>

              {/* Subtitles */}
              <p className="font-heading font-bold text-lg sm:text-xl text-amber-200/90 tracking-wide">
                {SERVER_CONFIG.brandSlogan}
              </p>

              <p className="text-sm sm:text-base text-[#C6B7A5] max-w-xl leading-relaxed">
                Discover legendary custom weapons, powerful kits, exclusive ranks, and an economy built for players who want to rise above the ordinary.
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    sfx.playClick();
                    onNavigateTab('weapons');
                  }}
                  className="px-6 py-3.5 rounded-xl font-heading font-black text-sm uppercase tracking-wider text-[#1E120D] bg-gradient-to-r from-[#FFD700] via-[#FF8C00] to-[#FF5722] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-orange-950/40 flex items-center gap-2"
                >
                  <span>EXPLORE THE STORE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <CopyIpButton variant="hero" />

                <DiscordButton variant="secondary" label="JOIN DISCORD" className="py-3.5 px-5 text-sm" />
              </div>
            </div>

            {/* Right Column: Hero Visual Asset Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden border-2 border-amber-500/40 bg-[#1E120D] p-3 shadow-2xl group">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#2A1A12]">
                  <ProductImage
                    src={productImages.weaponShowcase}
                    alt="CraftySMP Season 2 Weapon Showcase"
                    fit="cover"
                    aspectRatio="video"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-amber-400">
                      Season 2 Official Arsenal
                    </span>
                    <h3 className="font-heading font-black text-lg text-white">
                      Custom Weapons & Legendary Gear
                    </h3>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-[#C6B7A5] px-1 font-mono">
                  <span>Server Address:</span>
                  <span className="text-amber-300 font-bold">{SERVER_CONFIG.serverAddress}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Live Minecraft Server Status Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-amber-400">
              Real-Time Server Connection
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight mt-1">
              LIVE MINECRAFT SERVER STATUS
            </h2>
          </div>
          <p className="text-xs text-[#C6B7A5] max-w-sm">
            Automatic background status updates from public MCSrvStat probe. Connect directly with your client.
          </p>
        </div>

        <ServerStatusCard status={serverStatus} onRefresh={onRefreshServerStatus} />
      </section>

      {/* 4. Featured Weapons Showcase Banner (PRD Section 20-A) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#2A1A12] via-[#331c12] to-[#2A1A12] border border-amber-500/30 p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-heading font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5" />
                <span>Original Weapon Showcase</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
                FORGE YOUR WEAPON. UNLEASH THE FURY.
              </h2>
              <p className="text-sm text-[#C6B7A5] leading-relaxed">
                From the void-tearing <strong>Hyperion</strong> to the piercing <strong>Sonic Crossbow</strong> and glacial <strong>Frost Scythe</strong>, every weapon in CraftySMP Season 2 features bespoke animations, audio triggers, and combat abilities.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    sfx.playClick();
                    onNavigateTab('weapons');
                  }}
                  className="px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-[#1E120D] bg-amber-400 hover:bg-amber-300 transition-colors"
                >
                  VIEW ALL 29+ WEAPONS
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-[#1E120D] shadow-xl">
                <ProductImage
                  src={productImages.weaponShowcase}
                  alt="Verified CraftySMP Custom Weapon Showcase"
                  fit="contain"
                  aspectRatio="video"
                  className="w-full h-64 sm:h-72"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-heading font-bold uppercase tracking-widest text-amber-400">
            SMP Categories
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
            EXPLORE THE STORE DEPARTMENTS
          </h2>
          <p className="text-xs sm:text-sm text-[#C6B7A5]">
            Browse our full armory, support packages, and server privileges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  sfx.playClick();
                  onNavigateTab(cat.id);
                }}
                className="group p-5 rounded-2xl bg-[#2A1A12] border border-amber-500/25 hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(255,140,0,0.2)] cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-[#382217] text-amber-400 border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">
                      {cat.badge}
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-white group-hover:text-amber-300 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#C6B7A5] mt-1.5 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-amber-500/15 flex items-center justify-between text-xs font-heading font-bold text-amber-400 group-hover:text-amber-300">
                  <span>BROWSE COLLECTION</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-amber-400">
              Season 2 Bestsellers
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight mt-1">
              FEATURED ARSENAL & KITS
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              sfx.playClick();
              onNavigateTab('weapons');
            }}
            className="text-xs font-heading font-bold uppercase tracking-wider text-amber-400 hover:text-white flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </section>

      {/* 7. Community Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#2A1A12] via-[#24150e] to-[#1E120D] border-2 border-amber-500/30 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white uppercase">
              JOIN THE CRAFTYSMP COMMUNITY
            </h2>
            <p className="text-sm text-[#C6B7A5] leading-relaxed">
              Meet other players, discover updates, explore new weapons, and be part of CraftySMP Season 2. Stay connected with server announcements and staff assistance.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <DiscordButton variant="primary" label="JOIN OUR DISCORD" className="py-3 px-6 text-sm" />
              <CopyIpButton variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 space-y-2">
          <span className="text-xs font-heading font-bold uppercase tracking-widest text-amber-400">
            Answers & Help
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#2A1A12] border border-amber-500/25 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-white hover:text-amber-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#C6B7A5] leading-relaxed border-t border-amber-500/10">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
