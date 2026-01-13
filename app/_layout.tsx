import { Stack } from "expo-router";
import { StarredProfilesProvider } from "../contexts/StarredProfilesContext";

export default function RootLayout() {
  return (
    <StarredProfilesProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </StarredProfilesProvider>
  );
}
