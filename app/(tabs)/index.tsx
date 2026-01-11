import { Alert, FlatList, Modal, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import NoteCard from "@/components/ui/NoteCard";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { useNotes } from "../../hooks/useNotes";
export default function HomeScreen() {
  const { notes, addNote, refreshNotes } = useNotes();
  useFocusEffect(
    useCallback(() => {
      refreshNotes();
    }, [refreshNotes])
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }
    addNote(title, body);
    setTitle('');
    setBody('');
    setModalVisible(false);
  };
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/notes/[id]', params: { id: item.id.toString() } })}
          >
            <NoteCard {...item} />
          </TouchableOpacity>
          // <NoteCard title={item.title} body={item.body} date={item.date} id={item.id} deleteFunction={deleteNote} />
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <ThemedView style={styles.modalContent}>
            <ThemedText type="subtitle">New Note</ThemedText>

            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#888"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Start typing..."
              placeholderTextColor="#888"
              value={body}
              onChangeText={setBody}
              multiline
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.button}>
                <ThemedText>Cancel</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSave} style={[styles.button, styles.saveButton]}>
                <ThemedText style={{ color: 'white', fontWeight: 'bold' }}>Save</ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.fab, { backgroundColor: "#007AFF" }]}>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end', // Slides up from bottom
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '50%',
    gap: 15,
  },
  input: {
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#80808010',
    color: '#fff', // Note: use your theme color logic here
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },
  button: {
    padding: 12,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
  },
});
