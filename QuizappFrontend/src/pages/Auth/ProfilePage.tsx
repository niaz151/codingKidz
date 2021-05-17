import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, TextInput, Avatar} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';

import {useAppSelector} from '../../ducks/store';
import {TokenService} from '../../services';

const ProfilePage = () => {

  const [fname, setFname] = useState<string>('');
  const [lname, setLname] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  // const accessToken = useAppSelector((state) => state.authReducer.accessToken);
  // const {email} = TokenService.readToken(accessToken!);

  const [genderOpen, setGenderOpen] = useState();
  const [gender, setGender] = useState();
  const [genderData, setGenderData] = useState([
    {label: 'MALE', value: 'MALE'},
    {label: 'FEMALE', value: 'FEMALE'},
    {label: 'NON-BINARY', value: 'NON-BINARY'},
    {label: 'Other', value: 'Other'},
  ]);

  return(
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}> PROFILE </Text>
        <Avatar.Image size={120} source={require('../../assets/images/user_icon_gray.png')} />
        <TextInput
          label="First Name"
          textContentType="username"
          value={fname}
          onChangeText={(text) => setFname(text)}
          style={styles.textInput}
        />
        <TextInput
          label="Last Name"
          value={lname}
          textContentType="username"
          onChangeText={(text) => setLname(text)}
          style={styles.textInput}
        />
        <TextInput
          label="Nickname"
          value={nickname}
          textContentType="newPassword"
          onChangeText={(text) => setNickname(text)}
          style={styles.textInput}
        />
        <DropDownPicker
          showTickIcon={false}
          open={genderOpen!}
          value={gender!}
          items={genderData}
          setValue={setGender}
          setItems={setGenderData}
          setOpen={setGenderOpen}
          style={styles.dropDown}
          placeholder={"GENDER"}
          searchable={false}
          listMode='SCROLLVIEW'
          containerStyle={{width: wp("60%")}}
          textStyle={styles.genderText}
        />
      </View>
    </View>
  )

};

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    width: wp('100%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'white',
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
  titleText: {
    color: '#FF671D',
    fontSize:30,
    fontWeight:'500',
    letterSpacing:1
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
    width: wp('60%'),
    height: hp('5.8%'),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FF671D',
    backgroundColor: 'white',
  },
  dropDownContainer: {
    height: 80,
    width: wp('60%'),
  },
  dropDown: {
    height: 70,
    backgroundColor: '#fafafa',
    width: wp('60%'),
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
    width:wp('60%'),
  },
  dateDropDownContainer: {
    height: 40,
    width: wp('25%'),
  },
  genderText:{
    color:'#FF671D',
    fontWeight:'600',
    letterSpacing:1.5
  },
});

export default ProfilePage;
