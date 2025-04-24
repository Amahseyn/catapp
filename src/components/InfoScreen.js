import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import { COLORS } from '../constants/theme';

const InfoScreen = ({ onClose, language }) => {
  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open link:', err)
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Title */}
        <Text style={styles.title}>
          {language === 'en' ? 'About Us' : 'درباره ما'}
        </Text>
        <TouchableOpacity onPress={onClose} style={styles.backbutton}>
          <Text style={styles.backbuttonText}>
            {language === 'en' ? 'Back' : 'برگشت'}
          </Text>
        </TouchableOpacity>

        {/* App Logo */}
        <Image
          source={require('../../assets/app_logo.png')}
          style={styles.appImage}
        />

        {/* App Description */}
        <Text style={styles.description}>
          {language === 'en'
            ? "Cat Voice Translator uses advanced AI to understand your cat's sounds. Just record your cat's voice and get instant insights into their needs and emotions."
            : "مترجم صدای گربه با هوش مصنوعی پیشرفته، صدای گربه شما را تحلیل می‌کند. کافی است صدای گربه خود را ضبط کنید تا نیازها و احساسات آن را درک کنید."}
        </Text>

        {/* Methodology */}
        <Text style={styles.sectionTitle}>
          {language === 'en' ? 'Technology' : 'فناوری'}
        </Text>
        <Text style={styles.aboutText}>
          {language === 'en'
            ? "1. Audio Processing: Converts cat sounds into spectrograms\n2. CNN Analysis: Our convolutional neural network classifies sounds into 10 core categories\n3. Real-Time Feedback: Immediate results with 88%+ accuracy"
            : "۱. پردازش صدا: تبدیل صدا به طیف‌نگاره\n۲. تحلیل CNN: شبکه عصبی کانولوشنی صداها را در ۱۰ دسته اصلی طبقه‌بندی می‌کند\n۳. بازخورد فوری: نتایج با دقت ۸۸٪+ در لحظه"}
        </Text>

        {/* How to Help Us */}
        <Text style={styles.sectionTitle}>
          {language === 'en' ? 'How to Help Us' : 'چگونه می‌توانید کمک کنید'}
        </Text>
        <Text style={styles.aboutText}>
          {language === 'en'
            ? "1. Feedback: Share your experiences to improve our app\n2. Spread the Word: Tell other cat lovers about us\n3. Data Contribution: Help train our AI with your cat's sounds (anonymous)\n4. Rate Us: Leave a review if you enjoy the app"
            : "۱. بازخورد: تجربیات خود را برای بهبود برنامه به اشتراک بگذارید\n۲. معرفی به دیگران: برنامه را به دوستانتان معرفی کنید\n۳. مشارکت داده: با صدای گربه خود به آموزش هوش مصنوعی کمک کنید (ناشناس)\n۴. امتیازدهی: اگر از برنامه راضی هستید به ما امتیاز دهید"}
        </Text>

        {/* Developer Section */}
        <Text style={styles.sectionTitle}>
          {language === 'en' ? 'Contact' : 'تماس با ما'}
        </Text>
        <View style={styles.developerContainer}>
          <Image
            source={require('../../assets/profile.jpg')}
            style={styles.developerImage}
          />
          <Text style={styles.developerName}>Mohammad Hashemi</Text>
          <Text style={styles.emailText}>mhhashemi1379@gmail.com</Text>
          <TouchableOpacity onPress={() => openLink('mailto:mhhashemi1379@gmail.com')}>
            <Text style={styles.contactLink}>
              {language === 'en' ? 'Contact Developer' : 'تماس با توسعه دهنده'}
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.teamEmailText}>Leymer Team</Text>
          <Text style={styles.emailText}>leymer.info@gmail.com</Text>
          <TouchableOpacity onPress={() => openLink('mailto:leymer.info@gmail.com')}>
            <Text style={styles.contactLink}>
              {language === 'en' ? 'Contact Team' : 'تماس با تیم'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Version */}
        <Text style={styles.versionText}>
          {language === 'en' 
            ? '© 2025 Cat Voice Translator | v1.0.4' 
            : '© ۱۴۰۴ مترجم صدای گربه | نسخه ۱.۰.۴'}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  appImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.link,
    marginBottom: 25,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 25,
    marginBottom: 10,
    textAlign: 'center',
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.link,
  },
  developerContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  developerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  developerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  teamEmailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 15,
    marginBottom: 3,
  },
  emailText: {
    fontSize: 14,
    color: COLORS.text,
    marginTop: 3,
    fontFamily: 'monospace',
  },
  contactLink: {
    fontSize: 16,
    color: COLORS.link,
    textDecorationLine: 'underline',
    marginTop: 5,
    marginBottom: 5,
  },
  versionText: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 30,
    opacity: 0.8,
  },
  backbutton: {
    position: 'absolute',
    top: 50,
    right: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#E57778',
    borderRadius: 20,
    zIndex: 10,
  },
  backbuttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'PatrickHand-Regular-Regular',
  },
});

export default InfoScreen;