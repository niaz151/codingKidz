import axios from 'axios';
import React, {useState, useContext} from 'react';
import {TokenContext} from '../../context';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const LoginPage = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const {
    accessToken,
    refreshToken,
    storeAccessToken,
    storeRefreshToken,
  } = useContext(TokenContext);

  const handleSubmit = async () => {
    await axios
      .post('http://localhost:8000/api/auth/login', {
        email: email,
        password: password,
      })
      .then(
        (response) => {
          storeAccessToken(response.data.access_token);
          storeRefreshToken(response.data.refresh_token);
        },
        (error) => {
          console.log('error occured', error);
          Alert.alert('Error!');
        },
      );
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.textInput}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.textInput}
        />
        <Button mode="contained" style={styles.btn} onPress={handleSubmit}>
          SIGN IN
        </Button>
        <Text style={styles.forgot}> FORGOT PASSWORD? </Text>
      </View>
      <Text style={styles.privacy}> Terms and Privacy Policy </Text>
    </View>
  );
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
    height: hp('30%'),
    width: wp('100%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textInput: {
    width: wp('80%'),
    height: 50,
    borderWidth: 1,
    borderRadius: 0,
    borderColor: '#FF671D',
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
});

export default LoginPage;
