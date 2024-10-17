import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';

const CustomModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal visible={isOpen} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text onPress={onClose} style={styles.closeButton}>×</Text>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    fontSize: 24,
    color: 'gray',
  },
});

export default CustomModal;
