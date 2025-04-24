import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Animated, StyleSheet, Alert, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AudioRecorder from './components/AudioRecorder';
import AnimatedButton from './components/Button/AnimatedButton';
import InstructionText from './components/Text/InstructionText';
import TopIcons from './components/Button/TopIcons';
import ResultScreen from './components/ResultScreen';
import InfoScreen from './components/InfoScreen';
import { COLORS } from './constants/theme';
import { uploadAudio } from './services/api';
import LanguageButton from './components/Button/langbtn';

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
  const [language, setLanguage] = useState("فارسی");
  const toggleRef = useRef(false);
  const [completionAnim] = useState(new Animated.Value(0));
  const [predictionResult, setPredictionResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showInfoScreen, setShowInfoScreen] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  // Check internet connection status
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const { startRecording, stopRecording } = AudioRecorder({
    setRecordingUri,
    setIsRecording,
    isRecording,
  });

  const toggleLanguage = () => {
    if (toggleRef.current) return;
    toggleRef.current = true;
    setLanguage((prevLanguage) => {
      const newLanguage = prevLanguage === "English" ? "فارسی" : "English";
      return newLanguage;
    });
    setTimeout(() => {
      toggleRef.current = false;
    }, 50);
  };

  const handleUpload = async (uri) => {
    if (!uri || uri === 'Already stopped') {
      console.warn('No valid URI provided for upload');
      return;
    }

    if (!isConnected) {
      Alert.alert(
        language === "English" ? "Connection Error" : "خطای اتصال",
        language === "English" 
          ? "Please check your internet connection and try again." 
          : "لطفا اتصال اینترنت خود را بررسی کرده و مجددا تلاش کنید.",
        [{ text: "OK" }]
      );
      setIsUploading(false);
      return;
    }

    setIsUploading(true);
    try {
      const result = await uploadAudio(uri, language === "English" ? "en" : "fa");
      if (result && result.results) {
        const prediction = `${result.results.classification_result} - ${result.results.detection_result}`;
        setPredictionResult(prediction);
        setShowResult(true);
      } else {
        Alert.alert(
          language === "English" ? "Error" : "خطا",
          language === "English" 
            ? "Could not process the audio. Please try again." 
            : "پردازش صدا ممکن نشد. لطفا مجددا تلاش کنید.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      // console.error('Upload Error:', error);
      Alert.alert(
        language === "English" ? "Upload Failed" : "خطا در آپلود",
        language === "English" 
          ? "Failed to upload audio. Please check your connection and try again." 
          : "آپلود صدا با خطا مواجه شد. لطفا اتصال اینترنت خود را بررسی کنید.",
        [{ text: "OK" }]
      );
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
  }, [completionAnim, scaleAnim]);

  const handleStopRecording = useCallback(async () => {
    if (!isRecording) return;
    stopAnimations();
    const uri = await stopRecording();
    setIsRecording(false);
    if (uri && uri !== 'Already stopped') {
      await handleUpload(uri);
      playCompletionAnimation();
    }
  }, [isRecording, stopAnimations, stopRecording, handleUpload, playCompletionAnimation]);

  const handlePressOut = useCallback(async () => {
    if (isProcessingRef.current || !isRecording) return;
    isProcessingRef.current = true;
    await handleStopRecording();
    isProcessingRef.current = false;
  }, [handleStopRecording, isRecording]);

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
    timeoutRef.current = setTimeout(async () => {
      await handleStopRecording();
    }, MAX_DURATION);
  }, [progressAnim, stopAnimations, handleStopRecording]);

  const handlePressIn = useCallback(async () => {
    if (isProcessingRef.current || isRecording) return;
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
      {!showInfoScreen && (
        <>
          <LanguageButton
            onPress={toggleLanguage}
            language={language}
            style={styles.languageButton}
          />
          <TopIcons
            onPress={() => setShowInfoScreen(true)}
            language={language === "English" ? "en" : "fa"}
            style={styles.topIcons}
          />
          {!isConnected && (
            <View style={styles.offlineContainer}>
              <Text style={styles.offlineText}>
                {language === "English" 
                  ? "No internet connection" 
                  : "اتصال اینترنت وجود ندارد"}
              </Text>
            </View>
          )}
          <View style={styles.content}>
            <View style={styles.bottomSection}>
              <InstructionText language={language} />
              <AnimatedButton
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                isRecording={isRecording}
                isUploading={isUploading}
                scaleAnim={scaleAnim}
                progress={progressAnim}
                disabled={!isConnected}
              />
            </View>
          </View>
          {showResult && predictionResult && (
            <ResultScreen
              result={predictionResult}
              onClose={() => {
                setShowResult(false);
                setPredictionResult(null);
              }}
              language={language === "English" ? "en" : "fa"}
            />
          )}
        </>
      )}
      {showInfoScreen && (
        <InfoScreen
          onClose={() => setShowInfoScreen(false)}
          language={language === "English" ? "en" : "fa"}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  languageButton: {
    position: 'absolute',
    top: 50,
    left: 30,
    zIndex: 10,
  },
  topIcons: {
    position: 'absolute',
    top: 50,
    right: 30,
    zIndex: 10,
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 90,
  },
  offlineContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    backgroundColor: COLORS.error,
    padding: 10,
    alignItems: 'center',
    zIndex: 10,
  },
  offlineText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default App;