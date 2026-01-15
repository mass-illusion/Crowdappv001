import { useState } from "react";
import OnboardingCarousel from "../components/OnboardingCarousel";
import { AuthFlow } from "../components/auth";

export default function Index() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleAuthComplete = () => {
    setShowOnboarding(true);
  };

  const handleCreateAccount = () => {
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    // Navigate to main app or next screen
  };

  if (showOnboarding) {
    return <OnboardingCarousel onComplete={handleOnboardingComplete} />;
  }

  // Show auth flow by default
  return (
    <AuthFlow 
      onAuthComplete={handleAuthComplete}
      onCreateAccount={handleCreateAccount}
    />
  );

}