import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { db } from '@/lib/db';
import { config } from '@/tamagui.config';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { TamaguiProvider, Theme } from '@tamagui/core';
import { PortalProvider } from '@tamagui/portal';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import migrations from '../drizzle/migrations';
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { success, error } = useMigrations(db, migrations);
  if (!success) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Migrating Database...</ThemedText>
      </ThemedView>
    );
  }
  if (error) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Migration Error: {error.message}</ThemedText>
      </ThemedView>
    );
  }
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config} defaultTheme="dark">
        <PortalProvider>
          <Theme name="dark">
            <ThemeProvider value={theme}>
              <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} >
                <Stack
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: theme.colors.card,
                    },
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    headerTransparent: false,
                  }}
                >
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                  <Stack.Screen
                    name="notes/[id]"
                    options={{
                      headerTitle: "",
                      headerBackTitle: "Back",
                      headerShadowVisible: false
                    }}
                  />
                </Stack>
                <StatusBar style="auto" />
              </SafeAreaView>
            </ThemeProvider>
          </Theme>
        </PortalProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
