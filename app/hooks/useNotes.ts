import { NoteService } from "@/app/services/noteService";
import { useEffect, useState } from "react";
import { Note } from "../models/Note";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const refreshNotes = () => {
    const data: Note[] = NoteService.getAll();
    setNotes(data);
  };

  useEffect(() => {
    refreshNotes(); 
  }, []);

  const addNote = (title: string, body: string) => {
    NoteService.add(title, body);
    refreshNotes();
  };
  const deleteNote = (id: number) => {
    NoteService.delete(id);
    refreshNotes();
  };
  return { notes, addNote, refreshNotes, deleteNote };
}
