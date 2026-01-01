
import { useRouter } from 'expo-router';
import OnboardingCarousel from '../components/OnboardingCarousel';

export default function OnboardingScreen() {
  const router = useRouter();
  return <OnboardingCarousel onComplete={() => router.push('/Registration')} />;
}
