import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAppSelector} from '../../ducks/store';
import {TokenService} from '../../services';

export const HomePage = () => {
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);
  const {email} = TokenService.readToken(accessToken);

  return (
    <View style={styles.container}>
      <View style={styles.welcomeWrap}>
        <Text style={[styles.welcomeText, styles.bold]}> WELCOME </Text>
        <Text style={styles.emailText}> {email}</Text>
      </View>
      <View style={styles.languageWrap}>
        <View style={styles.new}>
          <Text style={[styles.languagePrompt, styles.bold]}>
            Let's test your knowledge of ...
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#FDF9DF',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  welcomeWrap: {
    height: hp("10%"),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  welcomeText: {
    fontSize: hp("3%"),
    color: 'black',
  },
  emailText: {
    fontSize: hp("2.8%"),
    color: 'black',
  },
  roleWrap: {
    marginTop: 20,
    height: 70,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  languageWrap: {
    height: hp("70%"),
    borderColor:'black',
    borderWidth:1,
    marginTop: 40,
    width: wp('90%'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  new: {
    width: '75%',
  },
  languagePrompt: {
    textAlign: 'center',
    fontSize: hp("2.5%"),
    color: 'black',
  },
});
