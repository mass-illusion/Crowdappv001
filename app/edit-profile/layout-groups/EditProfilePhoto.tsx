import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

interface EditProfilePhotoProps {
  userProfileImage: string;
  onEditPhoto: () => void;
  styles: any;
}

const EditProfilePhoto: React.FC<EditProfilePhotoProps> = ({ userProfileImage, onEditPhoto, styles }) => (
  <View style={styles.photoContainer}>
    <TouchableOpacity onPress={onEditPhoto}>
      <Image source={{ uri: userProfileImage }} style={styles.profileImageLarge} />
    </TouchableOpacity>
  </View>
);

export default EditProfilePhoto;
