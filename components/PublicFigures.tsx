import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface PublicFiguresProps {
  onComplete?: () => void;
}

const PublicFigures: React.FC<PublicFiguresProps> = ({ onComplete }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Public Figures</Text>
      <TouchableOpacity onPress={onComplete} style={{ marginTop: 20, padding: 10, backgroundColor: '#eee', borderRadius: 8 }}>
        <Text>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PublicFigures;
