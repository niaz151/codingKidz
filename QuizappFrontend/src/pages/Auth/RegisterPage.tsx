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
  const [nickname, setNickname] = useState<String>();
  const [role, setRole] = useState<Roles>();
  const [months, setMonths] = useState<any>(monthData);
  const [days, setDays] = useState<any>(dateData);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<any>(null);
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
          placeholder="Select A Role"
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
        <View style={styles.dateContainer}>
          <DropDownPicker
            open={false}
            items={months}
            containerStyle={styles.dateDropDownContainer}
            placeholder="JAN"
          />
          <DropDownPicker
            open={false}
            value={value}
            items={days}
            setValue={setValue}
            setItems={days}
            setOpen={setOpen}
            containerStyle={styles.dateDropDownContainer}
            placeholder="01"
          />
          <DropDownPicker
            open={false}
            value={value}
            items={days}
            setValue={setValue}
            setItems={days}
            setOpen={setOpen}
            containerStyle={styles.dateDropDownContainer}
            placeholder="2000"
          />    
        </View>
        <TextInput
          label="Nickname"
          textContentType="username"
          value={nickname}
          onChangeText={(text) => setNickname(text)}
          style={[styles.textInput, styles.email, {marginTop:10}]}
        />
        <Button mode="contained" style={styles.btn} onPress={handleSubmit}>
          SIGN UP
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.forgot}> Existing User? Log In &#8594; </Text>
        </TouchableOpacity>
        <Text style={styles.privacy}> Terms and Privacy Policy </Text>
      </View>
      
    </View>
  );
};


const monthData = [
  {label:"JAN", value:'01'},
  {label:"FEB", value:'02'},
  {label:"MAR", value:'03'},
  {label:"APR", value:'04'},
  {label:"MAY", value:'05'},
  {label:"JUN", value:'06'},
  {label:"JUL", value:'07'},
  {label:"AUG", value:'08'},
  {label:"SEP", value:'09'},
  {label:"OCT", value:'10'},
  {label:"NOV", value:'11'},
  {label:"DEC", value:'12'},
]

const dateData = [
  {label:"01", value:'01'},
  {label:"02", value:'02'},
  {label:"03", value:'03'},
  {label:"04", value:'04'},
  {label:"05", value:'05'},
  {label:"06", value:'06'},
  {label:"07", value:'07'},
  {label:"08", value:'08'},
  {label:"09", value:'09'},
  {label:"10", value:'10'},
  {label:"11", value:'11'},
  {label:"12", value:'12'},
  {label:"13", value:'13'},
  {label:"14", value:'14'},
  {label:"15", value:'15'},
  {label:"16", value:'16'},
  {label:"17", value:'17'},
  {label:"18", value:'18'},
  {label:"19", value:'19'},
  {label:"20", value:'20'},
  {label:"21", value:'21'},
  {label:"22", value:'22'},
  {label:"23", value:'23'},
  {label:"24", value:'24'},
  {label:"25", value:'25'},
  {label:"26", value:'26'},
  {label:"27", value:'27'},
  {label:"28", value:'28'},
  {label:"29", value:'29'},
  {label:"30", value:'30'},
  {label:"31", value:'31'},
]

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
    width: wp('80%'),
  },
  dropDown: {
    backgroundColor: '#fafafa',
    width: wp('80%'),
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
    color: '#1B6A7A',
    fontSize: 15,
  },
  privacy: {
    color: '#1B6A7A',
    fontSize: 14,
  },
  dateContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    width:wp('85%'),
  },
  dateDropDownContainer: {
    height: 40,
    width: wp('25%'),
  },
});

export default RegisterPage;
