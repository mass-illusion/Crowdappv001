import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CreateAccountButton from '../assets/images/createaccount.svg';
import Crowd4Logo from '../assets/images/crowd4.svg';

interface WelcomeScreenProps {
  onCreateAccount: () => void;
  onLogin: () => void;
}

export default function WelcomeScreen({ onCreateAccount, onLogin }: WelcomeScreenProps) {
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
        <TouchableOpacity onPress={onCreateAccount} style={styles.buttonContainer}>
          <CreateAccountButton width={300} height={60} />
        </TouchableOpacity>
        
        {/* Already have account text */}
        <TouchableOpacity onPress={onLogin}>
          <Text style={styles.loginText}>Already have an account?</Text>
        </TouchableOpacity>
        
        {/* Mascots */}
        <View style={styles.mascotContainer}>
          <Image 
            source={require('../assets/images/mascot1.png')} 
            style={styles.mascot}
            resizeMode="contain"
          />
          <Image 
            source={require('../assets/images/mascot2.png')} 
            style={styles.mascot}
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
    gap: 10,
    marginTop: 120,
  },
  mascot: {
    width: 120,
    height: 120,
  },
});