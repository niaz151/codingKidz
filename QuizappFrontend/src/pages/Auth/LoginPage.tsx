import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, Image} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {login} from './authSlice';
import {useAppDispatch} from '../../ducks/store';
import '../../assets/images/Screen_D_Line.jpg';

const LoginPage = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [numFailedLogin, setNumFailedLogin] = useState<number>(-1);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = async () => {
    setNumFailedLogin(numFailedLogin + 1);
    if (email && password) {
      return await dispatch(login({email, password}));
    } else {
      Alert.alert('Please enter email and password');
    }
  };

  const colorArr = ['#FED500', '#B767A9', '#4DB84D', '#F68B24', '#3FA6D3'];
  const colorArrLength = colorArr.length;

  const CommonComponents = (
    <>
      <View style={styles.titleGraphic}>
        <Image
          source={require('../../assets/images/Screen_D_Line.jpg')}
          style={styles.splashImg}
        />
      </View>
      <View style={styles.loginTitleWrap}>
        <Text style={styles.loginTitleText}> LOGIN INFO </Text>
      </View>
      <TextInput
        label="Email"
        value={email}
        textContentType="username"
        onChangeText={(text) => setEmail(text)}
        style={styles.textInput}
      />
      <TextInput
        label="Password"
        textContentType="password"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        style={styles.textInput}
      />
      <Button mode="contained" style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>SIGN IN </Text>
      </Button>

      <View style={styles.navContainer}>
        <TouchableOpacity
          style={[styles.navOpacity, styles.navRegister]}
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={styles.forgot}> REGISTER </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navOpacity, styles.navForgot]}
          onPress={() => {
            navigation.navigate('Forgot');
          }}>
          <Text style={styles.forgot}> FORGOT PASSWORD </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const initialLoad = (
    <View style={styles.loginContainer}>
      <View style={styles.inputContainer}>
        {CommonComponents}
      </View>
      {/* <Text style={styles.privacy}> Terms and Privacy Policy </Text> */}
    </View>
  );

  const failedAttempt = (
    <View style={styles.loginContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.loginWarning}>
          <Text> login failed </Text>
        </View>
        {CommonComponents}
      </View>
      {/* <Text style={styles.privacy}> Terms and Privacy Policy </Text> */}
    </View>
  );

  const forgotPassword = (
    <View style={styles.loginContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.loginWarning}>
          <Text> forgot password </Text>
        </View>
        {CommonComponents}
      </View>
      {/* <Text style={styles.privacy}> Terms and Privacy Policy </Text> */}
    </View>
  );

  // INITIAL PAGE LOAD
  if (numFailedLogin === -1) {
    return initialLoad;
  } else {
    // FAILED LOGIN ATTEMPT UPTO TWICE
    if (numFailedLogin <= 2) {
      return failedAttempt;
    }
    // AFTER 3 FAILED ATTEMPTS SHOW FORGOT PASSWORD BUTTON
    else {
      return forgotPassword;
    }
  }
};

const styles = StyleSheet.create({
  titleGraphic:{
    width: wp("100%"),
    height:80,
    backgroundColor:'#FED500'
  },
  splashImg:{
    marginTop:hp("-5%"),
    height: 900,
    width: 850,
  },
  loginContainer: {
    height: hp('100%'),
    width: wp('100%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'white',
  },
  inputContainer: {
    height: hp('70%'),
    width: wp('100%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: hp('-10%'),
  },
  loginTitleText: {
    fontSize: 25,
    letterSpacing: 2,
    fontWeight:'100',
    fontFamily:'Nexa Light'
  },
  textInput: {
    overflow: 'hidden',
    width: wp('55%'),
    height: 70,
    borderWidth: 1,
    borderTopWidth: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderRadius: 15,
    borderColor: '#FF671D',
    backgroundColor: 'white',
  },
  btn: {
    height: 70,
    width: wp('55%'),
    backgroundColor: '#FF671D',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingTop:5,
  },
  btnText: {
    fontFamily:'Nexa Bold',
    fontSize: 28,
  },
  navOpacity: {
    paddingTop:5,
    height: 70,
    width: wp('30%'),
    borderRadius: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navRegister: {
    backgroundColor: '#FED500',
  },
  navForgot: {
    backgroundColor: '#3FA6D3',
  },
  forgot: {
    fontFamily:'Nexa Bold',
    color: 'white',
    fontSize: 20,
  },
  privacy: {
    position: 'absolute',
    bottom: hp('15%'),
    color: '#1B6A7A',
    fontSize: 22,
  },
  loginWarning: {
    borderWidth: 1,
    borderColor: 'yellow',
    backgroundColor: 'yellow',
  },
  navContainer: {
    height: hp('20%'),
    width: wp('70%'),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});

export default LoginPage;
