import { NoteService } from "@/services/noteService";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Note } from "../models/Note";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false); // New toggle state

  const refreshNotes = useCallback(async () => {
    try {
      const data = await NoteService.getAll();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }, []);

  useEffect(() => {
    refreshNotes();
  }, [refreshNotes]);

  const displayedNotes = useMemo(() => {
    if (showFavoritesOnly) {
      return notes.filter((note) => note.favorite);
    }
    return notes;
  }, [notes, showFavoritesOnly]);

  const addNote = async (title: string, body: string) => {
    await NoteService.add(title, body);
    await refreshNotes();
  };

  const updateNote = async (
    id: number,
    title: string,
    body: string,
    favorite: boolean
  ) => {
    await NoteService.update(id, title, body, favorite);
    await refreshNotes();
  };

  const deleteNote = async (id: number) => {
    await NoteService.delete(id);
    await refreshNotes();
  };

  return {
    notes: displayedNotes,
    showFavoritesOnly,
    setShowFavoritesOnly,
    addNote,
    refreshNotes,
    deleteNote,
    updateNote,
  };
}
