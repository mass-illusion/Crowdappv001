import { useState } from "react";
import { View } from "react-native";
import OnboardingCarousel from "../components/OnboardingCarousel";

export default function Index() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  if (showOnboarding) {
    return <OnboardingCarousel onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    />
  );
}
