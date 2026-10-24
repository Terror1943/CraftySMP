import { desc, eq } from 'drizzle-orm';
import { db } from './index.ts';
import { orders } from './schema.ts';

export async function createOrder(data: {
  orderNumber: string;
  userId?: number;
  minecraftUsername: string;
  itemsJson: string;
  totalInr: number;
  totalCoins: number;
  paymentMethod: string;
  paymentStatus?: string;
  deliveryStatus?: string;
  commandsExecuted: string;
  retryCount?: number;
  notes?: string;
}) {
  try {
    const res = await db
      .insert(orders)
      .values({
        orderNumber: data.orderNumber,
        userId: data.userId || null,
        minecraftUsername: data.minecraftUsername,
        itemsJson: data.itemsJson,
        totalInr: data.totalInr,
        totalCoins: data.totalCoins,
        paymentMethod: data.paymentMethod,
        paymentStatus: data.paymentStatus || 'completed',
        deliveryStatus: data.deliveryStatus || 'queued',
        commandsExecuted: data.commandsExecuted,
        retryCount: data.retryCount || 0,
        notes: data.notes || null,
      })
      .returning();
    return res[0];
  } catch (error) {
    console.error('Database createOrder failed:', error);
    throw new Error('Database order creation failed.', { cause: error });
  }
}

export async function getAllOrders() {
  try {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  } catch (error) {
    console.error('Database getAllOrders failed:', error);
    throw new Error('Database orders retrieval failed.', { cause: error });
  }
}

export async function updateOrderStatus(
  orderNumber: string,
  deliveryStatus: string
) {
  try {
    const res = await db
      .update(orders)
      .set({ deliveryStatus })
      .where(eq(orders.orderNumber, orderNumber))
      .returning();
    return res[0] || null;
  } catch (error) {
    console.error('Database updateOrderStatus failed:', error);
    throw new Error('Database order status update failed.', { cause: error });
  }
}
