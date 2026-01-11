import { IconSymbol } from "@/components/ui/icon-symbol";
import { Button } from "@tamagui/button";
import { Text } from '@tamagui/core';
import { XStack, YStack } from '@tamagui/stacks';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
type NoteCardProps = {
  id?: number;
  title: string;
  date: string;
  body: string;
  favorite?: boolean;
  onToggleFavorite: () => void;
};
export default function NoteCard({ id, title, date, body, favorite, onToggleFavorite }: NoteCardProps) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition.springify()}
      style={{ width: '100%' }}
    >
      <YStack
        backgroundColor="$background"
        borderColor="$borderColor"
        borderWidth={1}
        borderRadius="$6"
        p="$4"
        gap="$1"
        hoverStyle={{ backgroundColor: '$backgroundHover' }}
      >
        <XStack jc="space-between" ai="center">
          <Text fontSize="$5" fontWeight="bold" color="$color" f={1} mr="$2">
            {title}
          </Text>
          <Button
            size="$2"
            circular
            chromeless
            padding={0}
            onPress={(e) => {
              e.stopPropagation(); // Prevents opening the note when just clicking the star
              onToggleFavorite();
            }}
          >
            <IconSymbol
              name={favorite ? "star.fill" : "star"}
              size={20}
              color={favorite ? "#FFCC00" : "#808080"}
            />
          </Button>
        </XStack>

        <Text fontSize="$3" opacity={0.6} color="$color" mb="$1">
          {date}
        </Text>

        <Text
          fontSize="$4"
          lineHeight={22}
          opacity={0.8}
          color="$color"
          numberOfLines={2}
        >
          {body}
        </Text>
      </YStack>
    </Animated.View>
  );
}