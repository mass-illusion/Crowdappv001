// This file is now obsolete. Navigation is handled by Expo Router's file-based routing. Remove this file to prevent conflicts.
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  LookingFor: undefined;
  Also: undefined;
  Age: undefined;
  Gender: undefined;
  Upload: undefined;
};

import { RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import AgeScreen from '../components/AgeScreen';
import Also from '../components/Also';
import AnimatedSplashScreen from '../components/AnimatedSplashScreen';
import GenderScreen from '../components/GenderScreen';
import OnboardingCarousel from '../components/OnboardingCarousel';
import UploadScreen from '../components/Upload';
import LookingForScreen from './LookingForScreen';

const Stack = createStackNavigator<RootStackParamList>();

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;
type OnboardingScreenRouteProp = RouteProp<RootStackParamList, 'Onboarding'>;

function OnboardingScreen({
  navigation,
  route,
}: {
  navigation: OnboardingScreenNavigationProp;
  route: OnboardingScreenRouteProp;
}) {
  return (
    <OnboardingCarousel
      onComplete={() => navigation.replace('LookingFor')}
      onBack={() => navigation.goBack()}
    />
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={AnimatedSplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LookingFor" component={LookingForScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Also" component={Also} options={{ headerShown: false }} />
      <Stack.Screen
        name="Age"
        component={({ navigation }: { navigation: StackNavigationProp<RootStackParamList, 'Age'> }) => (
          <AgeScreen
            onNext={() => navigation.replace('Gender')}
            onBack={() => navigation.goBack()}
          />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Gender"
        component={({
          navigation,
        }: {
          navigation: StackNavigationProp<RootStackParamList, 'Gender'>;
        }) => (
          <GenderScreen
            onNext={() => navigation.replace('Upload')}
            onMascotPress={() => {}}
            onSwipeRight={() => navigation.goBack()}
          />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Upload" component={UploadScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
