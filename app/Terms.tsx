import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Terms() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Terms & Conditions</Text>
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
