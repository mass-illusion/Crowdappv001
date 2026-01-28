import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';

interface LoginScreenProps {
  onBack: () => void;
  onLogin?: (phoneNumber: string) => void;
  title?: string;
}

export default function LoginScreen({ onBack, onLogin, title = 'LOGIN' }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const formatPhoneNumber = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  const handleNext = () => {
    if (phoneNumber.replace(/\D/g, '').length === 10) {
      onLogin?.(phoneNumber);
    }
  };

  const isValidPhone = phoneNumber.replace(/\D/g, '').length === 10;

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* LOGIN Header */}
        <Text style={styles.loginHeader}>{title}</Text>
        
        {/* Phone Number Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.phoneInputWrapper}>
            <Text style={styles.countryCode}>+ 1</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder=""
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              maxLength={14} // (XXX) XXX-XXXX
            />
          </View>
        </View>

        {/* Remember Me Checkbox */}
        <TouchableOpacity 
          style={styles.rememberMeContainer} 
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
            {rememberMe && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.rememberMeText}>Remember Me</Text>
        </TouchableOpacity>

        {/* Next Button */}
        <TouchableOpacity 
          style={[styles.nextButton, isValidPhone && styles.nextButtonActive]} 
          onPress={handleNext}
          disabled={!isValidPhone}
        >
          <Text style={[styles.nextButtonText, isValidPhone && styles.nextButtonTextActive]}>
            NEXT
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 100,
    alignItems: 'center',
  },
  loginHeader: {
    fontSize: 48,
    fontWeight: '300',
    color: '#D3D3D3',
    letterSpacing: 8,
    marginBottom: 80,
  },
  inputSection: {
    width: '100%',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
    fontWeight: '500',
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  countryCode: {
    fontSize: 16,
    color: '#333333',
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    borderRadius: 3,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rememberMeText: {
    fontSize: 16,
    color: '#666666',
  },
  nextButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 25,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
  },
  nextButtonActive: {
    backgroundColor: '#5A90D8',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999999',
    letterSpacing: 2,
  },
  nextButtonTextActive: {
    color: '#FFFFFF',
  },
});