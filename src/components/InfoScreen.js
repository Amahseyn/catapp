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
  console.log("language: " , language);
  // Function to open links
  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open link:', err)
    );
  };

  return (
    <View style={styles.container}>
      {/* Close Button at the Top-Left */}


      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Title */}
        <Text style={styles.title}>
          {language === 'en' ? 'About Me' : 'درباره من'}
        </Text>
        <TouchableOpacity onPress={onClose} style={styles.backbutton}>
        <Text style={styles.backbuttonText}>
          {language === 'en' ? 'Back' : 'برگشت'}
        </Text>
      </TouchableOpacity>
        {/* Profile Image */}
        <Image
          source={require('../../assets/profile.jpg')} // Ensure this path is correct
          style={styles.profileImage}
        />

        {/* Name */}
        <Text style={styles.name}>Mohammad Hossein Hashemi</Text>

        {/* Description */}
        <Text style={styles.description}>
          {language === 'en'
            ? "Hi! I'm Mohammad Hossein, a passionate developer who loves building innovative apps. This app, Cat Voice Translator, is my way of helping you understand your feline friends better. I hope it brings you and your cat closer together!"
            : "سلام! من محمدحسین هستم، یک توسعه‌دهنده علاقه‌مند که عاشق ساختن برنامه‌های نوآورانه است. این اپلیکیشن، مترجم صدای گربه، راه من برای کمک به شما در درک بهتر دوستان گربه‌تان است. امیدوارم این برنامه شما و گربه‌تان را به هم نزدیک‌تر کند!"}
        </Text>

        {/* Mission and Vision */}
        <Text style={styles.sectionTitle}>
          {language === 'en' ? 'My Mission' : 'هدف من'}
        </Text>
        <Text style={styles.aboutText}>
          {language === 'en'
            ? "My mission is to strengthen the bond between cats and their owners by using technology to decode cat sounds. I believe that understanding your cat's voice can lead to a happier and healthier relationship with your furry friend."
            : "هدف من تقویت ارتباط بین گربه‌ها و صاحبان آن‌ها با استفاده از فناوری برای رمزگشایی صداهای گربه است. من معتقدم که درک صدای گربه‌تان می‌تواند به یک رابطه شادتر و سالم‌تر با دوست پشمالوی شما منجر شود."}
        </Text>

        {/* How It Works */}
        <Text style={styles.sectionTitle}>
          {language === 'en' ? 'How It Works' : 'چگونه کار می‌کند؟'}
        </Text>
        <Text style={styles.aboutText}>
          {language === 'en'
            ? "Using advanced machine learning algorithms, this app analyzes your cat's sounds and matches them to a database of known vocalizations. Just record your cat's voice, and the app will give you real-time insights into their mood or needs."
            : "این برنامه با استفاده از الگوریتم‌های پیشرفته یادگیری ماشین، صدای گربه شما را تحلیل کرده و آن را با یک پایگاه داده از صداهای شناخته شده مطابقت می‌دهد. فقط کافی است صدای گربه‌تان را ضبط کنید، و برنامه به شما پیشنهاد لحظه‌ای درباره حالات یا نیازهای آن می‌دهد."}
        </Text>

        {/* Why Choose This App */}
        <Text style={styles.sectionTitle}>
          {language === 'en' ? 'Why This App?' : 'چرا این برنامه؟'}
        </Text>
        <Text style={styles.aboutText}>
          {language === 'en'
            ? "This app is designed with love and care, focusing solely on understanding cat sounds. I continuously update it to ensure the best experience for you and your cat. Plus, it will always be free for my fellow Iranians!"
            : "این برنامه با عشق و دقت طراحی شده و فقط بر روی درک صدای گربه‌ها تمرکز دارد. من به طور مداوم آن را به‌روزرسانی می‌کنم تا بهترین تجربه را برای شما و گربه‌تان فراهم کنم. به علاوه، تمام تلاش من اینه که این برنامه همیشه برای هموطنان عزیز ایرانی رایگان بمونه!"}
        </Text>

        {/* Future Plans */}
        <Text style={styles.sectionTitle}>
          {language === 'en' ? 'Future Plans' : 'برنامه‌های آینده'}
        </Text>
        <Text style={styles.aboutText}>
          {language === 'en'
            ? "I'm working on new features like breed-specific sound analysis and integration with smart pet devices. Your feedback is invaluable, and I hope to make this app even better with your support!"
            : "من در حال کار روی ویژگی‌های جدیدی مثل تحلیل صدای مختص نژادهای خاص و ادغام با دستگاه‌های هوشمند حیوانات خانگی هستم. نظرات شما بسیار ارزشمند است، و امیدوارم با حمایت شما این برنامه را بهتر کنم!"}
        </Text>

        {/* Contact Information */}
        <Text style={styles.sectionTitle}>
          {language === 'en' ? 'Contact Me' : 'تماس با من'}
        </Text>
        <TouchableOpacity onPress={() => openLink('mailto:mhhashemi1379@gmail.com')}>
          <Text style={styles.link}>mhhashemi1379@gmail.com</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Styles (unchanged)
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
  backbutton: {
    position: 'absolute',
    top: 50,
    right: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#E57778',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  backbuttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'PatrickHand-Regular', // Ensure this font is correctly imported
  },
});

export default InfoScreen;