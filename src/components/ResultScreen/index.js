import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';

const ResultScreen = ({ result, onClose }) => {
  // Split the result string into classification and detection
  const [classification, detection] = result ? result.split(' - ') : ['', ''];

  return (
    <View style={styles.container}>
      <View style={styles.resultBox}>
        <Text style={styles.resultTitle}>Prediction Result</Text>
        
        <View style={styles.resultSection}>
          <Text style={styles.resultLabel}>Classification:</Text>
          <Text style={styles.resultText}>{classification}</Text>
        </View>

        <View style={styles.resultSection}>
          <Text style={styles.resultLabel}>Detection:</Text>
          <Text style={styles.resultText}>{detection}</Text>
        </View>

        <TouchableOpacity 
          style={styles.closeButton}
          onPress={onClose}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  resultBox: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 28,
    color: '#E57778',
    marginBottom: 25,
    fontFamily: 'PatrickHand-Regular',
  },
  resultSection: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 20,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'PatrickHand-Regular',
  },
  resultText: {
    fontSize: 24,
    color: '#E57778',
    textAlign: 'center',
    fontFamily: 'PatrickHand-Regular',
  },
  closeButton: {
    backgroundColor: '#E57778',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'PatrickHand-Regular',
  },
});

export default ResultScreen; 