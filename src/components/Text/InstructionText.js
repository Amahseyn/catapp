import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FONTS } from '../../constants/theme';

const InstructionText = ({ language }) => {
  return (
    <Text style={styles.text}>
      {language === 'فارسی' ? 'برای ضبط صدا نگه دارید' : 'Hold to Record Your Voice'}
    </Text>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: "",
    fontSize: 32,
    color: '#E57778',
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    textAlign: 'center',
    transform: [{ translateY: -12 }], // Half of fontSize to perfect center
  },
});

export default InstructionText;