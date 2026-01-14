import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { useAuth } from '../../contexts/AuthContext'
import AuthFlow from './AuthFlow'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { session, loading, user } = useAuth()

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5A90D8" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )
  }

  // If no session, show auth flow or custom fallback
  if (!session || !user) {
    return fallback || <AuthFlow />
  }

  // If authenticated, show protected content
  return <>{children}</>
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
})