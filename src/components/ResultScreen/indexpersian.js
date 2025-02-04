import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';
const PerisanResultScreen = ({ result, onClose }) => {
    // Split the result string into classification and detection
    const [classification, detection] = result ? result.split(' - ') : ['', ''];
  
    return (
      <View style={styles.container}>
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Prediction Result</Text>
          
          <View style={styles.resultSection}>
            <Text style={styles.resultLabel}>صدا:</Text>
            <Text style={styles.resultText}>{صدا}</Text>
          </View>
  
          <View style={styles.resultSection}>
            <Text style={styles.resultLabel}>تشخیص:</Text>
            <Text style={styles.resultText}>{تشخیص}</Text>
          </View>
  
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>بستن</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

export default PerisanResultScreen;