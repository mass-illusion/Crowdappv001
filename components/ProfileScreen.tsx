import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import NextButtonSvg from '../assets/images/nextbutton.svg';

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
          onPress={() => router.replace('/')} // Change '/' to your next screen route if needed
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
    marginBottom: 2,
    alignSelf: "flex-start",
    marginLeft: 16,
    width: 'auto',
    textAlign: 'center',
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
    fontSize: 13,
    color: "#222",
    marginBottom: 2,
    alignSelf: "flex-start",
    marginLeft: 0,
    width: '100%',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
    marginBottom: 24,
    width: '90%',
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;
