import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FONTS } from '../../constants/theme';

const InstructionText = () => {
  console.log('Using font family:', FONTS.regular); // Debug log
  return (
    <Text style={styles.text}>
      Hold to Record Your Voice
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.regular,
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