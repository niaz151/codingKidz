import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import {useTokenContext} from '../../context';

const SplashPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.splashContainer}>
      <View style={styles.splashLogoTitleWrap}>
        <Text style={styles.splashLogoTitleOne}> coding </Text>
        <Text style={styles.splashLogoTitleTwo}> KIDZ </Text>
      </View>
      <View style={styles.splashLogoImgWrap}>
        <View style={styles.splashLogoCirclePortrait}>
          <Image
            source={require('../../assets/images/splash_logo.png')}
            style={styles.splashImg}
          />
        </View>
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
    fontSize: 60,
    color: 'white',
  },
  splashLogoTitleTwo: {
    fontSize: 50,
    marginLeft: -10,
    color: 'white',
  },
  splashLogoImgWrap: {
    height: 270,
    width: 270,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  splashImg: {
    height: 500,
    width: 500,
    marginTop:30
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
    fontWeight: 'bold',
    width: 250,
    marginTop: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize:25,
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
    fontSize:28,
    fontWeight:'600'
  },
  orangeText: {
    color: '#FF671D',
    fontSize:28,
    fontWeight:'600'
  },
});

export default SplashPage;
