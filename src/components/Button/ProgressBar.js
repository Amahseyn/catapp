import React, { memo } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const ProgressBar = memo(({ progress }) => {
  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.progressContainer}>
      <Animated.View 
        style={[
          styles.progressFill,
          {
            width,
          }
        ]} 
      />
    </View>
  );
});

const styles = StyleSheet.create({
  progressContainer: {
    width: SIZES.progressBarWidth,
    height: SIZES.progressBarHeight,
    backgroundColor: COLORS.progressBackground,
    borderRadius: SIZES.progressBarHeight / 2,
    overflow: 'hidden',
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.progressFill,
    borderRadius: SIZES.progressBarHeight / 2,
  },
});

export default ProgressBar; 