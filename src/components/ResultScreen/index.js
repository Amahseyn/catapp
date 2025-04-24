import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';

const translations = {
  en: {
    resultTitle: "Sound Analysis Result",
    classificationLabel: "Detected Sound:",
    noiseMessage: "We noticed that the audio you submitted might include background noise. We recommend pointing the microphone directly at the cat and recording for about 6 seconds to capture clearer sounds",
    confirmClassificationPrompt: "Would you like to see the result?",
    keepButton: "Yes",
    discardButton: "No",
    closeButton: "Close"
  },
  fa: {
    resultTitle: "نتیجه تحلیل صدا",
    classificationLabel: "صدای تشخیص داده شده:",
    noiseMessage: "تشخیص دادیم که صدای ارسالی ممکن است مربوط به محیط باشد. پیشنهاد می‌کنیم میکروفون را مستقیماً به سمت گربه بگیرید و زمان ضبط را حدود ۶ ثانیه تنظیم کنید تا صدای واضح‌تری ثبت شود",
    confirmClassificationPrompt: "آیا مایلید نتیجه را مشاهده کنید؟",
    keepButton: "بله",
    discardButton: "خیر",
    closeButton: "بستن"
  }
};

const ResultScreen = ({ result, onClose, language = "en", onResultConfirmation }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [classification, detection] = result ? result.split(' - ') : ['', ''];
  const isNoise = detection === 'Other Sound' || detection === 'سایر';
  
  const t = translations[language] || translations.en;

  const handleConfirmation = (keepResult) => {
    onResultConfirmation?.(keepResult);
    setConfirmed(true);
    onClose();
  };

  // If noise is detected and not yet confirmed
  if (isNoise && !confirmed) {
    return (
      <View style={styles.container}>
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>{t.resultTitle}</Text>
          
          <View style={styles.resultSection}>
            <Text style={styles.noiseMessage}>{t.noiseMessage}</Text>
          </View>

          <Text style={styles.confirmPrompt}>{t.confirmClassificationPrompt}</Text>

          <View style={styles.buttonRow}>
            {/* Discard Button */}
            <TouchableOpacity 
              style={[styles.closeButton, styles.discardButton]} // Use closeButton style with custom background
              onPress={() => handleConfirmation(false)} // Discard the result
            >
              <Text style={styles.buttonText}>{t.discardButton}</Text>
            </TouchableOpacity>
            
            {/* Keep Button */}
            <TouchableOpacity 
              style={[styles.closeButton, styles.keepButton]} // Use closeButton style with custom background
              onPress={() => setConfirmed(true)} // Show classification result
            >
              <Text style={styles.buttonText}>{t.keepButton}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // If noise was confirmed or no noise detected, show the classification result
  return (
    <View style={styles.container}>
      <View style={styles.resultBox}>
        <Text style={styles.resultTitle}>{t.resultTitle}</Text>
        
        <View style={styles.resultSection}>
          <Text style={styles.resultLabel}>{t.classificationLabel}</Text>
          <Text style={styles.resultText}>{classification}</Text>
        </View>

        <TouchableOpacity 
          style={styles.closeButton}
          onPress={onClose} // Close the modal
        >
          <Text style={styles.closeButtonText}>{t.closeButton}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  resultBox: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 24,
    color: '#E57778',
    marginBottom: 20,
    fontFamily: 'PatrickHand-Regular-Regular',
    textAlign: 'center',
  },
  resultSection: {
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'PatrickHand-Regular-Regular',
    textAlign: 'center',
  },
  resultText: {
    fontSize: 20,
    color: '#E57778',
    textAlign: 'center',
    fontFamily: 'PatrickHand-Regular-Regular',
    marginBottom: 10,
  },
  noiseMessage: {
    fontSize: 16,
    color: '#E67553',
    textAlign: 'center',
    fontFamily: 'PatrickHand-Regular-Regular',
    marginBottom: 10,
  },
  confirmPrompt: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'PatrickHand-Regular-Regular',
    marginVertical: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: '#E57778', // Default close button background
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 15,
  },
  keepButton: {
    backgroundColor: '#5BA2C8', // Green background for "Keep" button
  },
  discardButton: {
    backgroundColor: '#E57778', // Red background for "Discard" button
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'PatrickHand-Regular-Regular',
    textAlign: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'PatrickHand-Regular-Regular',
  },
});

export default ResultScreen;