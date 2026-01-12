import NoteCard from "@/components/ui/NoteCard";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Button } from '@tamagui/button';
import { Text, View } from "@tamagui/core";
import { Input, TextArea } from '@tamagui/input';
import { Sheet } from "@tamagui/sheet";
import { XStack, YStack } from '@tamagui/stacks';
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, FlatList, useColorScheme } from "react-native";
import { useNotes } from "../../hooks/useNotes";
export default function HomeScreen() {
  const { notes, addNote, refreshNotes, updateNote } = useNotes();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const colorScheme = useColorScheme();
  useFocusEffect(
    useCallback(() => {
      refreshNotes();
    }, [refreshNotes])
  );
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
    <YStack f={1} backgroundColor="$background" p="$4">
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View
            onPress={() => router.push({ pathname: '/notes/[id]', params: { id: item.id.toString() } })}
            mb="$3"
            backgroundColor="transparent"
            pressStyle={{ scale: 0.98, opacity: 0.9 }}
            borderRadius={12}
            overflow="hidden"
          >
            <NoteCard {...item} onToggleFavorite={() => {
              updateNote(item.id, item.title, item.body, !item.favorite);
            }} />
          </View>
        )}
      />

      <Button
        onPress={() => setModalVisible(true)}
        position="absolute"
        bottom={30}
        right={20}
        width={64}
        height={64}
        borderRadius={32}
        backgroundColor="$accent"
        pressStyle={{ scale: 0.9, opacity: 0.8, backgroundColor: '$accentColorHover' }}
        elevation={8}
        shadowColor="$shadowColor"
        p={0}
      >
        <IconSymbol name="plus" size={32} color="white" />
      </Button>
      <Sheet
        modal
        open={modalVisible}
        onOpenChange={setModalVisible}
        snapPoints={[90]}
        animation="quick"
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame padding="$1">
          <View f={1} backgroundColor="$background" jc="flex-start">
            <YStack
              backgroundColor="$background"
              borderTopLeftRadius={25}
              borderTopRightRadius={25}
              p="$5"
              pb="$5"
              gap="$4"
              minHeight="50%"
              borderTopWidth={1}
              borderColor="$borderColor"
            >
              <Text fontSize="$6" fontWeight="bold" color="$color">New Note</Text>

              <Input
                placeholder="Title"
                placeholderTextColor="$color10"
                value={title}
                onChangeText={setTitle}
                size="$4"
                backgroundColor="$backgroundHover"
                borderColor="$borderColor"
                color="$color"
              />

              <TextArea
                placeholder="Start typing..."
                placeholderTextColor="$color10"
                value={body}
                textAlignVertical="top"
                p={2}
                onChangeText={setBody}
                numberOfLines={10}
                size="$4"
                backgroundColor="$backgroundHover"
                borderColor="$borderColor"
                color="$color"
              />

              <XStack jc="flex-end" gap="$3" mt="$2">
                <Button
                  onPress={() => setModalVisible(false)}
                  backgroundColor="$backgroundFocus"
                  pressStyle={{ scale: 0.9, opacity: 0.8}}
                  color="$color"
                >
                  Cancel
                </Button>

                <Button
                  onPress={handleSave}
                  backgroundColor="$accent"
                  pressStyle={{ scale: 0.9, opacity: 0.8, backgroundColor: '$accentColorHover' }}
                  color="white"
                  fontWeight="bold"
                  px="$5"
                >
                  Save
                </Button>
              </XStack>
            </YStack>
          </View>
        </Sheet.Frame>
      </Sheet>
    </YStack>
  );
}