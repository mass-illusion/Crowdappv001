
import { router } from 'expo-router';
import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import CreateAccountButton from '../assets/images/create account.svg';
import Crowd4Logo from '../assets/images/crowd4.svg';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* CROWD Logo */}
        <View style={styles.logoContainer}>
          <Crowd4Logo 
            width={320} 
            height={140}
          />
        </View>

        {/* Create Account Button */}
        <TouchableOpacity
          onPress={() => router.push('/onboarding-carousel')}
          style={styles.buttonContainer}
        >
          <Image source={require('../assets/images/createaccount.webp')} style={{ width: 300, height: 60, resizeMode: 'contain' }} />
        </TouchableOpacity>

        {/* Already have account text */}
        <TouchableOpacity onPress={() => router.push('/login' as any)}>
          <Text style={styles.loginText}>Already have an account?</Text>
        </TouchableOpacity>

        {/* Mascots */}
        <View style={styles.mascotContainer}>
          <Image 
            source={require('../assets/images/mascot1.png')}
              style={[styles.mascot, { width: 112, height: 119, marginTop: 10, marginBottom: -1, transform: [{ rotate: '-1deg' }] }]}
            resizeMode="contain"
          />
          <Image 
            source={require('../assets/images/mascot3.png')}
            style={[styles.mascot, { marginBottom: -.5, transform: [{ rotate: '.5deg' }] }]}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginTop: 50,
  },
  logo: {
    width: 200,
    height: 120,
  },
  buttonContainer: {
    marginTop: 30,
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A2CCF2',
    textAlign: 'center',
    marginTop: 50,
  },
  mascotContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 22,
    marginTop: 120,
  },
  mascot: {
    width: 120,
    height: 125,
  },
});

