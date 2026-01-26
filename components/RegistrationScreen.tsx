import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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
  const isValidPhone = phoneNumber.length >= 10;

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
    if (onSendCode && isValidPhone) {
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
          <Text style={styles.uploadTitle}>REGISTER</Text>
        </View>
        <View style={styles.inputContainer}>
          
          <View style={styles.passwordWrapper}>
            <View style={[styles.countryCodeContainer, { height: 56 }]}> 
              <Text style={styles.countryCode}>+1</Text>
            </View>
            <TextInput
              style={[styles.phoneInput, { paddingLeft: 0 }]}
              placeholder="Phone Number"
              placeholderTextColor="#BDBDBD"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              maxLength={12}
            />
          </View>
          <View style={[styles.passwordWrapper, { marginTop: 24 }]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Create Password"
              placeholderTextColor="#BDBDBD"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.sendButton, isValidPhone && styles.sendButtonActive, { opacity: isValidPhone ? 1 : 0.4 }]}
          onPress={handleSendCode}
          disabled={!isValidPhone}
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
            <Text style={styles.appleIcon}></Text>
            <Text style={styles.appleBtnText}>Continue with Apple</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;


const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#FFFFFF',
   paddingHorizontal: 30,
   paddingTop: 150,
 },
 inputContainer: {
   marginBottom: 24,
 },
 titleContainer: {
   alignItems: 'center',
   marginBottom: 20,
 },
 uploadTitle: {
   fontSize: 56,
   fontWeight: 'bold',
   color: '#E6E9ED',
   marginBottom: -4,
   alignSelf: 'center',
   letterSpacing: 2,
   textShadowColor: '#bbb',
   textShadowOffset: { width: 1, height: 1 },
   textShadowRadius: 1,
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
// phoneInputWrapper removed, use passwordWrapper for both
 countryCodeContainer: {
   justifyContent: 'center',
   alignItems: 'center',
   paddingRight: 5,
   paddingLeft: 18,
   height: 56,
   backgroundColor: 'transparent',
 },
 countryCode: {
   fontSize: 16,
   color: '#000000',
   marginRight: 5,
 },

  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    backgroundColor: 'transparent',
    height: 56,
    paddingVertical: 0,
    paddingLeft: 14,
  },
  passwordWrapper: {
    backgroundColor: '#FAFBFC',
    borderRadius: 7, // reduced from 10
    borderWidth: 1,
    borderColor: '#E6E9ED',
    marginBottom: 18,
    height: 56,
    overflow: 'hidden',
    paddingHorizontal: 0,
    justifyContent: 'center',
    width: '105%', // make slightly longer
    alignSelf: 'center',
  },
  passwordInput: {
    fontSize: 16,
    color: '#111827',
    backgroundColor: 'transparent',
    height: 56,
    paddingHorizontal: 18,
    paddingVertical: 0,
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
     marginBottom: 9, // slightly increased
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



