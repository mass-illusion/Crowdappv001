import React, { useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import NextButtonSvg from '../assets/images/nextbutton.svg';

interface ProfileScreenProps {
  onNext: (fullName: string, userName: string) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNext }) => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
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
          onPress={() => onNext(fullName, userName)}
          activeOpacity={0.8}
        >
          <NextButtonSvg width="100%" height={80} style={styles.nextButtonImage} />
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
    letterSpacing: 2,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 32,
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    color: "#333",
    marginBottom: 2,
    alignSelf: "center",
    width: '90%',
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    width: '90%',
    alignSelf: 'center',
    minWidth: 0,
    marginBottom: 16,
    height: 56,
  },
  nextButton: {
    position: "absolute",
    bottom: 30,
    left: 12,
    right: 12,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  nextButtonText: {
    width: '100%',
    marginBottom: 32,
    alignItems: 'stretch',
    zIndex: 1,
  },
});

export default ProfileScreen;
