import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import AnimatedSplashScreen from "../components/AnimatedSplashScreen";
import { StarredProfilesProvider } from "../contexts/StarredProfilesContext";

// Prevent the default splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide the default splash screen immediately
    SplashScreen.hideAsync();
  }, []);

  return (
    <StarredProfilesProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      {showSplash && (
        <AnimatedSplashScreen onNext={() => setShowSplash(false)} />
      )}
    </StarredProfilesProvider>
  );
}
