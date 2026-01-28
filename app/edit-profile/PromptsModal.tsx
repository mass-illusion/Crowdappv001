import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

interface PromptsModalProps {
  visible: boolean;
  prompt: string | null;
  promptResponses: { [key: string]: string };
  updatePromptResponse: (prompt: string, text: string) => void;
  closePromptInput: () => void;
  styles: any;
}

const PromptsModal: React.FC<PromptsModalProps> = ({
  visible,
  prompt,
  promptResponses,
  updatePromptResponse,
  closePromptInput,
  styles
}) => {
  if (!prompt) return null;
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={closePromptInput}
    >
      <TouchableWithoutFeedback onPress={closePromptInput}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{prompt}</Text>
                <TouchableOpacity 
                  style={styles.modalCloseButton}
                  onPress={closePromptInput}
                >
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.modalTextInput}
                value={promptResponses[prompt] || ''}
                onChangeText={(text) => updatePromptResponse(prompt, text)}
                multiline
                numberOfLines={6}
                autoFocus
                textAlignVertical="top"
              />
              <TouchableOpacity 
                style={styles.modalDoneButton}
                onPress={closePromptInput}
              >
                <Text style={styles.modalDoneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PromptsModal;
