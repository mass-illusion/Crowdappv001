import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default function BioGroup() {
  // TODO: Add state and logic for bio
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bio</Text>
      <TextInput style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginTop: 8, minHeight: 60 }} placeholder="Tell us about yourself" multiline />
    </View>
  );
}
