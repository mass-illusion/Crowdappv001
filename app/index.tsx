
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import AgeScreen from "../components/AgeScreen";
import AnimatedSplashScreen from "../components/AnimatedSplashScreen";
import GenderScreen from "../components/GenderScreen";
import OnboardingCarousel from "../components/OnboardingCarousel";
import PrivacyPolicyScreen from "../components/PrivacyPolicyScreen";
import ProfileScreen from "../components/ProfileScreen";
import RegistrationScreen from "../components/RegistrationScreen";
import TermsScreen from "../components/TermsScreen";
import UploadScreen from "../components/Upload";
import WelcomeModal from "../components/WelcomeModal";



export default function Index() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [profileData, setProfileData] = useState<{ fullName: string; userName: string } | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [showAge, setShowAge] = useState(false);
  const [age, setAge] = useState<number | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [onboardingStarted, setOnboardingStarted] = useState(false);
  const [loadingOnboarding, setLoadingOnboarding] = useState(true);

  // Load onboarding state from AsyncStorage
  useEffect(() => {
    (async () => {
      // DEBUG: Always clear onboarding flag for testing
      await AsyncStorage.removeItem('onboardingStarted');
      const value = await AsyncStorage.getItem('onboardingStarted');
      setOnboardingStarted(value === 'true');
      setLoadingOnboarding(false);
    })();
  }, []);

  // Only show splash if onboarding hasn't started
  if (loadingOnboarding) {
    return null; // or a loading spinner
  }
  if (!onboardingStarted && !showOnboarding && !showTerms && !showPrivacy && !showProfile && !showWelcomeModal && !showGender && !showRegistration && !showAge && !showUpload) {
    return <AnimatedSplashScreen onNext={async () => {
      setShowOnboarding(true);
      setOnboardingStarted(true);
      await AsyncStorage.setItem('onboardingStarted', 'true');
    }} />;
  }

  if (showTerms) {
    return <TermsScreen onBack={() => setShowTerms(false)} />;
  }

  if (showPrivacy) {
    return <PrivacyPolicyScreen onBack={() => setShowPrivacy(false)} />;
  }

  if (showWelcomeModal && profileData) {
    return (
      <>
        <ProfileScreen
          onNext={(fullName: string, userName: string) => {
            setProfileData({ fullName, userName });
            setShowWelcomeModal(true);
            setShowProfile(false);
          }}
        />
        <WelcomeModal
          visible={showWelcomeModal}
          firstName={profileData.fullName.split(' ')[0]}
          onGo={() => {
            setShowWelcomeModal(false);
            setShowGender(true);
          }}
          onEdit={() => {}}
        />
      </>
    );
  }

  if (showProfile) {
    return (
      <ProfileScreen
        onNext={(fullName: string, userName: string) => {
          setProfileData({ fullName, userName });
          setShowProfile(false);
          setShowWelcomeModal(true);
        }}
      />
    );
  }

  if (showGender) {
    return <GenderScreen 
      onNext={(selectedGender: string) => {
        setGender(selectedGender);
        setShowGender(false);
        setShowAge(true);
      }}
      onMascotPress={() => {
        setShowGender(false);
        setShowAge(true);
      }}
      onSwipeRight={() => {
        setShowGender(false);
        setShowAge(true);
      }}
    />;
  }

  if (showAge) {
    return <AgeScreen 
      onNext={(selectedAge: number) => {
        setAge(selectedAge);
        setShowAge(false);
        setShowUpload(true);
      }}
      onBack={() => {
        setShowAge(false);
        setShowGender(true);
      }}
    />;
  }

  if (showUpload) {
    return <UploadScreen />;
  }

  // Onboarding carousel
  if (showOnboarding) {
    return <OnboardingCarousel onComplete={() => { setShowOnboarding(false); setShowRegistration(true); }} onBack={() => setShowOnboarding(false)} />;
  }

  // Registration screen
  if (showRegistration) {
    return (
      <RegistrationScreen
        onBack={() => { setShowRegistration(false); setShowOnboarding(true); }}
        onTermsPress={() => setShowTerms(true)}
        onPrivacyPress={() => setShowPrivacy(true)}
        onSendCode={() => { setShowRegistration(false); setShowProfile(true); }}
      />
    );
  }
}
