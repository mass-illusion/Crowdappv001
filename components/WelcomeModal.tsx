import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface WelcomeModalProps {
  visible: boolean;
  firstName: string;
  onGo: () => void;
  onEdit: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ visible, firstName, onGo, onEdit }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.emoji}>🖐️</Text>
          <Text style={styles.title}>Welcome {firstName}!</Text>
          <Text style={styles.subtitle}>
            There’s a lot to discover, but let’s get your profile set up first.
          </Text>
          <TouchableOpacity style={styles.goButton} onPress={onGo}>
            <Text style={styles.goButtonText}>Let’s go</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onEdit}>
            <Text style={styles.editText}>Edit name</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.38)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 28,
  },
  goButton: {
    backgroundColor: '#8CC7FF',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 12,
    width: '90%',
    alignItems: 'center',
  },
  goButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editText: {
    color: '#222',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default WelcomeModal;
