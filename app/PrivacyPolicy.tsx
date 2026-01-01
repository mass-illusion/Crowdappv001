import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PrivacyPolicy() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Privacy Policy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    color: '#333',
  },
});
