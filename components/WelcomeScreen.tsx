import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CreateAccountButton from '../assets/images/createaccount.svg';
import Crowd4Logo from '../assets/images/crowd4.svg';

interface WelcomeScreenProps {
  onCreateAccount: () => void;
}

export default function WelcomeScreen({ onCreateAccount }: WelcomeScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* CROWD Logo */}
        <Crowd4Logo 
          width={450} 
          height={140}
        />
        
        {/* Create Account Button */}
        <TouchableOpacity onPress={onCreateAccount} style={styles.buttonContainer}>
          <CreateAccountButton width={300} height={60} />
        </TouchableOpacity>
        
        {/* Already have account text */}
        <Text style={styles.loginText}>Already have an account?</Text>
        
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
    paddingBottom: 60,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    width: 300,
    height: 120,
  },
  buttonContainer: {
    marginTop: 40,
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A2CCF2',
    textAlign: 'center',
    marginTop: 60,
  },
  mascotContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 10,
    marginTop: 80,
  },
  mascot: {
    width: 120,
    height: 120,
  },
});