import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity} from "react-native";
import { TextInput, Button } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const RegisterPage = () => {

  const handleChange = (txt) => {
    console.log(txt);
  }

  return (
    <View style={styles.loginContainer}>
      <View style={styles.inputContainer}>
        <TextInput label="Email" onChangeText={text => handleChange(text)} style={styles.textInput} />
        <Text style={styles.role}> Forgot Password? </Text>
        <TextInput label="Password" onChangeText={text => handleChange(text)} style={styles.textInput} />
        <TextInput label="Re-enter Password" onChangeText={text => handleChange(text)} style={styles.textInput} />
        <Text style={styles.forgot}> Existing User? Log In  </Text>
      </View>
      <Text style={styles.privacy}> Privacy Policy </Text>
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
    position: 'relative'
  },
  inputContainer:{
    height: hp("40%"),
    width: wp("100%"),
    display: "flex",
    borderWidth: 1,
    borderColor: 'black',
    alignItems: "center",
    justifyContent: "space-around"
  },
  textInput:{
    width: wp("80%"),
    height: hp("5.8%"),
    borderWidth:1,
    borderRadius: 10,
    borderColor:'#FF671D'
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
  },
  privacy:{
    position: 'absolute',
    bottom: hp("10%"),
    color: '#1B6A7A',
    fontSize: 14
  }
})

export default RegisterPage;