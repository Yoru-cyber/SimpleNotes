import { IconSymbol } from '@/components/ui/icon-symbol';
import { Note } from '@/models/Note';
import { NoteService } from '@/services/noteService';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { Button } from '@tamagui/button';
import { Text } from '@tamagui/core';
import { Input, TextArea } from '@tamagui/input';
import { ScrollView } from '@tamagui/scroll-view';
import { XStack, YStack } from '@tamagui/stacks';

export default function NoteDetailScreen() {
    const { id } = useLocalSearchParams();
    const idInt = Number(id);
    const router = useRouter();

    const [note, setNote] = useState<Note | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [favorite, setFavorite] = useState(false);

    const getNote = async () => {
        try {
            const data = await NoteService.get(idInt);
            if (data) {
                setNote(data);
                setTitle(data.title);
                setBody(data.body ?? "");
                setFavorite(data.favorite);
            }
        } catch (error) {
            console.error("Error fetching note:", error);
        }
    };

    useEffect(() => {
        getNote();
    }, [idInt]);

    const handleSave = async () => {
        await NoteService.update(idInt, title, body, favorite);
        setIsEditing(false);
        getNote();
    };
    const handleCancel = () => {
        if (note) {
            setTitle(note.title);
            setBody(note.body ?? "");
        }
        setIsEditing(false);
    };
    const handleConfirmDelete = () => {
        Alert.alert(
            "Delete Note",
            "Are you sure you want to permanently remove this note?",
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
            <YStack f={1} jc="center" ai="center" backgroundColor="$background">
                <Text>Loading...</Text>
            </YStack>
        );
    }

    return (
        <YStack f={1} backgroundColor="$background">
            <Stack.Screen options={{
                title: isEditing ? 'Editing' : '',
                headerRight: () => (
                    <XStack gap="$3" ai="center">
                        {!isEditing ? (
                            <>
                                <Button
                                    size="$2"
                                    circular
                                    chromeless
                                    padding={0}
                                    onPress={(e) => {
                                        const nextFavorite = !favorite;
                                        setFavorite(nextFavorite);
                                        NoteService.update(idInt, title, body, nextFavorite);
                                    }}
                                >
                                    <IconSymbol
                                        name={favorite ? "star.fill" : "star"}
                                        size={20}
                                        color={favorite ? "#FFCC00" : "#808080"}
                                    />
                                </Button>
                                <Button
                                    size="$3"
                                    circular
                                    chromeless
                                    onPress={handleConfirmDelete}
                                    pressStyle={{ opacity: 0.5 }}
                                >
                                    <IconSymbol name="trash" size={22} color="#FF3B30" />
                                </Button>

                                <Button
                                    size="$3"
                                    circular
                                    chromeless
                                    onPress={() => setIsEditing(true)}
                                    pressStyle={{ opacity: 0.5 }}
                                >
                                    <IconSymbol name="pencil" size={22} color="#007AFF" />
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    size="$3"
                                    chromeless
                                    onPress={handleCancel}
                                >
                                    <Text color="#f21919" fontWeight="bold" fontSize="$5">Cancel</Text>
                                </Button>
                                <Button
                                    size="$3"
                                    chromeless
                                    onPress={handleSave}
                                >
                                    <Text color="#007AFF" fontWeight="bold" fontSize="$5">Save</Text>
                                </Button>
                            </>
                        )}
                    </XStack>
                )
            }} />

            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {isEditing ? (
                    <YStack gap="$4">
                        <Input
                            value={title}
                            onChangeText={setTitle}
                            size="$5"
                            backgroundColor="$backgroundHover"
                            placeholder="Title"
                            placeholderTextColor="$color10"
                            borderWidth={0}
                            borderBottomWidth={1}
                            borderColor="$borderColor"
                        />
                        <TextArea
                            value={body}
                            onChangeText={setBody}
                            size="$4"
                            minHeight={300}
                            backgroundColor="$backgroundHover"
                            placeholder="Start typing..."
                            placeholderTextColor="$color10"
                            textAlignVertical="top"
                            p="$3"
                            borderRadius="$4"
                        />
                    </YStack>
                ) : (
                    <YStack gap="$2">
                        <Text fontSize="$8" fontWeight="bold" color="$color">
                            {title}
                        </Text>

                        <Text fontSize="$3" color="$color" opacity={0.5} mb="$4">
                            {note.date}
                        </Text>

                        <Text fontSize="$5" lineHeight={28} color="$color">
                            {body}
                        </Text>
                    </YStack>
                )}
            </ScrollView>
        </YStack>
    );
}