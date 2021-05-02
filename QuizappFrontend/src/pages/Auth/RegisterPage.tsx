import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, Image} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Roles} from '../../utils';

import {register} from './authSlice';
import {useAppDispatch} from '../../ducks/store';

const RegisterPage = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [role, setRole] = useState<Roles>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Password must match!');
    } else if (!password || !email || !role) {
      Alert.alert('Please fill out form');
    } else {
      return await dispatch(register({email, password, role}));
    }
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}> REGISTER </Text>
        <TextInput
          label="Email"
          textContentType="username"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={[styles.textInput, styles.email]}
        />
        <DropDownPicker
          items={[
            {label: 'Student', value: 'STUDENT'},
            {label: 'Teacher', value: 'TEACHER'},
            {label: 'Admin', value: 'ADMIN'},
          ]}
          containerStyle={styles.dropDownContainer}
          style={styles.dropDown}
          itemStyle={{
            // justifyContent: 'flex-start',
          }}
          onChangeItem={(item) => setRole(item.value)}
          placeholder="Select A Role"
          dropDownStyle={styles.dropDown}
        />
        <TextInput
          label="Password"
          value={password}
          textContentType="newPassword"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          style={[styles.textInput, styles.password]}
        />
        <TextInput
          label="Re-enter Password"
          value={confirmPassword}
          textContentType="newPassword"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
          style={[styles.textInput, styles.password]}
        />
        <Button mode="contained" style={styles.btn} onPress={handleSubmit}>
          SIGN UP
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.forgot}> Existing User? Log In &#8594; </Text>
        </TouchableOpacity>
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
  titleText: {
    color: '#FF671D',
    fontSize: 22,
    fontWeight: '700',
  },
  inputContainer: {
    height: hp('70%'),
    width: wp('100%'),
    marginTop: hp('-20%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textInput: {
    width: wp('80%'),
    height: hp('5.8%'),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FF671D',
    backgroundColor: 'white',
  },
  dropDownContainer: {
    height: 40,
    width: wp("80%"),
  },
  dropDown:{
    backgroundColor: '#fafafa', 
    width: wp("80%")
  },
  email: {},
  password: {},
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

export default RegisterPage;
