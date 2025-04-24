import React from 'react';
import { Animated, Image, Pressable, StyleSheet } from 'react-native';

const ButtonComponent = ({ startRecording, stopRecording, scaleAnim }) => {
  const startPulsating = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulsating = () => {
    scaleAnim.stopAnimation();
    scaleAnim.setValue(1);
  };

  return (
    <Pressable
      onPressIn={startRecording} // Start recording on press
      onPressOut={stopRecording} // Stop recording when released
    >
      <Animated.View
        style={[
          styles.iconContainer,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Image
          source={require('../../assets/catclaw.png')} // Adjust with your image path
          style={styles.icon}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
  },
  icon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

export default ButtonComponent;
