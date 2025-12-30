import { useState } from "react";
import AnimatedSplashScreen from "../components/AnimatedSplashScreen";
import OnboardingCarousel from "../components/OnboardingCarousel";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <AnimatedSplashScreen onNext={() => setShowSplash(false)} />;
  }

  return <OnboardingCarousel onComplete={() => {}} />;
}
