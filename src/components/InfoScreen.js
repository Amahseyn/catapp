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
  // Function to open links
  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open link:', err)
    );
  };

  return (
    <View style={styles.container}>
      {/* Close Button at the Top-Left */}
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>
          {language === 'en' ? 'Back' : 'برگشت'}
        </Text>
      </TouchableOpacity>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Title */}
        <Text style={styles.title}>
          {language === 'en' ? 'About Me' : 'درباره من'}
        </Text>

        {/* Profile Image */}
        <Image
          source={require('../assets/profile.jpg')} // Ensure this path is correct
          style={styles.profileImage}
        />

        {/* Name */}
        <Text style={styles.name}>John Doe</Text> 

        {/* Description */}
        <Text style={styles.description}>
          {language === 'en'
            ? "Hi!\n I'm a passionate developer who loves building innovative apps. This app, Cat Voice Translator, is designed to help you understand your feline friends better. Feel free to reach out to me for any questions or collaborations!"
            : "سلام\n من محمدحسین هستم.\n در این اپلیکیشن سعی کردم تا بر اساس الگوریتم های هوش مصنوعی و با استفاده از صدای گربه ها نیار های اونا رو تشخیص بدم. ورژن فعلی برنامه نسخه اولیه هست و مطمئنا با استفاده از نظرات شما بسیار این برنامه پیشرفت خواهد کرد و تمام تلاش خودم رو میکنم که این محصول همیشه برای شما ایرانیان عزیز رایگان باشه.\n امیدوارم که بتونم در آینده توسعه بدم که با دقت بسیار بالاتر محدوده وسیعی از نیاز فرزندان شما رو پوشش بده. \n نظر یادتون نره!"}
        </Text>

        {/* Contact Information */}
        <Text style={styles.sectionTitle}>
          {language === 'en' ? 'Contact Me' : 'تماس با من'}
        </Text>
        <TouchableOpacity onPress={() => openLink('mailto:johndoe@example.com')}>
          <Text style={styles.link}>johndoe@example.com</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: COLORS.link,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
    color: COLORS.link,
  },
  link: {
    fontSize: 16,
    color: COLORS.link,
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  versionText: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#E57778',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'PatrickHand-Regular', // Ensure this font is correctly imported
  },
});

export default InfoScreen;