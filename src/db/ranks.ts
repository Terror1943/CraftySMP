import { desc, eq } from 'drizzle-orm';
import { db } from './index.ts';
import { rankApplications } from './schema.ts';

export async function createRankApplication(data: {
  rankId: string;
  rankName: string;
  minecraftUsername: string;
  discordTag: string;
  evidenceUrl?: string;
  notes?: string;
}) {
  try {
    const res = await db
      .insert(rankApplications)
      .values({
        rankId: data.rankId,
        rankName: data.rankName,
        minecraftUsername: data.minecraftUsername,
        discordTag: data.discordTag,
        evidenceUrl: data.evidenceUrl || null,
        notes: data.notes || null,
        status: 'pending',
      })
      .returning();
    return res[0];
  } catch (error) {
    console.error('Database createRankApplication failed:', error);
    throw new Error('Database rank application creation failed.', { cause: error });
  }
}

export async function getAllRankApplications() {
  try {
    return await db.select().from(rankApplications).orderBy(desc(rankApplications.createdAt));
  } catch (error) {
    console.error('Database getAllRankApplications failed:', error);
    throw new Error('Database rank applications retrieval failed.', { cause: error });
  }
}

export async function updateRankApplicationStatus(
  id: number,
  status: string,
  adminNotes?: string
) {
  try {
    const res = await db
      .update(rankApplications)
      .set({
        status,
        ...(adminNotes ? { adminNotes } : {}),
      })
      .where(eq(rankApplications.id, id))
      .returning();
    return res[0] || null;
  } catch (error) {
    console.error('Database updateRankApplicationStatus failed:', error);
    throw new Error('Database rank application update failed.', { cause: error });
  }
}
