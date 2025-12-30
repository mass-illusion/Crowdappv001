import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import AnimatedSplashScreen from "../components/AnimatedSplashScreen";
import OnboardingCarousel from "../components/OnboardingCarousel";
import RegistrationScreen from "../components/RegistrationScreen";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fadeAnim.setValue(1);
  }, [showSplash, showRegistration]);

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

  if (showSplash) {
    return <AnimatedSplashScreen onNext={handleNext} />;
  }

  if (showRegistration) {
    return <RegistrationScreen onBack={handleRegistrationBack} />;
  }

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <OnboardingCarousel onComplete={handleComplete} onBack={handleBack} />
    </Animated.View>
  );
}
