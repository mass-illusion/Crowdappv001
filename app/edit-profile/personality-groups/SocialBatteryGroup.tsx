import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SocialBatteryGroupProps {
  socialBattery: string;
  setSocialBattery: (value: string) => void;
  saveProfileData: () => void;
  styles: any;
}

const SocialBatteryGroup: React.FC<SocialBatteryGroupProps> = ({
  socialBattery,
  setSocialBattery,
  saveProfileData,
  styles
}) => {
  const options = [
    { key: 'alone', label: 'Recharges alone', icon: '🔋' },
    { key: 'people', label: 'Recharges with people', icon: '⚡' },
    { key: 'mixed', label: 'Mixed', icon: '🔄' }
  ];
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>Social Battery</Text>
      <View style={styles.optionGroup}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[styles.moodButton, socialBattery === option.label && styles.moodButtonActive]}
            onPress={() => {
              setSocialBattery(option.label);
              saveProfileData();
            }}
          >
            <Text style={styles.moodIcon}>{option.icon}</Text>
            <Text style={[styles.moodText, socialBattery === option.label && styles.moodTextActive]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SocialBatteryGroup;
