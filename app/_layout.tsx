import { Stack } from "expo-router";
import { StarredProfilesProvider } from "../contexts/StarredProfilesContext";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StarredProfilesProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </StarredProfilesProvider>
    </AuthProvider>
  );
}
