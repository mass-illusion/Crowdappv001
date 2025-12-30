import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import CrowdLogo from '../assets/images/CROWD.svg';

interface AnimatedSplashScreenProps {
  onNext: () => void;
}

export default function AnimatedSplashScreen({ onNext }: AnimatedSplashScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CrowdLogo width={350} height={120} />
        <View style={styles.mascotContainer}>
          <Image
            source={require('../assets/images/mascot 1.png')}
            style={styles.mascot}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/images/mascot2.png')}
            style={styles.mascot}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity onPress={onNext}>
          <Image
            source={require('../assets/images/clear blue button.png')}
            style={styles.getStartedButton}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 350,
    height: 120,
    marginBottom: 40,
  },
  mascotContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 0,
    marginTop: 40,
  },
  mascot: {
    width: 120,
    height: 120,
  },
  getStartedButton: {
    marginTop: 40,
    width: 300,
    height: 60,
    borderRadius: 35,
    backgroundColor: '#4A9EFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A9EFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  buttonText: {
    fontSize: 26,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
