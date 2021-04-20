import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, Image} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {login} from '../../ducks/authSlice';
import {useAppDispatch} from '../../ducks/store';

const LoginPage = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [numFailedLogin, setNumFailedLogin] = useState<Number>(0);

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = async () => {
    if (email && password) {
      return await dispatch(login({email, password}));
    } else {
      Alert.alert('Please enter email and password');
    }
  };

  var CommonComponents = (
    <>
      <View style={styles.splashLogoImgWrap}>
        <View style={styles.splashLogoCirclePortrait}>
          <Image
            source={require('../../assets/images/splash_logo.png')}
            style={styles.splashImg}
          />
        </View>
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
        SIGN IN
      </Button>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Register');
        }}>
        <Text style={styles.forgot}> REGISTER </Text>
      </TouchableOpacity>
      <Text style={styles.forgot}> FORGOT PASSWORD? </Text>
    </>
  );

  var initialLoad = (
    <View style={styles.loginContainer}>
      <View style={styles.inputContainer}>
        {CommonComponents}
      </View>
      <Text style={styles.privacy}> Terms and Privacy Policy </Text>
    </View>
  );

  var failedAttempt = (
    <View style={styles.loginContainer}>
      <View style={styles.inputContainer}>
        {CommonComponents}
      </View>
      <Text style={styles.privacy}> Terms and Privacy Policy </Text>
    </View>
  );

  var forgotPassword = (
    <View style={styles.loginContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.loginWarning}></View>
        {CommonComponents}
      </View>
      <Text style={styles.privacy}> Terms and Privacy Policy </Text>
    </View>
  );

  // INITIAL PAGE LOAD
  if (numFailedLogin == 0) {
    return initialLoad;
  } else {
    // FAILED LOGIN ATTEMPT UPTO TWICE
    if (numFailedLogin >= 2) {
    }
    // AFTER 3 FAILED ATTEMPTS SHOW FORGOT PASSWORD BUTTON
    else {
    }
  }
};

const styles = StyleSheet.create({
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
    height: hp('60%'),
    width: wp('100%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: hp('-10%'),
  },
  splashLogoImgWrap: {
    height: 170,
    width: 170,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImg: {
    height: 190,
    width: 190,
  },
  splashLogoCirclePortrait: {
    borderRadius: 200,
    width: 170,
    height: 170,
    backgroundColor: '#FCFADD',
    borderWidth: 6,
    borderColor: '#F8EB30',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: wp('80%'),
    height: 50,
    borderWidth: 1,
    borderRadius: 0,
    borderColor: '#FF671D',
    backgroundColor: 'white',
  },
  btn: {
    height: 50,
    width: 150,
    backgroundColor: '#FF671D',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    fontSize: 15,
  },
  forgot: {
    color: '#FF671D',
    fontSize: 15,
    fontWeight: '700',
  },
  privacy: {
    position: 'absolute',
    bottom: hp('15%'),
    color: '#1B6A7A',
    fontSize: 14,
  },
  loginWarning:{
    borderWidth:1,
    borderColor:'yellow',
    backgroundColor:'yellow'
  }
});

export default LoginPage;
