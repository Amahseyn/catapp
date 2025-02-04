import React, { useState, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const LanguageButton = ({ language, onPress }) => {
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
    <TouchableOpacity onPress={toggleLanguage} style={styles.container}>
      <Text style={styles.text}>{language}</Text>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50, // Adjust based on your layout
  },
  text: {
    color: '#A40E0E',
    fontSize: 16,
    fontFamily: 'PatrickHand-Regular',
    padding: 10,
    borderWidth: 1,
    borderColor: '#A40E0E',
    borderRadius: 10,
    textAlign: 'center',
  },
});

export default LanguageButton;
