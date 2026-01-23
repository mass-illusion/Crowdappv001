import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface EditProfileSaveButtonProps {
  onSave: () => void;
  styles: any;
}

const EditProfileSaveButton: React.FC<EditProfileSaveButtonProps> = ({ onSave, styles }) => (
  <TouchableOpacity style={styles.saveButton} onPress={onSave}>
    <Text style={styles.saveButtonText}>Save</Text>
  </TouchableOpacity>
);

export default EditProfileSaveButton;
