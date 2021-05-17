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

 

  const [roleOpen, setRoleOpen] = useState(false);
  const onRoleOpen = () => {
    setDateOpen(false);
    setMonthOpen(false);
    setYearOpen(false);
  };
  const [role, setRole] = useState<Roles | null>(null);
  const [roleData, setRoleData] = useState(
    Object.keys(Roles).map((r) => {
      return {label: r, value: r.toUpperCase()};
    }),
  );

  const MONTHS = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  const [monthOpen, setMonthOpen] = useState(false);
  // Close all other dropdowns when opening
  const onMonthOpen = () => {
    setRoleOpen(false);
    setDateOpen(false);
    setYearOpen(false);
  };
  const [month, setMonth] = useState<number | null>(null);
  const [monthData, setMonthData] = useState(
    MONTHS.map((m, i) => {
      return {label: m, value: i};
    }),
  );

  const [dateOpen, setDateOpen] = useState(false);
  // Close all other dropdowns when opening
  const onDateOpen = () => {
    setRoleOpen(false);
    setMonthOpen(false);
    setYearOpen(false);
  };
  const [date, setDate] = useState<number | null>(null);
  const [dateData, setDateData] = useState(
    [...Array(31).keys()].map((d) => {
      return {label: String(d + 1), value: d + 1};
    }),
  );

  const [yearOpen, setYearOpen] = useState(false);
  // Close all other dropdowns when opening
  const onYearOpen = () => {
    setRoleOpen(false);
    setDateOpen(false);
    setMonthOpen(false);
  };
  const [year, setYear] = useState<number | null>(null);
  const [yearData, setYearData] = useState(
    [...Array(new Date().getFullYear()).keys()]
      .map((y) => {
        return {label: String(y), value: y};
      })
      .reverse(),
  );

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Password must match!');
    } 
    else if (!password || !email || !role || !date || !month || !year) {
      Alert.alert('Please fill out form');
    } 
    else {
      console.log('about to send', {
        email: email,
        password: password,
        role: role,
        birthday: new Date(year, month, date),
      });
      
      await dispatch(
        register({
          email: email,
          password: password,
          role: role,
          birthday: new Date(year, month, date),
        }),
      );
    }
    navigation.navigate('Profile')
  };

  return (
    <View style={styles.registerContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}> REGISTER </Text>
        <TextInput
          label="Email"
          textContentType="username"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={[styles.textInput]}
          autoCompleteType="email"
          keyboardType="email-address"
          autoCorrect={false}
        />

        <DropDownPicker
          showTickIcon={false}
          open={roleOpen}
          onOpen={onRoleOpen}
          setOpen={setRoleOpen}
          value={role}
          setValue={setRole}
          items={roleData}
          setItems={setRoleData}
          style={styles.dropDown}
          placeholder={'SELECT A ROLE'}
          placeholderStyle={styles.rolePlaceholder}
          searchable={false}
          listMode="FLATLIST"
          containerStyle={{width: wp('60%')}}
          textStyle={styles.roleText}
        />

        <TextInput
          label="Password"
          value={password}
          textContentType="newPassword"
          secureTextEntry={true}
          autoCompleteType="password"
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
            open={monthOpen}
            onOpen={onMonthOpen}
            value={month}
            setValue={setMonth}
            items={monthData}
            setItems={setMonthData}
            setOpen={setMonthOpen}
            style={styles.dateDropDownContainer}
            placeholder={'Month'}
            searchable={false}
            listMode="SCROLLVIEW"
            containerStyle={styles.dateContainerStyle}
            dropDownContainerStyle={styles.dateDropdownContainerStyle}
            onPress={() => setShowNav(false)}
            onClose={() => setShowNav(true)}
            textStyle={styles.dropDownText}
          />

          <DropDownPicker
            showTickIcon={false}
            open={dateOpen}
            setOpen={setDateOpen}
            onOpen={onDateOpen}
            value={date}
            setValue={setDate}
            items={dateData}
            setItems={setDateData}
            style={styles.dateDropDownContainer}
            placeholder={'Day'}
            searchable={false}
            listMode="FLATLIST"
            containerStyle={styles.dateContainerStyle}
            dropDownContainerStyle={styles.dateDropdownContainerStyle}
            onPress={() => setShowNav(false)}
            onClose={() => setShowNav(true)}
            textStyle={styles.dropDownText}
          />

          <DropDownPicker
            showTickIcon={false}
            open={yearOpen}
            onOpen={onYearOpen}
            value={year}
            setValue={setYear}
            items={yearData}
            setItems={setYearData}
            setOpen={setYearOpen}
            style={styles.dateDropDownContainer}
            placeholder={'Year'}
            searchable={false}
            listMode="FLATLIST"
            containerStyle={styles.dateContainerStyle}
            dropDownContainerStyle={styles.dateDropdownContainerStyle}
            onPress={() => setShowNav(false)}
            onClose={() => setShowNav(true)}
            textStyle={styles.dropDownText}
          />
        </View>

        <View style={styles.navContainer}>
          {showNav ? (
            <>
              <Button
                mode="contained"
                style={styles.signupButton}
                onPress={() => handleSubmit()}>
                <Text style={styles.signupBtnText}>WELCOME!</Text>
              </Button>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text style={styles.forgot}>
                  {' '}
                  Existing User? Log In &#8594;{' '}
                </Text>
              </TouchableOpacity>
              <Text style={styles.privacy}> Terms and Privacy Policy </Text>
            </>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
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
    letterSpacing:2
  },
  inputContainer: {
    height: hp('80%'),
    width: wp('100%'),
    marginTop: hp('-20%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textInput: {
    overflow:'hidden',
    width: wp('60%'),
    height: 70,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FF671D',
    backgroundColor: 'white',
    fontSize: 24,
  },
  dropDown: {
    width: wp('60%'),
    height: hp('5.8%'),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FF671D',
    backgroundColor: '#FED500',
  },
  roleText: {
    color: '#FF671D',
    fontWeight: '600',
    letterSpacing: 1.5,
    fontSize: 24,
  },
  rolePlaceholder:{
    marginLeft:wp("12%"),
    letterSpacing:5,
    fontSize:28,
  },
  signupButton: {
    height: 70,
    width: wp("30%"),
    backgroundColor: '#FF671D',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    fontSize: 15,
    marginLeft:wp("1%")
  },
  signupBtnText: {
    fontSize: 25,
    fontWeight:'600',
    letterSpacing:2,
  },
  forgot: {
    marginTop:50,
    color: '#1B6A7A',
    fontSize: 22,
  },
  privacy: {
    marginTop:20,
    color: '#1B6A7A',
    fontSize: 22,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: wp('80%'),
  },
  dateDropDownContainer: {
    height: hp('5.8%'),
    width: wp('25%'),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#3FA6D3',
    backgroundColor: '#3FA6D3',
  },
  dropDownText: {
    color: 'white',
    fontWeight: '600',
    letterSpacing: 2,
    fontSize: 24,
  },
  dateContainerStyle: {
    width: wp('25%'),
  },
  dateDropdownContainerStyle:{
    backgroundColor: '#3FA6D3',
    borderWidth:0
  },
  navContainer: {
    height: 140,
    borderColor: 'black',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});

export default RegisterPage;
