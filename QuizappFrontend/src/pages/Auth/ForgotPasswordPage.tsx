import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import MouseHouse from '../../assets/images/mouse_house.svg';

const ForgotPasswordPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>();

  return (
    <View style={styles.container}>
      <View style={styles.lightGuard}>
        <View style={styles.deepGuard}>
          <MouseHouse height={800} width={800} style={styles.img} />
        </View>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.titleWrap}>
          <Text style={styles.titleText}>FORGOT PASSWORD?</Text>
          <Text style={styles.subTitleText}>Enter Your Email Address</Text>
        </View>
        <TextInput
          label="Email"
          value={email}
          textContentType="username"
          onChangeText={(text) => setEmail(text)}
          style={styles.textInput}
        />
        <Button mode="contained" style={styles.btn}>
          <Text style={styles.btnText}> Send </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: hp('-10%'),
    height: hp('105%'),
    width: wp('100%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    height: 350,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop:hp("-10%"),
  },
  titleWrap: {
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleText: {
    fontSize: 32,
    letterSpacing:1,
    fontFamily:'Nexa Light',

  },
  subTitleText: {
    fontSize: 24,
    letterSpacing:1,
    fontFamily:'Nexa Light',
    marginTop:5,
  },
  textInput: {
    width: wp('50%'),
    height: 60,
    borderWidth: 1,
    borderTopWidth: 1,
    borderRadius: 15,
    borderColor: '#FF671D',
    backgroundColor: 'white',
    overflow: 'hidden',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    fontSize: 22, 
  },
  btn: {
    height: 65,
    width: wp('30%'),
    backgroundColor: '#FF671D',
    display: 'flex',
    marginTop:-10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingTop:5,
  },
  btnText:{
    fontFamily:'Nexa Bold',
    fontSize: 25,
  },
  lightGuard:{
    position:'absolute',
    bottom:0,
    backgroundColor:'#FDDD44',
    height: hp("35%"),
    width: wp("100%")
  },
  deepGuard:{
    position:'absolute',
    bottom:0,
    backgroundColor:'#FDD400',
    height: hp("15%"),
    width: wp("100%")
  },
  img:{
    position:'absolute',
    bottom:hp("-15%"),
    left:wp("35%"),
  }
});

export default ForgotPasswordPage;
