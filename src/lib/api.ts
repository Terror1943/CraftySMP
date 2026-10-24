import { DeliveryOrder, RankApplication } from '../types';

export const api = {
  // Orders
  async getOrders(): Promise<DeliveryOrder[]> {
    try {
      const res = await fetch('/api/orders');
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      return data.map((d: any) => ({
        id: `ord_${d.id}`,
        orderNumber: d.orderNumber,
        minecraftUsername: d.minecraftUsername,
        items: JSON.parse(d.itemsJson || '[]'),
        totalInr: d.totalInr,
        totalCoins: d.totalCoins,
        paymentMethod: d.paymentMethod,
        paymentStatus: d.paymentStatus,
        deliveryStatus: d.deliveryStatus,
        createdAt: d.createdAt,
        commandsExecuted: JSON.parse(d.commandsExecuted || '[]'),
        retryCount: d.retryCount,
        notes: d.notes,
      }));
    } catch {
      return [];
    }
  },

  async createOrder(order: DeliveryOrder, idToken?: string | null): Promise<DeliveryOrder | null> {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (idToken) headers['Authorization'] = `Bearer ${idToken}`;

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          orderNumber: order.orderNumber,
          minecraftUsername: order.minecraftUsername,
          items: order.items,
          totalInr: order.totalInr,
          totalCoins: order.totalCoins,
          paymentMethod: order.paymentMethod,
          commandsExecuted: order.commandsExecuted,
          notes: order.notes,
        }),
      });

      if (!res.ok) return null;
      return order;
    } catch {
      return null;
    }
  },

  async updateOrderStatus(orderNumber: string, status: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/orders/${orderNumber}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Rank Applications
  async getRankApplications(): Promise<RankApplication[]> {
    try {
      const res = await fetch('/api/ranks/applications');
      if (!res.ok) throw new Error('Failed to fetch rank applications');
      const data = await res.json();
      return data.map((a: any) => ({
        id: `app_${a.id}`,
        rankId: a.rankId,
        rankName: a.rankName,
        minecraftUsername: a.minecraftUsername,
        discordTag: a.discordTag,
        evidenceUrl: a.evidenceUrl,
        notes: a.notes,
        status: a.status,
        adminNotes: a.adminNotes,
        createdAt: a.createdAt,
      }));
    } catch {
      return [];
    }
  },

  async createRankApplication(app: RankApplication): Promise<RankApplication | null> {
    try {
      const res = await fetch('/api/ranks/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(app),
      });
      if (!res.ok) return null;
      return app;
    } catch {
      return null;
    }
  },

  async updateRankApplicationStatus(
    appId: string,
    status: 'approved' | 'rejected',
    adminNotes?: string
  ): Promise<boolean> {
    try {
      const numericId = appId.replace('app_', '');
      const res = await fetch(`/api/ranks/applications/${numericId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes }),
      });
      return res.ok;
    } catch {
      return false;
    }
  },
};
