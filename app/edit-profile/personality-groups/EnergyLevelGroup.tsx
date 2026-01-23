import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface EnergyLevelGroupProps {
  energyLevel: string;
  setEnergyLevel: (value: string) => void;
  saveProfileData: () => void;
  styles: any;
}

const EnergyLevelGroup: React.FC<EnergyLevelGroupProps> = ({
  energyLevel,
  setEnergyLevel,
  saveProfileData,
  styles
}) => {
  const options = [
    { key: 'morning', label: 'Morning person', icon: '🌅' },
    { key: 'night', label: 'Night owl', icon: '🦉' },
    { key: 'afternoon', label: 'Afternoon peak', icon: '☀️' }
  ];
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>Energy Level</Text>
      <View style={styles.optionGroup}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[styles.moodButton, energyLevel === option.label && styles.moodButtonActive]}
            onPress={() => {
              setEnergyLevel(option.label);
              saveProfileData();
            }}
          >
            <Text style={styles.moodIcon}>{option.icon}</Text>
            <Text style={[styles.moodText, energyLevel === option.label && styles.moodTextActive]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default EnergyLevelGroup;
