import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Users table (linked with Firebase Auth UID)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  minecraftUsername: text('minecraft_username'),
  discordTag: text('discord_tag'),
  coinsBalance: integer('coins_balance').default(25000).notNull(),
  role: text('role').default('player').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Orders & Minecraft delivery queue
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderNumber: text('order_number').notNull().unique(),
  userId: integer('user_id').references(() => users.id),
  minecraftUsername: text('minecraft_username').notNull(),
  itemsJson: text('items_json').notNull(),
  totalInr: integer('total_inr').default(0).notNull(),
  totalCoins: integer('total_coins').default(0).notNull(),
  paymentMethod: text('payment_method').notNull(),
  paymentStatus: text('payment_status').default('completed').notNull(),
  deliveryStatus: text('delivery_status').default('queued').notNull(),
  commandsExecuted: text('commands_executed').notNull(),
  retryCount: integer('retry_count').default(0).notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Player rank verification applications
export const rankApplications = pgTable('rank_applications', {
  id: serial('id').primaryKey(),
  rankId: text('rank_id').notNull(),
  rankName: text('rank_name').notNull(),
  minecraftUsername: text('minecraft_username').notNull(),
  discordTag: text('discord_tag').notNull(),
  evidenceUrl: text('evidence_url'),
  notes: text('notes'),
  status: text('status').default('pending').notNull(),
  adminNotes: text('admin_notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Server configuration key-value storage
export const serverSettings = pgTable('server_settings', {
  id: serial('id').primaryKey(),
  settingKey: text('setting_key').notNull().unique(),
  settingValue: text('setting_value').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
}));
