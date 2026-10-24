import express from 'express';
import { createServer as createViteServer } from 'vite';
import * as dotenv from 'dotenv';
import { requireAuth, optionalAuth, AuthRequest } from './src/middleware/auth.ts';
import { getOrCreateUser, getUserByUid, updateUserProfile } from './src/db/users.ts';
import { createOrder, getAllOrders, updateOrderStatus } from './src/db/orders.ts';
import { createRankApplication, getAllRankApplications, updateRankApplicationStatus } from './src/db/ranks.ts';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// API Routes
// 1. User profile sync & fetch
app.post('/api/user/sync', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const email = req.user!.email || `${uid}@craftysmp.internal`;
    const { minecraftUsername, discordTag } = req.body;
    const user = await getOrCreateUser(uid, email, minecraftUsername, discordTag);
    res.json(user);
  } catch (error: any) {
    console.error('Error syncing user:', error);
    res.status(500).json({ error: error.message || 'Failed to sync user' });
  }
});

app.get('/api/user/me', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const user = await getUserByUid(uid);
    res.json(user || null);
  } catch (error: any) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch user' });
  }
});

app.patch('/api/user/profile', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const { minecraftUsername, discordTag } = req.body;
    const updated = await updateUserProfile(uid, { minecraftUsername, discordTag });
    res.json(updated);
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: error.message || 'Failed to update user profile' });
  }
});

// 2. Orders & Minecraft Delivery Queue
app.get('/api/orders', async (_req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch orders' });
  }
});

app.post('/api/orders', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const {
      orderNumber,
      minecraftUsername,
      items,
      totalInr,
      totalCoins,
      paymentMethod,
      commandsExecuted,
      notes,
    } = req.body;

    let userId: number | undefined;
    if (req.user) {
      const user = await getUserByUid(req.user.uid);
      if (user) userId = user.id;
    }

    const order = await createOrder({
      orderNumber,
      userId,
      minecraftUsername,
      itemsJson: JSON.stringify(items || []),
      totalInr: Number(totalInr) || 0,
      totalCoins: Number(totalCoins) || 0,
      paymentMethod: paymentMethod || 'Standard Sandbox',
      commandsExecuted: JSON.stringify(commandsExecuted || []),
      notes,
    });

    res.json(order);
  } catch (error: any) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message || 'Failed to create order' });
  }
});

app.patch('/api/orders/:orderNumber/status', async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const { status } = req.body;
    const updated = await updateOrderStatus(orderNumber, status);
    res.json(updated);
  } catch (error: any) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: error.message || 'Failed to update order status' });
  }
});

// 3. Rank Applications
app.get('/api/ranks/applications', async (_req, res) => {
  try {
    const apps = await getAllRankApplications();
    res.json(apps);
  } catch (error: any) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch applications' });
  }
});

app.post('/api/ranks/applications', async (req, res) => {
  try {
    const { rankId, rankName, minecraftUsername, discordTag, evidenceUrl, notes } = req.body;
    const appRecord = await createRankApplication({
      rankId,
      rankName,
      minecraftUsername,
      discordTag,
      evidenceUrl,
      notes,
    });
    res.json(appRecord);
  } catch (error: any) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: error.message || 'Failed to submit application' });
  }
});

app.patch('/api/ranks/applications/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status, adminNotes } = req.body;
    const updated = await updateRankApplicationStatus(id, status, adminNotes);
    res.json(updated);
  } catch (error: any) {
    console.error('Error updating application status:', error);
    res.status(500).json({ error: error.message || 'Failed to update application status' });
  }
});

// Serve frontend in production or via Vite middlewares in development
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  app.get('*', (_req, res) => {
    res.sendFile('dist/index.html', { root: '.' });
  });
} else {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(port, '0.0.0.0', () => {
  console.log(`CraftySMP full-stack server running on http://0.0.0.0:${port}`);
});
