
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SystemBars } from "react-native-edge-to-edge";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts, Fraunces_400Regular, Fraunces_700Bold } from "@expo-google-fonts/fraunces";
import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { Colors } from "@/constants/Colors";

SplashScreen.preventAutoHideAsync();

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    text: Colors.primaryText,
    primary: Colors.primaryButton,
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.background,
    text: Colors.primaryText,
    primary: Colors.primaryButton,
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Fraunces_400Regular,
    Fraunces_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={CustomLightTheme}>
        <SystemBars style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="about" options={{ headerShown: true, title: 'About', headerBackTitle: 'Back' }} />
          <Stack.Screen name="ticket" options={{ headerShown: true, title: 'My Ticket', headerBackTitle: 'Back' }} />
          <Stack.Screen name="swap-bag" options={{ headerShown: true, title: 'My Swap Bag', headerBackTitle: 'Back' }} />
          <Stack.Screen name="game" options={{ headerShown: true, title: 'Play the Game', headerBackTitle: 'Back' }} />
          <Stack.Screen name="checklist" options={{ headerShown: true, title: 'Checklist', headerBackTitle: 'Back' }} />
          <Stack.Screen name="follow" options={{ headerShown: true, title: 'Follow the Movement', headerBackTitle: 'Back' }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="dark" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
