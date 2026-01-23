import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StarredProfilesProvider } from "../contexts/StarredProfilesContext";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <StarredProfilesProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </StarredProfilesProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
