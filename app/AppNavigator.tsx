import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LookingForScreen from './LookingForScreen';
import Also from '../components/Also';
import AgeScreen from '../components/AgeScreen';
import GenderScreen from '../components/GenderScreen';
import UploadScreen from '../components/Upload';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LookingFor">
        <Stack.Screen name="LookingFor" component={LookingForScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Also" component={Also} options={{ headerShown: false }} />
        <Stack.Screen name="Age" component={AgeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Gender" component={GenderScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Upload" component={UploadScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
