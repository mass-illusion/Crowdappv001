import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SocialStyleGroupProps {
  socialStyle: string;
  setSocialStyle: (value: string) => void;
  socialStyleOptions: string[];
  styles: any;
}

const SocialStyleGroup: React.FC<SocialStyleGroupProps> = ({
  socialStyle,
  setSocialStyle,
  socialStyleOptions,
  styles
}) => {
  return (
    <View style={styles.socialSection}>
      <View style={styles.socialSectionHeader}>
        <View style={styles.socialSectionTitleContainer}>
          <Text style={styles.socialSectionTitle}>Social Style</Text>
        </View>
      </View>
      <View style={styles.socialStyleGrid}>
        {socialStyleOptions.map((style, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.socialStyleButton,
              socialStyle === style && styles.socialStyleButtonActive
            ]}
            onPress={() => setSocialStyle(style)}
          >
            <Text style={[
              styles.socialStyleText,
              socialStyle === style && styles.socialStyleTextActive
            ]}>{style}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SocialStyleGroup;
