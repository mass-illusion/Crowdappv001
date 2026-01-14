import React, { useState, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useAuth } from '../contexts/AuthContext'

interface OtpVerificationProps {
  phoneNumber: string
  onBack: () => void
  onVerified: () => void
}

export default function OtpVerification({ phoneNumber, onBack, onVerified }: OtpVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const { verifyOtp, signIn } = useAuth()
  const inputRefs = useRef<(TextInput | null)[]>([])

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp]
    newOtp[index] = value

    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async () => {
    const otpCode = otp.join('')
    if (otpCode.length !== 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit code')
      return
    }

    setLoading(true)
    try {
      const { error } = await verifyOtp(phoneNumber, otpCode)
      if (error) {
        Alert.alert('Error', error.message)
      } else {
        onVerified()
      }
    } catch (error) {
      Alert.alert('Error', 'Verification failed. Please try again.')
    }
    setLoading(false)
  }

  const handleResend = async () => {
    try {
      const { error } = await signIn(phoneNumber)
      if (error) {
        Alert.alert('Error', error.message)
      } else {
        Alert.alert('Success', 'New code sent!')
        setOtp(['', '', '', '', '', ''])
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to resend code')
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>
          We sent a 6-digit code to {phoneNumber}
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[styles.otpInput, digit && styles.otpInputFilled]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.verifyButton, otp.join('').length === 6 && styles.verifyButtonActive]}
          onPress={handleVerify}
          disabled={loading || otp.join('').length !== 6}
        >
          <Text style={[styles.verifyText, otp.join('').length === 6 && styles.verifyTextActive]}>
            {loading ? 'Verifying...' : 'Verify'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backText: {
    fontSize: 18,
    color: '#5A90D8',
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 120,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  otpInputFilled: {
    borderColor: '#5A90D8',
  },
  verifyButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 25,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonActive: {
    backgroundColor: '#5A90D8',
  },
  verifyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999999',
  },
  verifyTextActive: {
    color: '#FFFFFF',
  },
  resendButton: {
    paddingVertical: 12,
  },
  resendText: {
    fontSize: 16,
    color: '#5A90D8',
  },
})