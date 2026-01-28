import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface InterestsProps {
  onComplete?: () => void;
}

const Interests: React.FC<InterestsProps> = ({ onComplete }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Interests</Text>
      <TouchableOpacity onPress={onComplete} style={{ marginTop: 20, padding: 10, backgroundColor: '#eee', borderRadius: 8 }}>
        <Text>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

