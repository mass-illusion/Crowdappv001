import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface WeekendMoodGroupProps {
  weekendMood: string;
  setWeekendMood: (value: string) => void;
  styles: any;
}

const WeekendMoodGroup: React.FC<WeekendMoodGroupProps> = ({
  weekendMood,
  setWeekendMood,
  styles
}) => {
  const options = [
    { key: 'chill', label: 'Chill', icon: '❄️' },
    { key: 'spontaneous', label: 'Spontaneous', icon: '🎪' },
    { key: 'adventure', label: 'Adventure', icon: '🏔️' }
  ];
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>Weekend Mood</Text>
      <View style={{ height: 2 }} />
      <View style={styles.optionGroup}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[styles.moodButton, weekendMood === option.label && styles.moodButtonActive]}
            onPress={() => setWeekendMood(option.label)}
          >
            <Text style={styles.moodIcon}>{option.icon}</Text>
            <Text style={[styles.moodText, weekendMood === option.label && styles.moodTextActive]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default WeekendMoodGroup;
