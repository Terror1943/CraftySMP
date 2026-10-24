import { SERVER_CONFIG, productImages } from './serverConfig';
import { Product } from '../types';

export interface SEOConfigItem {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage: string;
  ogType?: 'website' | 'product';
  keywords: string[];
  structuredData?: Record<string, unknown>;
}

export const SECTION_SEO: Record<string, SEOConfigItem> = {
  home: {
    title: 'CraftySMP Season 2 — Official Minecraft Server & Store',
    description:
      'Join CraftySMP Season 2 at CraftySmpseason2.pixelforge.gg. Explore custom weapons, kits, exclusive ranks, live server status, and community Discord.',
    canonicalPath: '/',
    ogImage: productImages.weaponShowcase,
    keywords: [
      'CraftySMP Season 2',
      'CraftySMP store',
      'Minecraft SMP IP',
      'CraftySmpseason2.pixelforge.gg',
      'custom weapons SMP',
      'Minecraft kits',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://CraftySmpseason2.pixelforge.gg/#website',
          url: 'https://CraftySmpseason2.pixelforge.gg',
          name: SERVER_CONFIG.serverName,
          description: SERVER_CONFIG.brandSlogan,
          inLanguage: 'en-US',
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How do I join the CraftySMP Season 2 Minecraft server?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: `Open Minecraft Java Edition 1.20+, click Multiplayer > Add Server, and connect to ${SERVER_CONFIG.serverAddress}.`,
              },
            },
            {
              '@type': 'Question',
              name: 'How does digital store delivery work in Minecraft?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Provide your Minecraft Username at checkout. Purchases are queued and instantly dispatched to your player inventory when online.',
              },
            },
          ],
        },
      ],
    },
  },
  weapons: {
    title: 'Custom & Legendary Weapons Armory — CraftySMP Season 2',
    description:
      'Discover 29+ legendary Minecraft weapons including the Hyperion, Sonic Crossbow, Frost Scythe, Titan Blade, and Wither Hammer with custom abilities.',
    canonicalPath: '/weapons',
    ogImage: productImages.weaponShowcase,
    keywords: [
      'Minecraft custom weapons',
      'Hyperion Minecraft SMP',
      'Sonic Crossbow',
      'Frost Scythe',
      'Titan Blade',
      'Wither Hammer',
      'CraftySMP weapons',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'CraftySMP Season 2 Custom Weapons Armory',
      description: 'Custom weapons with unique abilities, projectile bursts, and combat enchantments.',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Hyperion',
          description: 'Teleports 10 blocks forward causing an implosion and absorption shield.',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Sonic Crossbow',
          description: 'Fires high-frequency Warden sonic shrieks that bypass standard armor.',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Wither Hammer',
          description: 'Heavy warhammer that inflicts Wither Decay shockwaves on ground slam.',
        },
      ],
    },
  },
  kits: {
    title: 'Combat & Survival Kits — CraftySMP Season 2 Store',
    description:
      'Equip yourself with instant starter and endgame bundles: Noob Kit, Pro Kit, Ore Kit, Redstone Kit, Enchanting Kit, and Ultimate Netherite Maxed Kit.',
    canonicalPath: '/kits',
    ogImage: productImages.kits.ultimateNetherite,
    keywords: [
      'Minecraft kits',
      'Ultimate Netherite Kit',
      'Enchanting Kit',
      'Pro Kit Minecraft',
      'CraftySMP kits',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'CraftySMP Combat & Survival Kits',
      description: 'Survival and PvP kit supplies redeemable with INR and in-game SMP Coins.',
    },
  },
  ranks: {
    title: 'Server Ranks & Prestiges — VIP, Media & Luxury Claims',
    description:
      'Earn status and exclusive privileges on CraftySMP Season 2. Claim VIP, Ultimate VIP, Luxury, Media, and SkullCrusher ranks with daily kits and perks.',
    canonicalPath: '/ranks',
    ogImage: productImages.ranks.luxury,
    keywords: [
      'Minecraft SMP ranks',
      'VIP rank Minecraft',
      'Media rank application',
      'SkullCrusher rank',
      'CraftySMP ranks',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'CraftySMP Server Ranks',
      description: 'VIP, Ultimate VIP, Luxury, Media, Member, and SkullCrusher rank prestiges.',
    },
  },
  coins: {
    title: 'SMP Coins Economy Packs — CraftySMP Season 2 Store',
    description:
      'Deposit in-game SMP Coins directly into your player wallet. Packages range from 25K to 20 Million SMP Coins with automated server delivery.',
    canonicalPath: '/coins',
    ogImage: productImages.weaponShowcase,
    keywords: [
      'SMP Coins',
      'Minecraft economy',
      'buy Minecraft coins',
      'CraftySMP coins',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'CraftySMP Coin Packages',
      description: 'Official server currency packages for auction house and player trade.',
    },
  },
  specials: {
    title: 'Special Artifacts & Enchanted Books — CraftySMP Season 2',
    description:
      'Acquire rare books including Mending, Thorns III, Infinity, and Sharpness V, plus pristine Elytras and Nether Stars for your base.',
    canonicalPath: '/specials',
    ogImage: productImages.kits.enchanting,
    keywords: [
      'Minecraft Mending book',
      'Minecraft Elytra',
      'Nether Star',
      'Thorns III',
      'CraftySMP special items',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'CraftySMP Special Items & Enchantments',
      description: 'Rare artifacts and master tier enchanted books.',
    },
  },
  status: {
    title: 'Live Minecraft Server Status & Ping — CraftySMP Season 2',
    description:
      'Check real-time server status, online player count, latency, and Minecraft version for CraftySmpseason2.pixelforge.gg.',
    canonicalPath: '/status',
    ogImage: productImages.weaponShowcase,
    keywords: [
      'CraftySMP server status',
      'CraftySmpseason2.pixelforge.gg status',
      'Minecraft server player count',
      'CraftySMP ping',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Live Minecraft Server Status',
      description: `Current connection state, player counts, and address telemetry for ${SERVER_CONFIG.serverAddress}.`,
    },
  },
  account: {
    title: 'Player Profile & Arsenal Dispatch — CraftySMP Season 2',
    description:
      'Manage your linked Minecraft username, inspect store purchase receipts, and track real-time server command deliveries.',
    canonicalPath: '/account',
    ogImage: productImages.weaponShowcase,
    keywords: ['CraftySMP account', 'Minecraft player orders', 'order delivery status'],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Player Profile & Orders',
    },
  },
  admin: {
    title: 'Staff Security Portal & Delivery Queue — CraftySMP Season 2',
    description:
      'Administrator management console for CraftySMP Season 2 catalog, rank verification claims, and server delivery queue.',
    canonicalPath: '/admin',
    ogImage: productImages.weaponShowcase,
    keywords: ['CraftySMP admin', 'staff portal', 'delivery queue'],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Staff Security Portal',
    },
  },
};

/**
 * Generate dynamic Schema.org Product JSON-LD metadata for a selected item
 */
export function getProductStructuredData(product: Product): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    category: product.category,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency === 'INR' ? 'INR' : 'XXX',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: SERVER_CONFIG.serverName,
      },
    },
  };
}
