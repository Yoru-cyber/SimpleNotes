export interface Note {
  id: number;
  title: string;
  body: string;
  date: string;
  favorite: boolean;
}
// Omit 'id' for the creation payload
export type CreateNoteDTO = Omit<Note, "id" | "date">;
