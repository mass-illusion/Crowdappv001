import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import CrowdLogo from '../assets/images/CROWD.svg';

interface AnimatedSplashScreenProps {
  onAnimationComplete: () => void;
}

export default function AnimatedSplashScreen({ onAnimationComplete }: AnimatedSplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Wait 1 second, then fade out over 1 second
    const fadeTimer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        onAnimationComplete();
      });
    }, 1000);

    return () => {
      clearTimeout(fadeTimer);
    };
  }, [fadeAnim, onAnimationComplete]);

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={styles.content}>
        <CrowdLogo width={350} height={120} />
        <View style={styles.mascotContainer}>
          <Animated.Image
            source={require('../assets/images/mascot 1.png')}
            style={styles.mascot}
            resizeMode="contain"
          />
          <Animated.Image
            source={require('../assets/images/mascot2.png')}
            style={styles.mascot}
            resizeMode="contain"
          />
        </View>
      </View>
    </Animated.View>
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
});
