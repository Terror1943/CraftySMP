import { eq } from 'drizzle-orm';
import { db } from './index.ts';
import { users } from './schema.ts';

export async function getOrCreateUser(
  uid: string,
  email: string,
  minecraftUsername?: string,
  discordTag?: string
) {
  try {
    const existing = await db.select().from(users).where(eq(users.uid, uid)).limit(1);

    if (existing.length > 0) {
      if (minecraftUsername || discordTag) {
        const updateData: { minecraftUsername?: string; discordTag?: string } = {};
        if (minecraftUsername) updateData.minecraftUsername = minecraftUsername;
        if (discordTag) updateData.discordTag = discordTag;

        const updated = await db
          .update(users)
          .set(updateData)
          .where(eq(users.uid, uid))
          .returning();
        return updated[0];
      }
      return existing[0];
    }

    const inserted = await db
      .insert(users)
      .values({
        uid,
        email,
        minecraftUsername: minecraftUsername || null,
        discordTag: discordTag || null,
        coinsBalance: 25000,
        role: 'player',
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          ...(minecraftUsername ? { minecraftUsername } : {}),
          ...(discordTag ? { discordTag } : {}),
        },
      })
      .returning();

    return inserted[0];
  } catch (error) {
    console.error('Database getOrCreateUser query failed:', error);
    throw new Error('Database user lookup failed.', { cause: error });
  }
}

export async function getUserByUid(uid: string) {
  try {
    const res = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    return res[0] || null;
  } catch (error) {
    console.error('Database getUserByUid failed:', error);
    throw new Error('Database user retrieval failed.', { cause: error });
  }
}

export async function updateUserProfile(
  uid: string,
  data: { minecraftUsername?: string; discordTag?: string }
) {
  try {
    const res = await db
      .update(users)
      .set(data)
      .where(eq(users.uid, uid))
      .returning();
    return res[0] || null;
  } catch (error) {
    console.error('Database updateUserProfile failed:', error);
    throw new Error('Database profile update failed.', { cause: error });
  }
}
