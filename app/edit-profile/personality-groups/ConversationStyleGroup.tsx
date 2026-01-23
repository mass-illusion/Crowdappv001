import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ConversationStyleGroupProps {
  conversationStyle: string;
  setConversationStyle: (value: string) => void;
  saveProfileData: () => void;
  styles: any;
}

const ConversationStyleGroup: React.FC<ConversationStyleGroupProps> = ({
  conversationStyle,
  setConversationStyle,
  saveProfileData,
  styles
}) => {
  const options = [
    { key: 'deep', label: 'Deep diver', icon: '🤿' },
    { key: 'light', label: 'Light & fun', icon: '🎈' },
    { key: 'both', label: 'Mix of both', icon: '🌊' }
  ];
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>Conversation Style</Text>
      <View style={styles.optionGroup}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[styles.moodButton, conversationStyle === option.label && styles.moodButtonActive]}
            onPress={() => {
              setConversationStyle(option.label);
              saveProfileData();
            }}
          >
            <Text style={styles.moodIcon}>{option.icon}</Text>
            <Text style={[styles.moodText, conversationStyle === option.label && styles.moodTextActive]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ConversationStyleGroup;
