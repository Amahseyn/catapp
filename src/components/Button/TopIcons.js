import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TopIcons = ({ onPress, language, style }) => {
  return (
    <View style={[styles.container, style]}>
      {/* Info Button (Top-Left) */}
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>
          {language === 'en' ? 'About us' : 'اطلاعات'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative', // Use relative positioning for the container
  },
  button: {
    paddingHorizontal: 16, // Add horizontal padding
    paddingVertical: 8, // Add vertical padding
    backgroundColor: '#E57778', // Background color for the button
    borderRadius: 20, // Rounded corners
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 16, // Text size
    fontFamily: 'PatrickHand-Regular-Regular', // Font family
  },
});

export default TopIcons;