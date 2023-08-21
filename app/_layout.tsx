import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { RlyMumbaiNetwork } from "@rly-network/mobile-sdk";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from 'react-native-paper';
import { Provider, useAuth } from "./context/auth";

export { ErrorBoundary } from "expo-router";


const rlyNetwork = RlyMumbaiNetwork;
rlyNetwork.setApiKey(
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjEwMX0.h1avIemeKU-1Xbjp7nkdhF1-59C6jY4Im3GBiQa6OP0F3v3j-8fVQI2Fbu703H5mSYX52sGCAg8VcpCfjY5zLg"
);

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
    <Provider>
      <RootLayoutNav />
    </Provider>
    </PaperProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { user, authInitialize } = useAuth();

  if (!authInitialize && !user) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
