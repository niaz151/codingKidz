import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import PeekabooMouse from '../../assets/images/Screen_A_peekaboo_mouse-01.svg';
import Svg, {
  Circle,
  Ellipse,
  Path,
  Defs,
} from 'react-native-svg';

const ForgotPasswordPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.titleWrap}>
          <Text style={styles.titleText}>FORGOT PASSWORD?</Text>
          <Text style={styles.subTitleText}>Enter Your Email Address</Text>
        </View>
        <TextInput
          label="Email"
          value={email}
          textContentType="username"
          onChangeText={(text) => setEmail(text)}
          style={styles.textInput}
        />
        <Button mode="contained" style={styles.btn}>
          SEND
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    marginTop: hp('-10%'),
    height: hp('100%'),
    width: wp('100%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    height: 350,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleWrap: {
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleText: {
    color: '#FF671D',
    fontSize: 20,

  },
  subTitleText: {
    color: '#FF671D',
    fontSize: 18,
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
});

export default ForgotPasswordPage;
