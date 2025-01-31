import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Animated, StyleSheet, Alert } from 'react-native';
import AudioRecorder from './components/AudioRecorder';
import AnimatedButton from './components/Button/AnimatedButton';
import InstructionText from './components/Text/InstructionText';
import TopIcons from './components/TopIcons';
import ResultScreen from './components/ResultScreen';
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
  const [predictionResult, setPredictionResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const { startRecording, stopRecording } = AudioRecorder({ 
    setRecordingUri, 
    setIsRecording 
  });

  const handleUpload = async (uri) => {
    if (!uri) {
      console.log('No URI provided for upload');
      return;
    }
    
    setIsUploading(true);
    try {
      console.log('Starting upload with URI:', uri);
      const result = await uploadAudio(uri);
      console.log('API Response:', result);
      
      if (result && result.results) {
        const prediction = `${result.results.classification_result} - ${result.results.detection_result}`;
        console.log('Setting prediction result:', prediction);
        setPredictionResult(prediction);
        console.log('Setting showResult to true');
        setShowResult(true);
      } else {
        console.log('Invalid result format:', result);
      }
    } catch (error) {
      console.error('Upload Error:', error);
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
        toValue: 1.2,
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

  console.log('Current state:', { showResult, predictionResult }); // Debug log

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TopIcons />
        <View style={styles.bottomSection}>
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
      </View>
      {showResult && predictionResult && (
        <ResultScreen 
          result={predictionResult}
          onClose={() => {
            console.log('Closing result screen');
            setShowResult(false);
            setPredictionResult(null);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
});

export default App;
