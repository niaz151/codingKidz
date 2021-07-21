import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SplashSvg from '../../assets/images/splash_logo.svg';

const SplashPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.splashContainer}>
      <View style={styles.splashLogoTitleWrap}>
        <Text style={styles.splashLogoTitleOne}> coding </Text>
        <Text style={styles.splashLogoTitleTwo}> KIDZ </Text>
      </View>
      <View style={styles.splashLogoImgWrap}>
        <SplashSvg height={1200} width={1200} style={styles.splashImg} />
      </View>
      <View style={styles.splashCaptionWrap}>
        <Text style={styles.text}> Ready, Set, Code! </Text>
      </View>
      <View style={styles.btnWrap}>
        <TouchableOpacity
          style={[styles.btn, styles.loginBtn]}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.yellowText}> LOG IN </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={[styles.btn, styles.registerBtn]}>
          <Text style={styles.orangeText}> SIGN UP </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    backgroundColor: '#FF671D',
    height: hp('100%'),
    width: wp('100%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  splashLogoTitleWrap: {
    height: 80,
    width: 360,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    position: 'absolute',
    top: 100,
  },
  splashLogoTitleOne: {
    fontWeight: 'bold',
    fontFamily:'Nexa Bold',
    fontSize: 60,
    color: 'white',
  },
  splashLogoTitleTwo: {
    fontSize: 50,
    fontFamily:'Nexa Light',
    marginLeft: -25,
    color: 'white',
  },
  splashLogoImgWrap: {
    height: 500,
    width: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImg: {
    marginTop:hp("20%")
  },
  splashLogoCirclePortrait: {
    borderRadius: 200,
    width: 380,
    height: 380,
    backgroundColor: '#FCFADD',
    borderWidth: 20,
    borderColor: '#F8EB30',
    marginTop: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashCaptionWrap: {
    color: 'white',
    width: 250,
    marginTop: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize:25,
    fontFamily:'Nexa Bold',
    color: 'white',
    fontWeight:'600'
  },
  btnWrap: {
    width:500,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: hp('6%'),
  },
  btn: {
    height: 80,
    width: 180,
    borderColor: 'red',
    borderWidth: 2.5,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    color: '#F8EB30',
    borderColor: '#F8EB30',
  },
  registerBtn: {
    backgroundColor: '#F8EB30',
    borderColor: '#F8EB30',
  },
  whiteText: {
    color: 'white',
  },
  yellowText: {
    color: '#F8EB30',
    fontFamily:'Nexa Bold',
    fontSize:28,
    fontWeight:'600',
    marginTop:5,
  },
  orangeText: {
    fontFamily:'Nexa Bold',
    color: '#FF671D',
    fontSize:28,
    fontWeight:'600',
    marginTop:5,
  },
});

export default SplashPage;
