import { useState } from "react";
import { View } from "react-native";
import OnboardingCarousel from "../components/OnboardingCarousel";
import WelcomeScreen from "../components/WelcomeScreen";
import LoginScreen from "../components/LoginScreen";

export default function Index() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleCreateAccountPress = () => {
    setShowWelcome(false);
    setShowOnboarding(true);
  };

  const handleLoginPress = () => {
    setShowWelcome(false);
    setShowLogin(true);
  };

  const handleBackToWelcome = () => {
    setShowLogin(false);
    setShowWelcome(true);
  };

  const handleLogin = (phoneNumber: string) => {
    console.log('Login with phone:', phoneNumber);
    // Handle login logic here
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    // Navigate to main app or next screen
  };

  if (showWelcome) {
    return (
      <WelcomeScreen 
        onCreateAccount={handleCreateAccountPress} 
        onLogin={handleLoginPress}
      />
    );
  }

  if (showLogin) {
    return (
      <LoginScreen 
        onBack={handleBackToWelcome}
        onLogin={handleLogin}
      />
    );
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