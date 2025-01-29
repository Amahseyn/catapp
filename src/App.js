import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Animated, StyleSheet, Alert } from 'react-native';
import AudioRecorder from './components/AudioRecorder';
import AnimatedButton from './components/Button/AnimatedButton';
import InstructionText from './components/Text/InstructionText';
import { COLORS } from './constants/theme';
import { uploadAudio } from './services/api';

const MAX_DURATION = 6000;

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [recordingUri, setRecordingUri] = useState(null);
  const [progressAnim] = useState(new Animated.Value(0));
  const [isUploading, setIsUploading] = useState(false);
  const timeoutRef = useRef(null);
  const progressAnimRef = useRef(null);
  const isProcessingRef = useRef(false);
  const [completionAnim] = useState(new Animated.Value(0));

  const { startRecording, stopRecording } = AudioRecorder({ 
    setRecordingUri, 
    setIsRecording 
  });

  const handleUpload = async (uri) => {
    if (!uri) return;
    
    setIsUploading(true);
    try {
      await uploadAudio(uri);
      console.log('Upload successful');
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Error', 'Failed to upload audio. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const stopAnimations = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (progressAnimRef.current) {
      progressAnimRef.current.stop();
    }
    progressAnim.stopAnimation();
    scaleAnim.stopAnimation();
    scaleAnim.setValue(1);
    progressAnim.setValue(0);
  }, [scaleAnim, progressAnim]);

  const playCompletionAnimation = useCallback(() => {
    completionAnim.setValue(0);
    
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        bounciness: 12,
        speed: 12,
        useNativeDriver: true,
      }),
    ]).start(() => {
      startIdleAnimation();
    });
  }, [completionAnim, scaleAnim, startIdleAnimation]);

  const handleStopRecording = useCallback(async () => {
    if (!isRecording) return;
    
    console.log('Stopping recording at handleStopRecording');
    stopAnimations();
    const uri = await stopRecording();
    setIsRecording(false);
    
    if (uri && uri !== 'Already stopped') {
      await handleUpload(uri);
      playCompletionAnimation();
    }
  }, [isRecording, stopAnimations, stopRecording, handleUpload, playCompletionAnimation]);

  const handlePressOut = useCallback(async () => {
    if (isProcessingRef.current) return;
    
    console.log('Stopping recording and animations');
    isProcessingRef.current = true;
    await handleStopRecording();
    isProcessingRef.current = false;
  }, [handleStopRecording]);

  const startRecordingAnimation = useCallback(() => {
    stopAnimations();
    progressAnim.setValue(0);
    
    const animation = Animated.timing(progressAnim, {
      toValue: 1,
      duration: MAX_DURATION,
      useNativeDriver: false,
      easing: Animated.linear,
    });
    
    progressAnimRef.current = animation;
    
    animation.start();

    timeoutRef.current = setTimeout(() => {
      console.log('6 seconds reached, forcing stop');
      handleStopRecording();
    }, MAX_DURATION);
  }, [progressAnim, stopAnimations, handleStopRecording]);

  const handlePressIn = useCallback(async () => {
    if (isProcessingRef.current || isRecording) return;
    
    console.log('Starting recording and animations');
    isProcessingRef.current = true;
    
    const result = await startRecording();
    if (result) {
      setIsRecording(true);
      startRecordingAnimation();
    }
    
    isProcessingRef.current = false;
  }, [isRecording, startRecordingAnimation, startRecording]);

  const startIdleAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  useEffect(() => {
    if (!isRecording) {
      startIdleAnimation();
    }
    return () => stopAnimations();
  }, [isRecording, startIdleAnimation, stopAnimations]);

  useEffect(() => {
    return () => {
      stopAnimations();
      if (isRecording) {
        stopRecording();
      }
    };
  }, [stopAnimations, stopRecording, isRecording]);

  return (
    <View style={styles.container}>
      <InstructionText />
      <AnimatedButton 
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        isRecording={isRecording}
        isUploading={isUploading}
        scaleAnim={scaleAnim}
        progress={progressAnim}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingBottom: 50,
  },
});

export default App;
