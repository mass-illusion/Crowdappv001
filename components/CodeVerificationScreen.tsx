import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import NextButtonSvg from '../assets/images/nextbutton.svg';

interface CodeVerificationScreenProps {
  onNext?: () => void;
  onBack?: () => void;
  phoneNumber?: string;
}

export default function CodeVerificationScreen({ onNext, onBack, phoneNumber }: CodeVerificationScreenProps) {
  const [code, setCode] = useState('');
  const isValidCode = code.length === 6;

  return (
    <View style={styles.container}>
      {onBack && (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>ENTER CODE</Text>
      <Text style={styles.subtitle}>A 6-digit code was sent to</Text>
      <Text style={styles.phone}>{phoneNumber || '+1 (xxx) xxx-xxxx'}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.codeInput}
          placeholder="------"
          keyboardType="number-pad"
          value={code}
          onChangeText={setCode}
          maxLength={6}
        />
      </View>
      <TouchableOpacity
        style={[styles.nextButton, { opacity: isValidCode ? 1 : 0.4 }]}
        onPress={isValidCode && onNext ? onNext : undefined}
        disabled={!isValidCode}
      >
        <NextButtonSvg width={250} height={60} />
      </TouchableOpacity>
      <Text style={styles.resendText}>Didn't receive a code? <Text style={styles.resendLink}>Resend</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingTop: 200,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '300',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#D3D3D3',
    letterSpacing: 4,
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  phone: {
    fontSize: 18,
    color: '#A2CCF2',
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  codeInput: {
    width: 200,
    height: 60,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 12,
    fontSize: 32,
    textAlign: 'center',
    backgroundColor: '#FFF',
    fontWeight: '600',
    letterSpacing: 16,
  },
  nextButton: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    alignSelf: 'center',
  },
  resendText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
  resendLink: {
    color: '#5B9FD7',
    fontWeight: '600',
  },
});
