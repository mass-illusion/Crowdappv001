import React from 'react';
import { View, StyleSheet } from 'react-native';

interface EditProfileLayoutProps {
  children: React.ReactNode;
  styles: any;
}

const EditProfileLayout: React.FC<EditProfileLayoutProps> = ({ children, styles }) => (
  <View style={styles.editProfileScreenContainer}>
    {children}
  </View>
);

export default EditProfileLayout;
