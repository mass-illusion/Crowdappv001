import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default function AgeGroup() {
  // TODO: Add state and logic for age
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Age</Text>
      <TextInput style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginTop: 8 }} placeholder="Enter your age" keyboardType="numeric" />
    </View>
  );
}
