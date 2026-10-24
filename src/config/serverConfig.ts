/**
 * Central Server & Store Configuration for CraftySMP Season 2.
 * Edit this file to update the server IP, Discord invitation link,
 * Minecraft API endpoints, delivery command templates, and image mappings.
 */

export const SERVER_CONFIG = {
  serverName: "CraftySMP Season 2",
  serverAddress: "CraftySmpseason2.pixelforge.gg",
  defaultPort: 25565,
  discordInviteUrl: "https://discord.gg/BVc7CGMzg",
  brandSlogan: "FORGE YOUR LEGEND. MASTER YOUR POWER.",
  secondarySlogan: "YOUR ADVENTURE. YOUR WEAPONS. YOUR LEGACY.",
  statusApiUrl: "https://api.mcsrvstat.us/3/CraftySmpseason2.pixelforge.gg",
  statusPollIntervalMs: 60000, // 60 seconds
  currencies: {
    inrSymbol: "₹",
    coinsSymbol: "🪙",
    coinsName: "SMP Coins",
  },
  themeColors: {
    primaryYellow: "#FFD700",
    gold: "#FFC107",
    primaryOrange: "#FF8C00",
    fireOrange: "#FF5722",
    fireRed: "#D7261E",
    deepRed: "#8B1E16",
    darkBrown: "#1E120D",
    cardBrown: "#2A1A12",
    lightBrown: "#382217",
    textPrimary: "#FFF8E7",
    textSecondary: "#C6B7A5",
  },
  deliveryCommandTemplates: {
    kit: "kit give {player} {kit_name}",
    weapon: "customweapons give {player} {weapon_id}",
    coins: "eco give {player} {amount}",
    rank: "lp user {player} parent set {rank_id}",
    special: "give {player} {item_id} {quantity}",
  },
  // Documented audit alert requested in PRD Section 20-B:
  catalogDiscrepancyNotice: {
    productKey: "ultimateNetherite",
    catalogName: "Ultimate Neth Maxed Kit",
    captionName: "Basic Netherite Kit",
    message: "Admin Review Flag: The catalog lists 'Ultimate Neth Maxed Kit (₹129)' while the image caption references 'Basic Netherite Kit'. Contents preserved as requested.",
  },
};

/**
 * Supplied product images from CraftySMP requirements
 */
export const productImages = {
  weaponShowcase:
    "https://cdn.discordapp.com/attachments/1545328397960478770/1562079808458858577/IMG_20261020_173500.jpg?ex=6add4cf0&is=6adbfb70&hm=9cb923f7e6d48415910927de4760ce079730393cb645a298aac42ab7d84d5f8d",
  kits: {
    noob: "https://cdn.discordapp.com/attachments/1554961544813477948/1562309231636516894/IMG_20261020_181555.jpg?ex=6adcd11b&is=6adb7f9b&hm=0d8b069e7f2180800e499cdbe58ddfee53625f1e57d0aefb76d59ba599b3f926",
    pro: "https://cdn.discordapp.com/attachments/1554961544813477948/1562309348934295634/IMG_20261020_181350.jpg?ex=6adcd137&is=6adb7fb7&hm=8444a9854e6c45218b3af383a6994ddf0ebce3e612d32857493cce7ed1beecc9",
    redstone: "https://cdn.discordapp.com/attachments/1554961544813477948/1562309348934295634/IMG_20261020_181350.jpg?ex=6adcd137&is=6adb7fb7&hm=8444a9854e6c45218b3af383a6994ddf0ebce3e612d32857493cce7ed1beecc9",
    enchanting: "https://cdn.discordapp.com/attachments/1554961544813477948/1562309726132502669/IMG_20261020_181507.jpg?ex=6adcd191&is=6adb8011&hm=db586fe59413d9a9afb231984c4cbddb8aee7add8dd2a3a860db7b5bf50b4200",
    ultimateNetherite: "https://cdn.discordapp.com/attachments/1554961544813477948/1562310227410288771/IMG_20261020_181255.jpg?ex=6adcd208&is=6adb8088&hm=564a238b78a31181fde2e2510aa2b5efad57e2c8f8083639ff6392be022583d1",
  },
  ranks: {
    media: "https://cdn.discordapp.com/attachments/1562076913445372005/1562078490012950548/IMG_20261020_173444.jpg?ex=6add4bb6&is=6adbfa36&hm=a654adf6617aa9866feed6150c649369232ee55af002453a381092bcec56c2fa",
    vip: "https://cdn.discordapp.com/attachments/1562076913445372005/1562078893169573978/IMG_20261020_173429.jpg?ex=6add4c16&is=6adbfa96&hm=0ad03a89d3366e84a1585fd990f4f79811c60755af7fbdd61d53f2b3a4954199",
    ultimateVip: "https://cdn.discordapp.com/attachments/1562076913445372005/1562079029232930876/IMG_20261020_173411.jpg?ex=6add4c36&is=6adbfab6&hm=3fa29e3032ab961c7fb77e53ca37e2b4f35ee7a3433f2727fee438f07576cd17",
    luxury: "https://cdn.discordapp.com/attachments/1562076913445372005/1562079194970595459/IMG_20261020_173357.jpg?ex=6add4c5e&is=6adbfade&hm=c5b5a30ff9caa28ccdd1d1fde8fc83b6f074ff18991232ff25a8ebcd4a91f333",
    skullCrusher: "https://cdn.discordapp.com/attachments/1562076913445372005/1562079277456031774/IMG_20261020_174047.jpg?ex=6add4c71&is=6adbfa%20f1&hm=e7bd61658783bc261470d862bbfa0322fbd85e4a0898d4ac3309a2786f90630b",
  },
};
