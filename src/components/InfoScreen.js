import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';

const InfoScreen = ({ onClose, language }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {language === 'en' ? 'Info Screen' : 'صفحه اطلاعات'}
      </Text>
      <Text style={styles.subtitle}>
        {language === 'en'
          ? 'This is an example of a full-screen info screen.'
          : 'این نمونه‌ای از صفحه اطلاعات تمام‌صفحه است.'}
      </Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>
          {language === 'en' ? 'Close' : 'بستن'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Full-screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default InfoScreen;