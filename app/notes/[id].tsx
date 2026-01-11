import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Note } from '@/models/Note';
import { NoteService } from '@/services/noteService';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function NoteDetailScreen() {
    const { id } = useLocalSearchParams();
    const idInt = Number(id);
    const router = useRouter();

    const [note, setNote] = useState<Note | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const getNote = async () => {
        try {
            const data = await NoteService.get(idInt);
            if (data) {
                setNote(data);
                setTitle(data.title);
                setBody(data.body ?? "");
            }
        } catch (error) {
            console.error("Error fetching note:", error);
        }
    };

    useEffect(() => {
        getNote();
    }, [idInt]);
    const handleSave = async () => {
        await NoteService.update(idInt, title, body);
        setIsEditing(false);
        getNote();
    };

    const handleConfirmDelete = () => {
        Alert.alert(
            "Delete Note",
            "Are you sure?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        await NoteService.delete(idInt);
                        router.back();
                    }
                }
            ]
        );
    };

    if (!note) {
        return (
            <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ThemedText>Loading...</ThemedText>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{
                title: isEditing ? 'Editing' : '',
                headerRight: () => (
                    <View style={styles.headerRightContainer}>
                        {!isEditing ? (
                            <>
                                <TouchableOpacity onPress={handleConfirmDelete} style={styles.headerIcon}>
                                    <IconSymbol name="trash" size={22} color="#FF3B30" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.headerIcon}>
                                    <IconSymbol name="pencil" size={22} color="#007AFF" />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <TouchableOpacity onPress={handleSave}>
                                <ThemedText style={styles.saveBtnText}>Save</ThemedText>
                            </TouchableOpacity>
                        )}
                    </View>
                )
            }} />

            <ScrollView contentContainerStyle={styles.content}>
                {isEditing ? (
                    <>
                        <TextInput style={styles.titleInput} value={title} onChangeText={setTitle} />
                        <TextInput style={styles.bodyInput} value={body} onChangeText={setBody} multiline />
                    </>
                ) : (
                    <>
                        <ThemedText type="title">{title}</ThemedText>
                        <ThemedText style={styles.dateText}>{note.date}</ThemedText>
                        <ThemedText style={styles.bodyText}>{body}</ThemedText>
                    </>
                )}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: 20 },
    headerBtn: { color: '#007AFF', fontWeight: 'bold' },
    titleInput: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#808080' },
    bodyInput: { fontSize: 18, lineHeight: 24, color: '#808080', minHeight: 200, textAlignVertical: 'top' },
    dateText: { opacity: 0.5, marginVertical: 10 },
    bodyText: { fontSize: 18, lineHeight: 26 },
    headerRightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15, 
    },
    headerIcon: {
        padding: 4,
    },
    saveBtnText: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 17,
    },
});
