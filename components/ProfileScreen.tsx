import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import NextButtonSvg from '../assets/images/nextbutton.svg';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const router = useRouter();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
        <Text style={styles.title}>PROFILE</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder=""
            placeholderTextColor="#999"
          />
          <Text style={styles.label}>User Name</Text>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder=""
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={async () => {
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
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingBottom: 120, // Add padding to prevent overlap with button
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 140,
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    color: '#E6E9ED',
    marginBottom: 20,
    alignSelf: 'center',
    letterSpacing: 0.1,
  },
  nextButton: {
    marginTop: 32,
    width: '100%',
    height: 80,
    alignItems: "center",
    justifyContent: "center",
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
