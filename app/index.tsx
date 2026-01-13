import { useState } from "react";
import { View } from "react-native";
import OnboardingCarousel from "../components/OnboardingCarousel";
import WelcomeScreen from "../components/WelcomeScreen";

export default function Index() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleCreateAccountPress = () => {
    setShowWelcome(false);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    // Navigate to main app or next screen
  };

  if (showWelcome) {
    return <WelcomeScreen onCreateAccount={handleCreateAccountPress} />;
  }

  if (showOnboarding) {
    return <OnboardingCarousel onComplete={handleOnboardingComplete} />;
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