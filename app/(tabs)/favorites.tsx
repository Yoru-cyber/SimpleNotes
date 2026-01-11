import NoteCard from "@/components/ui/NoteCard";
import { View } from "@tamagui/core";
import { YStack } from '@tamagui/stacks';
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { FlatList } from "react-native";
import { useNotes } from "../../hooks/useNotes";
export default function Favorites() {
  const { notes, setShowFavoritesOnly, refreshNotes, updateNote } = useNotes();
  useEffect(() => {
    setShowFavoritesOnly(true);
  }, []);
  useFocusEffect(
    useCallback(() => {
      refreshNotes();
    }, [refreshNotes])
  );


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
    </YStack>
  );
}