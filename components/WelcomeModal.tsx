import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Animated } from "react-native";

const WelcomeModal: React.FC = () => {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();
  const waveAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startWaving = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveAnimation, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(waveAnimation, {
            toValue: -1,
            duration: 1600,
            useNativeDriver: true,
          }),
          Animated.timing(waveAnimation, {
            toValue: 1,
            duration: 1600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    startWaving();
  }, [waveAnimation]);

  const waveRotation = waveAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  return (
    <View style={styles.overlay}>
      <View style={styles.modalBox}>
        <Animated.Text 
          style={[
            styles.emoji, 
            { transform: [{ rotate: waveRotation }] }
          ]}
        >
          🖐️
        </Animated.Text>
        <Text style={styles.title}>Welcome {name || 'there'}!</Text>
        <Text style={styles.subtitle}>
          There's a lot to discover, but let's get your profile set up first.
        </Text>
        <TouchableOpacity style={styles.goButton} onPress={() => router.replace('/gender')}>
          <Text style={styles.goButtonText}>Let's go</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/profile')}>
          <Text style={styles.editText}>Edit name</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.38)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 28,
  },
  goButton: {
    backgroundColor: '#8CC7FF',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 12,
    width: '90%',
    alignItems: 'center',
  },
  goButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editText: {
    color: '#222',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default WelcomeModal;
