import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import SendCodeButton from '../sendcode4.svg';
import RegisterSvg from '../assets/images/REGISTER1.svg';

interface RegistrationScreenProps {
  onBack?: () => void;
  onTermsPress?: () => void;
  onPrivacyPress?: () => void;
  onSendCode?: (phoneNumber: string) => void;
}

export default function RegistrationScreen({ onBack, onTermsPress, onPrivacyPress, onSendCode }: RegistrationScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const isValidPhone = phoneNumber.replace(/\D/g, '').length === 10;

  const formatPhoneNumber = (text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');
    // Format as XXX-XXX-XXXX
    let formatted = cleaned;
    if (cleaned.length > 3 && cleaned.length <= 6) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else if (cleaned.length > 6) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
    return formatted;
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  const handleSendCode = () => {
    if (isValidPhone && onSendCode) {
      onSendCode(phoneNumber);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <RegisterSvg width={280} height={60} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.phoneInputWrapper}>
            <View style={styles.countryCodeContainer}>
              <Text style={styles.countryCode}>+1</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              placeholder=""
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              maxLength={12}
            />
          </View>
        </View>
        <TouchableOpacity 
          style={[styles.sendButton, isValidPhone && styles.sendButtonActive, { opacity: isValidPhone ? 1 : 0.4 }]} 
          onPress={handleSendCode}
          disabled={!isValidPhone}
        >
          <SendCodeButton width={800} height={80} />
        </TouchableOpacity>
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By entering your number, you agree to Crowd's{'\n'}
            <Text style={styles.link} onPress={onTermsPress}>Terms & Conditions</Text> and <Text style={styles.link} onPress={onPrivacyPress}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingTop: 200,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 3,
    fontWeight: '500',
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    overflow: 'hidden',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#F5F5F5',
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
  },
  countryCode: {
    fontSize: 16,
    color: '#000000',
    marginRight: 5,
  },
  dropdown: {
    fontSize: 10,
    color: '#666666',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: '#000000',
  },
  sendButton: {
    alignItems: 'center',
    marginTop: 20,
    width: 800,
    alignSelf: 'center',
  },
  sendButtonActive: {
    transform: [{ scale: 1.02 }],
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  termsContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  link: {
    color: '#A2CCF2',
    fontWeight: '600',
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
});
