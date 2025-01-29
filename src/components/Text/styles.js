import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export default StyleSheet.create({
  instructionText: {
    fontFamily: 'PatrickHand-Regular',
    fontSize: SIZES.fontSize,
    color: COLORS.text,
    position: 'absolute',
    top: '50%',
    width: '100%',
    textAlign: 'center',
  },
}); 