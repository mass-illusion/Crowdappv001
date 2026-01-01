import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Also() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Also screen.</Text>
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
