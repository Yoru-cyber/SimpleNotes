import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { ThemedView } from "@/components/themed-view";
import NoteCard from "@/components/ui/NoteCard";
import { IconSymbol } from "@/components/ui/icon-symbol";
const FAKE_NOTES = [
  {
    id: "1",
    title: "Grocery List",
    body: "Milk, organic eggs, sourdough bread, and avocados for the weekend brunch.",
    date: "Jan 10, 2026",
  },
  {
    id: "2",
    title: "Project Ideas",
    body: "Build a React Native app that uses AI to organize handwritten notes into categories.",
    date: "Jan 08, 2026",
  },
  {
    id: "3",
    title: "Workout Routine",
    body: "Monday: Chest and Triceps. Wednesday: Back and Biceps. Friday: Legs and Shoulders.",
    date: "Jan 05, 2026",
  },
  {
    id: "4",
    title: "Meeting Notes",
    body: 'The client wants the logo to be "more pop" and the primary color shifted to a deeper blue.',
    date: "Dec 28, 2025",
  },
  {
    id: "5",
    title: "Gift Ideas",
    body: "Noise-canceling headphones for Sarah, a mechanical keyboard for Mike.",
    date: "Dec 20, 2025",
  },
];
export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {FAKE_NOTES.map((note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            body={note.body}
            date={note.date}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: "#007AFF" }]}
        onPress={() => console.log("Add note pressed")}
        activeOpacity={0.7}
      >
        <IconSymbol name="plus" size={32} color="white" />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 30, // Distance from bottom
    right: 30, // Distance from right
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Elevation for Android
    elevation: 8,
  },
  scrollContent: {
    padding: 20,
    gap: 12,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  noteCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cccccc33",
    backgroundColor: "#80808010",
    gap: 4,
  },
  noteTitle: {
    fontWeight: "bold",
  },
  noteDate: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
  },
  noteBody: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
});
