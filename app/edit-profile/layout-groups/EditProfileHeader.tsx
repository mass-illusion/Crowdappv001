import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EditProfileHeaderProps {
  onBack: () => void;
  onPreview: () => void;
  title?: string;
  styles: any;
}

const EditProfileHeader: React.FC<EditProfileHeaderProps> = ({ onBack, onPreview, title = 'Edit Profile', styles }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={onBack} style={styles.headerIconBtn}>
      <Ionicons name="chevron-back" size={26} color="#111" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
    <TouchableOpacity onPress={onPreview} style={styles.headerIconBtn}>
      <Ionicons name="eye-outline" size={24} color="#111" />
    </TouchableOpacity>
  </View>
);

export default EditProfileHeader;
