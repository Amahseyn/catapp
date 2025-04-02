import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

export default StyleSheet.create({
  buttonWrapper: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
  },
  pressable: {
    marginBottom: 20,
  },
  iconContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  uploadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    position: 'absolute', // Position the progress bar absolutely
    top: -40,             // Adjust this value to move the progress bar above the button
    width: '80%',         // Set the width of the progress bar
    alignSelf: 'center',  // Center the progress bar horizontally
  },
});