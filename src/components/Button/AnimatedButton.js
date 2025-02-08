import React, { memo } from 'react';
import { View, Pressable, Animated, Image, ActivityIndicator } from 'react-native';
import ProgressBar from './ProgressBar';
import styles from './styles';
import { COLORS } from '../../constants/theme';

const AnimatedButton = memo(({ 
  onPressIn, 
  onPressOut, 
  isRecording, 
  isUploading,
  scaleAnim, 
  progress 
}) => {
  return (
    <View style={styles.buttonWrapper}>
      {/* Progress Bar at the Top */}
      {isRecording && <ProgressBar progress={progress} style={styles.progressBar} />}

      {/* Button Content */}
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={isUploading}
        style={styles.pressable}
      >
        <Animated.View
          style={[
            styles.iconContainer,
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          <Image
            source={require('../../../assets/catclaw.png')}
            style={styles.icon}
            resizeMode="contain"
            fadeDuration={0}
          />
          {isUploading && (
            <View style={styles.uploadingOverlay}>
              <ActivityIndicator color={COLORS.progressFill} size="large" />
            </View>
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
});

export default AnimatedButton;