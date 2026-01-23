import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default function NameGroup() {
  // TODO: Add state and logic for name
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Name</Text>
      <TextInput style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginTop: 8 }} placeholder="Enter your name" />
    </View>
  );
}
