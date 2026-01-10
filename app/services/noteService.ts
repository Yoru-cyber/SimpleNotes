import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";
import { Note } from "../models/Note";

const db = SQLite.openDatabaseSync("notes.db");

export const initDatabase = () => {
  if (Platform.OS === "web") {
    console.warn(
      "SQLite is not supported in the browser with this configuration."
    );
    return;
  }
  db.execSync(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      body TEXT,
      date TEXT
    );
  `);
};

export const NoteService = {
  getAll: (): Note[] => {
    return db.getAllSync<Note>("SELECT * FROM notes ORDER BY id DESC");
  },
  add: (title: string, body: string): SQLite.SQLiteRunResult => {
    return db.runSync(
      "INSERT INTO notes (title, body, date) VALUES (?, ?, ?)",
      [title, body, new Date().toLocaleDateString()]
    );
  },
  delete: (id: number): SQLite.SQLiteRunResult => {
    return db.runSync("DELETE FROM notes WHERE id = ?", [id]);
  },
};
