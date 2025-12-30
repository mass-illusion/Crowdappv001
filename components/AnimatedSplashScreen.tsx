import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

interface AnimatedSplashScreenProps {
  onNext: () => void;
}

export default function AnimatedSplashScreen({ onNext }: AnimatedSplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <SvgUri
          uri="https://raw.githubusercontent.com/mass-illusion/Crowdappv001/refs/heads/main/CROWD.svg"
          width={350}
          height={120}
          style={styles.logo}
        />
        <TouchableOpacity onPress={onNext} style={styles.buttonWrapper}>
          <SvgUri
            uri="https://raw.githubusercontent.com/mass-illusion/Crowdappv001/refs/heads/main/create%20account.svg"
            width={1500}
            height={60}
          />
        </TouchableOpacity>
        <Text style={styles.loginText}>Already have an account?</Text>
      </Animated.View>
      <Animated.View style={[styles.mascotContainer, { opacity: fadeAnim }]}>
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
      </Animated.View>
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
    marginBottom: 3,
  },
  mascotContainer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0,
  },
  mascot: {
    width: 120,
    height: 120,
  },
  buttonWrapper: {
    marginTop: 40,
  },
  loginText: {
    marginTop: 40,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A2CCF2',
    textAlign: 'center',
  },
  getStartedButton: {
    marginTop: 40,
  },
});
