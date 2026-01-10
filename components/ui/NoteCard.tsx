import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "./icon-symbol";
type NoteCardProps = {
  id?: number;
  title: string;
  date: string;
  body: string;
  favorited?: boolean;
  deleteFunction?: (id: number) => void;
};
export default function NoteCard(props: NoteCardProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.noteCard}>
        <ThemedText type="subtitle" style={styles.noteTitle}>
          {props.title}
        </ThemedText>
        <ThemedText style={styles.noteDate}>{props.date}</ThemedText>

        <ThemedText numberOfLines={2} style={styles.noteBody}>
          {props.body}
        </ThemedText>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => props.deleteFunction?.(props.id!)}>
          <IconSymbol name="trash" size={32} color="red" />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
  },
  noteCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cccccc33", // Subtle transparent border
    backgroundColor: "#80808010", // Very light tint
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
  cancelBtn: {
    padding: 2,
    paddingHorizontal: 2,
  },
});
