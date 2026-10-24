# 🔥 CraftySMP Season 2 — Store & Server Portal

Official portal and e-commerce store for **CraftySMP Season 2**. Built with React, TypeScript, and modern responsive design.

---

## ⚔️ Server Information

- **Server Name:** CraftySMP Season 2
- **Minecraft Server Address:** `CraftySmpseason2.pixelforge.gg`
- **Discord Invitation:** `https://discord.gg/BVc7CGMzg`
- **Theme Palette:** Yellow (`#FFD700`), Gold (`#FFC107`), Orange (`#FF8C00`), Fiery Red (`#D7261E`), Dark Brown (`#1E120D`)
- **Brand Slogan:** *FORGE YOUR LEGEND. MASTER YOUR POWER.*
- **Secondary Slogan:** *YOUR ADVENTURE. YOUR WEAPONS. YOUR LEGACY.*

---

## 🛠️ Features & Architecture

1. **Central Configuration (`src/config/serverConfig.ts`):**
   - Single source of truth for the server IP, Discord URL, MCSrvStat API endpoint, delivery command templates, and product image mappings.
   - Easily update server properties without touching multiple components.

2. **Full Catalog & Verified Assets:**
   - **Custom Weapons:** Sonic Crossbow, Auto Bow, Wither Hammer, Titan Blade, Dragon Blade, Doom Hammer, Eagle Scythe, Wings, Fire Blade.
   - **Legendary Weapons:** Hyperion, Sultan's Crossbow, Frost Scythe, Nightpiercer, Copper Pickaxe, Paladin Axe, Eclipse, Cutlass, Echo, Windweaver, Shadow Blade, Pure Blade, Pale Cannon, Bone Blade, Wand of Illusion, Bloodlust, Vulcan's Crossbow, Mindweaver, Earth Gauntlet, Wither Reaper.
   - **Kits (Real INR & In-Game Coins):** Noob Kit, Pro Kit, Ore Kit, Enchanting Kit, Redstone Kit, Totem Kit, Basic Meth Kit, Ultimate Neth Maxed Kit.
   - **Coin Packages:** 25K up to 20 Million SMP Coins.
   - **Special Items:** Thorns III, Mending, Infinity, Elytra, Sharpness V, Power V, Fortune, Looting III, Wither Skull, Nether Star.
   - **Ranks & Proof Claims:** Media, VIP, Ultimate VIP, Luxury, Member, Admin, SkullCrusher.

3. **Live Minecraft Server Status:**
   - Real-time polling via public MCSrvStat API.
   - Displays online/offline status, actual player count, version, and MOTD.
   - Pauses polling when the browser tab is hidden to save network resources.
   - Graceful "Status unavailable" handling without fabricating fake counts.

4. **Animated Initial Loading Screen:**
   - Embers, glowing CraftySMP Season 2 emblem, and progress animation on first visit.
   - Seamless fade-in/fade-out; respects `prefers-reduced-motion`.

5. **Shopping Cart & Minecraft Delivery Integration:**
   - Real-time cart state with quantity adjustments and item removals.
   - Strict separation of real INR (`₹`) and in-game Coins (`🪙`).
   - Checkout requires valid Minecraft Username (IGN).
   - Generates queued server commands (e.g. `kit give {player} {kit_name}`, `customweapons give {player} {weapon_id}`, `eco give {player} {amount}`).

6. **Protected Administrator Dashboard:**
   - Protected passkey access (default: `crafty2026`).
   - Live catalog price and image editor.
   - Delivery queue inspection and status controls.
   - Player rank claims review (approve / reject with notes).
   - Central server IP and Discord URL management.

7. **Dynamic SEO & React Helmet Integration (`react-helmet-async`):**
   - Page-specific titles and meta descriptions across all store departments: Custom Weapons, Kits, Ranks, Coins, Special Items, Live Server Status, Player Account, and Staff Admin Portal.
   - OpenGraph and Twitter summary cards with optimized visual assets and canonical URLs.
   - Dynamic product modal integration that instantly updates the `<title>`, description, OpenGraph preview, and Schema.org `Product` JSON-LD structured data when inspecting individual weapons or kits.
   - Embedded Schema.org structured data (`WebSite`, `FAQPage`, `ItemList`, `Product`) for rich search snippet indexing.

8. **Cloud SQL (PostgreSQL) in `asia-southeast1` & Drizzle ORM:**
   - Dedicated relational Cloud SQL instance provisioned in region `asia-southeast1`.
   - Drizzle ORM schema managing tables for `users`, `orders`, `rank_applications`, and `server_settings`.
   - Connection pooling using the Object Method with lazy connections and idle error recovery.
   - Firebase Authentication integration with Google Sign-In and Bearer token verification.
   - Persistent store deliveries and rank applications saved directly to PostgreSQL.



---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Build for production
npm run build
```
