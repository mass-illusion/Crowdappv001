import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SocialEnergyGroupProps {
  socialEnergy: string;
  setSocialEnergy: (value: string) => void;
  styles: any;
}

const SocialEnergyGroup: React.FC<SocialEnergyGroupProps> = ({
  socialEnergy,
  setSocialEnergy,
  styles
}) => {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>Social Energy</Text>
      <View style={{ height: 6 }} />
      <View style={styles.optionGroup}>
        {['Introvert', 'Ambivert', 'Extrovert'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.optionButton, socialEnergy === option && styles.optionButtonActive]}
            onPress={() => setSocialEnergy(option)}
          >
            <Text style={[styles.optionText, socialEnergy === option && styles.optionTextActive]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SocialEnergyGroup;
