import { NoteService } from "@/services/noteService";
import { useCallback, useEffect, useState } from "react";
import { Note } from "../models/Note";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

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

  const addNote = async (title: string, body: string) => {
    await NoteService.add(title, body);
    await refreshNotes(); 
  };

  const updateNote = async (id: number, title: string, body: string) => {
    await NoteService.update(id, title, body);
    await refreshNotes();
  };

  const deleteNote = async (id: number) => {
    await NoteService.delete(id);
    await refreshNotes();
  };

  return { notes, addNote, refreshNotes, deleteNote, updateNote };
}
