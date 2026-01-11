// services/noteService.ts
import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { notes } from "../db/schema";

const expoDb = openDatabaseSync("notes.db");
const db = drizzle(expoDb);

export const NoteService = {
  getAll: async () => {
    return await db.select().from(notes).orderBy(desc(notes.id));
  },

  add: async (title: string, body: string) => {
    return await db
      .insert(notes)
      .values({
        title,
        body,
        date: new Date().toLocaleDateString(),
        favorite: false,
      })
      .returning();
  },
  get: async (id: number) => {
    const result = await db
      .select()
      .from(notes)
      .where(eq(notes.id, id))
      .limit(1);
    return result[0] || null;
  },
  update: async (id: number, title: string, body: string, favorite: boolean) => {
    return await db.update(notes).set({ title, body, favorite }).where(eq(notes.id, id));
  },

  delete: async (id: number) => {
    return await db.delete(notes).where(eq(notes.id, id));
  },
};
