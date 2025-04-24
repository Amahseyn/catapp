import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

const options = [
  { id: 'meow', label: 'Meow' },
  { id: 'purr', label: 'Purr' },
  { id: 'hiss', label: 'Hiss' },
  { id: 'growl', label: 'Growl' }
];

const OptionsModal = ({ visible, onSelect, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Choose Sound Type</Text>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionButton}
              onPress={() => {
                onSelect(option.id);
                onClose();
              }}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: COLORS.text,
    marginBottom: 20,
  },
  optionButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    color: COLORS.text,
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 10,
    padding: 15,
  },
  cancelText: {
    fontSize: 18,
    color: '#999',
  },
});

export default OptionsModal; 