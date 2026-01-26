import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import GoogleSvg from '../assets/images/google.svg';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handlePhoneChange = (text: string) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/[^0-9]/g, '');
    let formatted = cleaned;
    if (cleaned.length > 3 && cleaned.length <= 6) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else if (cleaned.length > 6) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
    setPhoneNumber(formatted);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>LOGIN</Text>
      <View style={styles.inputContainer}>
        <View style={styles.phoneRow}>
          <Text style={styles.countryCode}>+ 1</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="Phone Number"
            placeholderTextColor="#BDBDBD"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            maxLength={12}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />
        </View>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#BDBDBD"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.rememberMeRow}>
        <Text style={styles.rememberMeText}>Remember Me</Text>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setRememberMe((prev) => !prev)}
        >
          <View style={[styles.checkboxBox, rememberMe && styles.checkboxChecked]}>
            {rememberMe && (
              <Text style={{ color: '#2196F3', fontSize: 16, fontWeight: 'bold', textAlign: 'center', lineHeight: 18, marginTop: -3 }}>✓</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      {/* Removed LoginButtonSvg for cleaner UI */}
      {/* New blue Login button below Remember Me */}
      <TouchableOpacity
        style={styles.googleBtn}
        onPress={() => router.push('/homepage')}
      >
        <Text style={{ color: '#A2CCF2', fontWeight: 'bold', fontSize: 16 }}>LOGIN</Text>
      </TouchableOpacity>

      {/* Divider between Login and Google button */}
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity style={styles.googleBtn}>
        <View style={styles.googleBtnContent}>
          <GoogleSvg width={22} height={22} style={styles.googleIcon} />
          <Text style={styles.googleBtnText}>Continue with Google</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.appleBtn}>
        <View style={styles.appleBtnContent}>
          <Text style={styles.appleIcon}></Text>
          <Text style={styles.appleBtnText}>Continue with Apple</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
      marginBottom: 18,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#E6E9ED',
    },
    dividerText: {
      marginHorizontal: 12,
      fontSize: 15,
      color: '#B0B3B8',
      fontWeight: '500',
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#E6E9ED',
    marginBottom: 32,
    letterSpacing: 2,
    textAlign: 'center',
    textShadowColor: '#bbb',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFBFC',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#E6E9ED',
    marginBottom: 10,
    height: 44,
    paddingHorizontal: 0,
    width: '100%',
  },
  countryCode: {
    fontSize: 16,
    color: '#111827',
    paddingLeft: 18,
    paddingRight: 10,
  },
  phoneInput: {
    flex: 1,
    paddingLeft: 12,
    height: 44,
    backgroundColor: 'transparent',
    color: '#111827',
    fontSize: 16,
  },
  passwordInput: {
    backgroundColor: '#FAFBFC',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#E6E9ED',
    height: 44,
    paddingHorizontal: 12,
    color: '#111827',
    fontSize: 16,
    marginBottom: -8,
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Reduced space below
    marginTop: -2, // Move closer to password input
    alignSelf: 'flex-end',
    marginRight: 2,
  },
  rememberMeText: {
    fontSize: 14,
    color: '#222',
    marginRight: 8,
  },
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8, // Increase touch area for better sensitivity
    borderRadius: 8,
  },
  checkboxBox: {
    width: 15,
    height: 15,
    borderWidth: 1.5,
    borderColor: '#A2CCF2',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    borderColor: '#8CC7FF',
  },
  loginButton: {
    marginTop: 10,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  loginButtonText: {
    position: 'absolute',
    color: '#A2CCF2',
    fontWeight: 'bold',
    fontSize: 85,
    alignSelf: 'center',
    top: 16,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  googleBtn: {
    backgroundColor: '#fff',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginTop: 6,
    marginBottom: 10,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  googleBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleIcon: {
    fontSize: 22,
    marginRight: 10,
    color: '#4285F4',
    fontWeight: 'bold',
  },
  googleBtnText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  appleBtn: {
    backgroundColor: '#000',
    borderRadius: 28,
    marginTop: 6,
    marginBottom: 10,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  appleBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appleIcon: {
    fontSize: 22,
    color: '#fff',
    marginRight: 10,
    fontWeight: 'bold',
  },
  appleBtnText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});
