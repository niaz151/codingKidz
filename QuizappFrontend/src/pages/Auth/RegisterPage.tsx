import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Roles} from '../../utils';
import {register} from './authSlice';
import {useAppDispatch} from '../../ducks/store';
import DropDownPicker from 'react-native-dropdown-picker';

const RegisterPage = () => {

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [showNav, setShowNav] = useState<boolean>(true);

  const [roleOpen, setRoleOpen] = useState();
  const [role, setRole] = useState();
  const [roleData, setRoleData] = useState([
    {label: 'ADMIN', value: 'ADMIN'},
    {label: 'TEACHER', value: 'TEACHER'},
    {label: 'STUDENT', value: 'STUDENT'},
  ]);

  const [monthOpen, setMonthOpen] = useState(false);
  const [month, setMonth] = useState(null);
  const [monthData, setMonthData] = useState([
    {label: 'JAN', value: '01'},
    {label: 'FEB', value: '02'},
    {label: 'MAR', value: '03'},
    {label: 'APR', value: '04'},
  ]);

  const [dateOpen, setDateOpen] = useState(false);
  const [date,setDate] = useState(null);
  const [dateData, setDateData] = useState([
    {label: '01', value: '01'},
    {label: '02', value: '02'},
    {label: '03', value: '03'},
    {label: '04', value: '04'},
  ])

  const [yearOpen, setYearOpen] = useState(false);
  const [year, setYear] = useState(null);
  const [yearData, setYearData] = useState([
    {label:"2020", value:"2020"},
    {label:"2019", value:"2019"}
  ]);
  
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
          style={[styles.textInput]}
        />

        <DropDownPicker
          showTickIcon={false}
          open={roleOpen!}
          value={role!}
          items={roleData}
          setValue={setRole}
          setItems={setRoleData}
          setOpen={setRoleOpen}
          style={styles.dropDown}
          placeholder={"SELECT A ROLE"}
          searchable={false}
          listMode='SCROLLVIEW'
          containerStyle={{width: wp("80%")}}
          textStyle={styles.roleText}
        />

        <TextInput
          label="Password"
          value={password}
          textContentType="newPassword"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          style={[styles.textInput]}
        />

        <TextInput
          label="Re-enter Password"
          value={confirmPassword}
          textContentType="newPassword"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
          style={[styles.textInput]}
        />

        <View style={styles.dateContainer}>
          <DropDownPicker
            showTickIcon={false}
            showTickIcon={false}
            open={monthOpen}
            value={month!}
            items={monthData}
            setValue={setMonth}
            setItems={setMonthData}
            setOpen={setMonthOpen}
            style={styles.dateDropDownContainer}
            placeholder={"JAN"}
            searchable={false}
            listMode='SCROLLVIEW'
            containerStyle={styles.dateDropdownContainerStyle}
            onPress={() => setShowNav(false)}
            onClose={() => setShowNav(true)}
            textStyle={styles.dropDownText}
          />

          <DropDownPicker
            showTickIcon={false}
            showTickIcon={false}
            open={dateOpen!}
            value={date!}
            items={dateData}
            setValue={setDate}
            setItems={setDateData}
            setOpen={setDateOpen}
            style={styles.dateDropDownContainer}
            placeholder={"01"}
            searchable={false}
            listMode='SCROLLVIEW'
            containerStyle={styles.dateDropdownContainerStyle}
            onPress={() => setShowNav(false)}
            onClose={() => setShowNav(true)}
            textStyle={styles.dropDownText}
          />

          <DropDownPicker
            showTickIcon={false}
            showTickIcon={false}
            open={yearOpen!}
            value={year!}
            items={yearData}
            setValue={setYear}
            setItems={setYearData}
            setOpen={setYearOpen}
            style={styles.dateDropDownContainer}
            placeholder={"2000"}
            searchable={false}
            listMode='SCROLLVIEW'
            containerStyle={styles.dateDropdownContainerStyle}
            onPress={() => setShowNav(false)}
            onClose={() => setShowNav(true)}
            textStyle={styles.dropDownText}
          />

        </View>

        <View style={styles.navContainer}>
          {showNav?(
            <>
            <Button mode="contained" style={styles.btn} onPress={handleSubmit}>
              SIGN UP
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.forgot}> Existing User? Log In &#8594; </Text>
            </TouchableOpacity>
            <Text style={styles.privacy}> Terms and Privacy Policy </Text>
            </>
          ): null}
        </View>
 
      </View>
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
  dropDown: {
    width: wp('80%'),
    height: hp('5.8%'),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FF671D',
    backgroundColor: '#FED500',
  },
  roleText:{
    color:'#FF671D',
    fontWeight:'600',
    letterSpacing:1.5
  },
  btn: {
    height: 50,
    width: 170,
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
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-around',
    width:wp("80%")
  },
  dateDropDownContainer: {
    height: hp('5.8%'),
    width: wp('26%'),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#3FA6D3',
    backgroundColor: '#3FA6D3',
  },
  dropDownText:{
    color:'black',
    fontWeight:'600',
    letterSpacing:2
  },
  dateDropdownContainerStyle:{
    width:wp("26%"),
    color:'black',
  },
  navContainer:{
    height: 140,
    borderColor:'black',
    flexDirection:'column',
    alignContent:'center',
    justifyContent:'space-around'
  }
});

export default RegisterPage;
