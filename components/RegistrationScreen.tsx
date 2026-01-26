import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import RegisterButtonSvg from "../assets/images/REGISTER_BUTTON.svg";
import GoogleSvg from "../assets/images/google.svg";




interface RegistrationScreenProps {
  onBack?: () => void;
  onTermsPress?: () => void;
  onPrivacyPress?: () => void;
  onSendCode?: (phoneNumber: string) => void;
  onComplete?: () => void;
}

// Remove misplaced JSX from interface and move all component logic below styles declaration

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({
  onBack,
  onTermsPress,
  onPrivacyPress,
  onSendCode,
  onComplete,
}) => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // false = covered by dots (default)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordInputRef = useRef<TextInput>(null);
  const isValidPhone = phoneNumber.length >= 10;
  // Password must be at least 6 characters, contain a number and a symbol
  const passwordMeetsLength = password.length >= 6;
  const passwordHasNumber = /[0-9]/.test(password);
  const passwordHasSymbol = /[^A-Za-z0-9]/.test(password);
  const isValidPassword = passwordMeetsLength && passwordHasNumber && passwordHasSymbol;
  // Button should be enabled if phone and password are not empty
  const canSubmit = isValidPhone && password.length > 0;
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const showPasswordError = attemptedSubmit && isValidPhone && !isValidPassword;
  const showConfirmPasswordError = attemptedSubmit && isValidPassword && confirmPassword.length > 0 && password !== confirmPassword;

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

  const handleSendCode = () => {
    setAttemptedSubmit(true);
    const passwordsMatch = password === confirmPassword;
    if (isValidPhone && isValidPassword && passwordsMatch) {
      // Optionally call onSendCode(phoneNumber) if needed for backend
      router.replace('/profile');
    } else if (onSendCode && isValidPhone && isValidPassword && passwordsMatch) {
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
        <View style={styles.formContainer}>
          <View style={[styles.titleContainer, { marginBottom: 10, marginTop: 0 }]}> 
            <Text style={styles.uploadTitle}>REGISTER</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={[styles.passwordWrapper, { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 0, paddingVertical: 0 }]}> 
              <View style={[styles.countryCodeContainer, { height: 56, borderRightWidth: 1, borderRightColor: '#E6E9ED', paddingLeft: 18, paddingRight: 10, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }]}> 
                <Text style={styles.countryCode}>+1</Text>
              </View>
              <TextInput
                style={[styles.phoneInput, { flex: 1, paddingLeft: 12, height: 56, backgroundColor: 'transparent', color: '#111827', fontSize: 16 }]}
                placeholder="Phone Number"
                placeholderTextColor="#BDBDBD"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                maxLength={12}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
                blurOnSubmit={false}
              />
            </View>
            <View style={[styles.passwordWrapper, { marginTop: 0 }]}> 
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  ref={passwordInputRef}
                  style={[styles.passwordInput, { flex: 1, marginBottom: 0 }]}
                  placeholder="Create Password"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                  style={{ paddingHorizontal: 18, paddingVertical: 16 }}
                  accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="#CCCCCC"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.passwordWrapper, { marginTop: 0 }]}> 
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={[styles.passwordInput, { flex: 1, marginBottom: 0 }]}
                  placeholder="Confirm Password"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                  style={{ paddingHorizontal: 18, paddingVertical: 16 }}
                  accessibilityLabel={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="#CCCCCC"
                  />
                </TouchableOpacity>
              </View>
            </View>
            {showPasswordError && (
              <Text style={{ color: '#E57373', fontSize: 13, marginTop: 4, marginLeft: 6 }}>
                Password must be at least 6 characters, include a number and a symbol.
              </Text>
            )}
            {showConfirmPasswordError && (
              <Text style={{ color: '#E57373', fontSize: 13, marginTop: 4, marginLeft: 6 }}>
                Passwords do not match.
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={[styles.sendButton, password.length > 0 && styles.sendButtonActive, { opacity: password.length > 0 ? 1 : 0.4, marginTop: 36 }]}
          onPress={handleSendCode}
          disabled={!canSubmit}
        >
          <RegisterButtonSvg width={800} height={80} />
        </TouchableOpacity>
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
By signing up, you agree to Crowd's{'\n'}
<Text style={styles.link} onPress={() => router.push('/terms')}>Terms & Conditions</Text> and <Text style={styles.link} onPress={() => router.push('/privacy-policy')}>Privacy Policy</Text>
          </Text>
        </View>
        {/* Divider with 'or' below legal text */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>
        {/* Google and Apple Auth Buttons */}
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
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;


const styles = StyleSheet.create({
 uploadTitle: {
 fontSize: 52,
 fontWeight: 'bold',
 color: '#E6E9ED',
 marginBottom: 0,
 alignSelf: 'center',
 letterSpacing: 2,
 textShadowColor: '#bbb',
 textShadowOffset: { width: 1, height: 1 },
 textShadowRadius: 1,
},

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingTop: 80,
  },
  formContainer: {
    marginTop: 60, // Lowered further for more vertical centering
    alignItems: 'stretch',
  },
  inputContainer: {
    marginBottom: -30,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
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
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    borderRightWidth: 1,
    borderRightColor: '#E6E9ED',
    height: 56,
    paddingVertical: 0,
    paddingLeft: 14,
  },
  countryCode: {
    fontSize: 16,
    color: '#000000',
    marginRight: 5,
  },
  phoneInput: {
    fontSize: 16,
    color: '#111827',
    backgroundColor: 'transparent',
    height: 56,
    paddingLeft: 12,
    flex: 1,
  },
  passwordWrapper: {
    backgroundColor: '#FAFBFC',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#E6E9ED',
    marginBottom: 10,
    height: 44,
    overflow: 'hidden',
    paddingHorizontal: 0,
    justifyContent: 'center',
    width: '97%',
    alignSelf: 'center',
  },
  passwordInput: {
    fontSize: 16,
    color: '#111827',
    backgroundColor: 'transparent',
    height: 56,
    paddingHorizontal: 18,
    paddingVertical: 0,
    letterSpacing: .5, // slightly increased letter spacing
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
   googleBtn: {
     backgroundColor: '#fff',
     borderRadius: 28,
     borderWidth: 1,
     borderColor: '#E0E0E0',
     marginTop: 18,
     marginBottom: 14, // increased space below Google button
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
    marginTop: 6, // slightly increased
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
    fontSize: 24, // slightly bigger
    marginRight: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  appleBtnText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});



