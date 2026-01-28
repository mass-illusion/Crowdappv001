import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function ChangePassword() {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#B0B3B8" />
        </TouchableOpacity>
        <Text style={styles.title}>Change password</Text>
        <Text style={styles.subtitle}>
          Your password must be at least 6 characters and should include a combination of numbers, letters and special characters (!$@%).
        </Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Current password "
            secureTextEntry
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New password"
            secureTextEntry
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            value={retypePassword}
            onChangeText={setRetypePassword}
            placeholder="Re-type new password"
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.changeBtn}>
          <Text style={styles.changeBtnText}>Change password</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 28,
    paddingTop: 56,
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    top: 42,
    zIndex: 2,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 58,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0AEC0',
    marginBottom: 24,
    lineHeight: 20,
  },
  inputBox: {
    backgroundColor: '#F6F8FB',
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  input: {
    fontSize: 16,
    color: '#222',
    paddingVertical: 16,
  },
  forgotBtn: {
    marginTop: 4,
    marginBottom: 32,
  },
  forgotText: {
    color: '#2563EB',
    fontWeight: '500',
    fontSize: 15,
  },
  changeBtn: {
    backgroundColor: '#A9C9F7',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  changeBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});
