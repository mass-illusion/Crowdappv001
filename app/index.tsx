import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import AnimatedSplashScreen from "../components/AnimatedSplashScreen";
import OnboardingCarousel from "../components/OnboardingCarousel";
import RegistrationScreen from "../components/RegistrationScreen";
import TermsScreen from "../components/TermsScreen";
import PrivacyPolicyScreen from "../components/PrivacyPolicyScreen";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fadeAnim.setValue(1);
  }, [showSplash, showRegistration, showTerms, showPrivacy]);

  const handleNext = () => {
    setShowSplash(false);
  };

  const handleComplete = () => {
    setShowRegistration(true);
  };

  const handleBack = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowSplash(true);
      setShowRegistration(false);
      fadeAnim.setValue(1);
    });
  };

  const handleRegistrationBack = () => {
    setShowRegistration(false);
  };

  const handleTermsPress = () => {
    setShowTerms(true);
  };

  const handlePrivacyPress = () => {
    setShowPrivacy(true);
  };

  const handleTermsBack = () => {
    setShowTerms(false);
  };

  const handlePrivacyBack = () => {
    setShowPrivacy(false);
  };

  if (showSplash) {
    return <AnimatedSplashScreen onNext={handleNext} />;
  }

  if (showTerms) {
    return <TermsScreen onBack={handleTermsBack} />;
  }

  if (showPrivacy) {
    return <PrivacyPolicyScreen onBack={handlePrivacyBack} />;
  }

  if (showRegistration) {
    return (
      <RegistrationScreen 
        onBack={handleRegistrationBack} 
        onTermsPress={handleTermsPress}
        onPrivacyPress={handlePrivacyPress}
      />
    );
  }

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <OnboardingCarousel onComplete={handleComplete} onBack={handleBack} />
    </Animated.View>
  );
}
