import React, { useState } from 'react'
import { Alert } from 'react-native'
import { useAuth } from '../../contexts/AuthContext'
import WelcomeScreen from './WelcomeScreen'
import LoginScreen from './LoginScreen'
import OtpVerification from './OtpVerification'

type AuthScreen = 'welcome' | 'login' | 'register' | 'otp-verification'

interface AuthFlowProps {
  onAuthComplete?: () => void
}

export default function AuthFlow({ onAuthComplete }: AuthFlowProps) {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('welcome')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  
  const { signIn, signUp } = useAuth()

  const handleCreateAccount = () => {
    setIsRegistering(true)
    setCurrentScreen('register')
    // For now, go to login screen - you can replace with actual registration flow
    setCurrentScreen('login')
  }

  const handleLogin = () => {
    setIsRegistering(false)
    setCurrentScreen('login')
  }

  const handlePhoneSubmit = async (phone: string) => {
    setPhoneNumber(phone)
    
    try {
      const { error } = isRegistering 
        ? await signUp(phone) 
        : await signIn(phone)
      
      if (error) {
        Alert.alert('Error', error.message)
      } else {
        setCurrentScreen('otp-verification')
        Alert.alert('Success', `Verification code sent to ${phone}`)
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send verification code')
    }
  }

  const handleOtpVerified = () => {
    onAuthComplete?.()
  }

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome')
    setPhoneNumber('')
  }

  const handleBackToLogin = () => {
    setCurrentScreen('login')
  }

  // Render current screen
  switch (currentScreen) {
    case 'welcome':
      return (
        <WelcomeScreen
          onCreateAccount={handleCreateAccount}
          onLogin={handleLogin}
        />
      )

    case 'login':
    case 'register':
      return (
        <LoginScreen
          onBack={handleBackToWelcome}
          onLogin={handlePhoneSubmit}
          title={isRegistering ? 'CREATE ACCOUNT' : 'LOGIN'}
        />
      )

    case 'otp-verification':
      return (
        <OtpVerification
          phoneNumber={phoneNumber}
          onBack={handleBackToLogin}
          onVerified={handleOtpVerified}
        />
      )

    default:
      return (
        <WelcomeScreen
          onCreateAccount={handleCreateAccount}
          onLogin={handleLogin}
        />
      )
  }
}