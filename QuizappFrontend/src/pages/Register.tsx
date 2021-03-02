import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity} from "react-native";
import { TextInput, Button } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';


const RegisterPage = () => {

  const handleChange = (txt) => {
    console.log(txt);
  }

  return (
    <View style={styles.loginContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}> REGISTER </Text>
        <TextInput label="Email" onChangeText={text => handleChange(text)} style={styles.textInput} />

        <DropDownPicker
            items={[
                {label: 'Teacher', value: 'teacher'},
                {label: 'Student', value: 'student'},
            ]}
            containerStyle={{height: 40, width: 200, marginLeft:wp("10%"),}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            placeholder="Select A Role"
            dropDownStyle={{backgroundColor: '#fafafa'}}
        />
        <TextInput label="Password" onChangeText={text => handleChange(text)} style={styles.textInput} />
        <TextInput label="Re-enter Password" onChangeText={text => handleChange(text)} style={styles.textInput} />
        <Text style={styles.forgot}> Existing User? Log In &#8594; </Text>
      </View>
      <Text style={styles.privacy}> Terms and Privacy Policy </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  loginContainer:{
    height: hp("100%"),
    width: wp("100%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
    backgroundColor:"white"
  },
  titleText:{
    alignSelf:"flex-start",
    marginLeft:wp("10%"),
    color:"#FF671D",
    fontSize:20,
    fontWeight:"700"
  },
  inputContainer:{
    height: hp("40%"),
    width: wp("100%"),
    marginTop:hp("-20%"),
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-around"
  },
  textInput:{
    width: wp("80%"),
    height: hp("5.8%"),
    borderWidth:1,
    borderRadius: 10,
    borderColor:'#FF671D',
    marginLeft:wp("10%"),
  },
  role:{

  },
  btn:{
    height: 50,
    width: 150,
    backgroundColor: '#FF671D',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    fontSize: 15,
  },
  forgot:{
    color: '#FF671D',
    fontSize: 15,
    marginLeft:wp("10%"),
  },
  privacy:{
    position: 'absolute',
    bottom: hp('15%'),
    color: '#1B6A7A',
    fontSize: 14,
  }
})

export default RegisterPage;