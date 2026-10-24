import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SERVER_CONFIG, productImages } from '../../config/serverConfig';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'product';
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
  keywords?: string[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = `${SERVER_CONFIG.serverName} — Official Minecraft Server & Store`,
  description = 'Join CraftySMP Season 2 at CraftySmpseason2.pixelforge.gg. Explore legendary custom weapons, kits, exclusive ranks, live server status, and community Discord.',
  canonicalPath = '',
  ogImage = productImages.weaponShowcase,
  ogType = 'website',
  structuredData,
  keywords = [
    'CraftySMP',
    'CraftySMP Season 2',
    'Minecraft SMP',
    'Minecraft Server',
    'Custom Weapons',
    'Minecraft Kits',
    'Hyperion',
    'Minecraft Store',
    'PixelForge SMP',
  ],
}) => {
  // Resolve current origin safely in browser
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://CraftySmpseason2.pixelforge.gg';
  const canonicalUrl = `${origin}${canonicalPath ? (canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`) : ''}`;

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#FF8C00" />
      <link rel="canonical" href={canonicalUrl} />

      {/* OpenGraph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SERVER_CONFIG.serverName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
