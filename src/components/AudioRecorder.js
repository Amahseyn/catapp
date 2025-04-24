import React, { useRef } from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import { Platform, PermissionsAndroid } from 'react-native';

const audioRecorderPlayer = new AudioRecorderPlayer();

const AudioRecorder = ({ setRecordingUri, setIsRecording, isRecording }) => {
  const recordSubscriptionRef = useRef(null);

  const checkAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone to record audio',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const startRecording = async () => {
    console.log('Starting recording...');
    try {
      await audioRecorderPlayer.stopRecorder();
      if (recordSubscriptionRef.current) {
        recordSubscriptionRef.current.remove();
        recordSubscriptionRef.current = null;
      }

      if (Platform.OS === 'android') {
        const hasPermission = await checkAndroidPermission();
        if (!hasPermission) {
          console.log('No permission to record');
          return null;
        }
      }

      const path = Platform.select({
        ios: 'recording.m4a',
        android: `${RNFS.CachesDirectoryPath}/recording.m4a`,
      });

      console.log('Recording path:', path);

      const uri = await audioRecorderPlayer.startRecorder(path);
      console.log('Started recording at:', uri);

      recordSubscriptionRef.current = audioRecorderPlayer.addRecordBackListener((e) => {
        console.log('Recording duration:', e.currentPosition);
      });

      setIsRecording(true);
      return uri;
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
      return null;
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording...');
    try {
      if (!isRecording) {
        console.log('Already stopped');
        return null;
      }

      if (recordSubscriptionRef.current) {
        recordSubscriptionRef.current.remove();
        recordSubscriptionRef.current = null;
      }

      const result = await audioRecorderPlayer.stopRecorder();
      console.log('Recording stopped, result:', result);
      setIsRecording(false);

      if (result && result !== 'Already stopped') {
        setRecordingUri(result);
        return result;
      }
      return null;
    } catch (error) {
      console.error('Error stopping recording:', error);
      setIsRecording(false);
      return null;
    }
  };

  return { startRecording, stopRecording };
};

export default AudioRecorder;