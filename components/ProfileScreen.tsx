import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import NextButtonSvg from '../assets/images/NEXT_BUTTON.svg';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const ProfileScreen: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const isValidUserName = /^[A-Za-z0-9_-]{6,}$/.test(userName);
  const router = useRouter();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
        <Text style={styles.title}>PROFILE</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
            placeholderTextColor="#BDBDBD"
          />
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder="User Name"
            placeholderTextColor="#BDBDBD"
          />
        </View>
        {attemptedSubmit && !isValidUserName && (
          <Text style={{ color: '#E57373', fontSize: 13, marginTop: -30, marginLeft: 20 }}>
            User name must be at least 6 characters and may include letters, numbers, underscores or hyphens.
          </Text>
        )}
        <TouchableOpacity
          style={[styles.nextButton, fullName.trim().length > 0 && userName.length > 0 && styles.nextButtonActive, { opacity: fullName.trim().length > 0 && userName.length > 0 ? 1 : 0.4 }]}
          onPress={async () => {
            setAttemptedSubmit(true);
            if (!isValidUserName) return;
            const firstName = fullName.split(' ')[0] || fullName;
            try {
              await AsyncStorage.setItem('firstName', firstName);
              await AsyncStorage.setItem('fullName', fullName);
              await AsyncStorage.setItem('userName', userName);
            } catch (e) {
              console.warn('Failed saving profile data', e);
            }
            router.replace(`/welcome?name=${encodeURIComponent(firstName)}`);
          }}
          activeOpacity={0.8}
          disabled={!(fullName.trim().length > 0 && userName.length > 0)}
        >
          <NextButtonSvg width="100%" height={80} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop: 80,
    },
  title: {
 fontSize: 56,
 fontWeight: 'bold',
 color: '#E6E9ED',
 marginBottom: 8,
 alignSelf: 'center',
 letterSpacing: 2,
 textShadowColor: '#bbb',
 textShadowOffset: { width: 1, height: 1 },
 textShadowRadius: 1,
},

    nextButton: {
      marginTop: 32,
      width: '100%',
      height: 80,
      alignItems: "center",
      justifyContent: "center",
    },
    nextButtonActive: {
      // Add any additional styles for the active state if needed
      // For example, you can add a shadow or change background color
      // backgroundColor: '#E6E9ED',
    },
    inputContainer: {
      width: '100%',
      marginBottom: 32,
      alignItems: 'center',
    },
    label: {
      fontSize: 14,
      color: "#000000",
      marginBottom: 1,
      fontWeight: '500',
      alignSelf: "flex-start",
      marginLeft: '5%',
      width: '90%',
      textAlign: 'left',
    },
    input: {
      borderWidth: 1,
      borderColor: "#CCCCCC",
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 15,
      fontSize: 16,
      marginBottom: 24,
      width: '90%',
      backgroundColor: '#fff',
    },
  });

export default ProfileScreen;
