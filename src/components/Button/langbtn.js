import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const LanguageButton = ({ language, onPress, style }) => {
  const toggleRef = useRef(false); // Ref to prevent rapid clicks

  const toggleLanguage = () => {
    if (toggleRef.current) return; // Prevent multiple calls in quick succession

    toggleRef.current = true; // Lock toggle
    console.log('Language toggled!');

    onPress(); // Call the passed in `onPress` function to change language

    // Reset the toggleRef after a short delay (300ms debounce)
    setTimeout(() => {
      toggleRef.current = false;
    }, 300); // Adjust debounce time as needed
  };

  return (
    <TouchableOpacity onPress={toggleLanguage} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{language}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default LanguageButton;