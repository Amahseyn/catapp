import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const TopIcons = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Text style={styles.text1}>Info</Text>
        <Image 
          source={require('../../assets/icon3.png')} 
          style={styles.icon1}
          resizeMode="contain"
        />
      </View>
      {/* <View style={styles.iconWrapper}>
        <Text style={styles.text2}>History</Text>
        <Image 
          source={require('../../assets/icon1.png')} 
          style={styles.icon2}
          resizeMode="contain"
        />
      </View> */}
      {/* <View style={styles.iconWrapper}>
        <Text style={styles.text3}>Premium</Text>
        <Image 
          source={require('../../assets/icon2.png')} 
          style={styles.icon3}
          resizeMode="contain"
        />
      </View> */}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    width: '100%',
    paddingHorizontal: 40,
    elevation: 1,
  },
  iconWrapper: {
    flex: 1,
    alignItems: 'center',
    zIndex: 2,
  },
  text1: {
    color: '#A40E0E',
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'PatrickHand-Regular',
    position: 'absolute',
    top: -6,
  },
  text2: {
    color: '#226FA7',
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'PatrickHand-Regular',
    position: 'absolute',
    top: -2,
  },
  text3: {
    color: '#BA9F0E',
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'PatrickHand-Regular',
    position: 'absolute',
    top: -15,
  },
  icon1: {
    width: 100,
    height: 100,
  },
  icon2: {
    width: 110,
    height: 110,
  },
  icon3: {
    width: 80,
    height: 80,
  },
});

export default TopIcons; 