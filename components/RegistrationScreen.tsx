import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RegisterSvg from '../assets/images/REGISTER1.svg';

interface RegistrationScreenProps {
  onBack?: () => void;
}

export default function RegistrationScreen({ onBack }: RegistrationScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendCode = () => {
    // Handle send code logic here
    console.log('Send code to:', phoneNumber);
  };

  return (
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
            <Text style={styles.dropdown}>▼</Text>
          </View>
          <TextInput
            style={styles.phoneInput}
            placeholder=""
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.sendButton} onPress={handleSendCode}>
        <Text style={styles.sendButtonText}>SEND CODE</Text>
      </TouchableOpacity>

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By entering your number, you agree to Crowd's{'\n'}
          <Text style={styles.link}>Terms & Conditions</Text> and <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingTop: 100,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
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
    backgroundColor: '#A2CCF2',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#A2CCF2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
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
    color: '#A2CCF2',
    fontWeight: '300',
  },
});
