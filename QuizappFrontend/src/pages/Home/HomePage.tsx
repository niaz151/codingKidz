import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAppSelector} from '../../ducks/store';
import {readToken} from '../../utils';

export const HomePage = () => {
  const accessToken = useAppSelector((state) => state.userReducer.accessToken);
  const {email, roles} = readToken(accessToken);

  return (
    <View style={styles.container}>
      <View style={styles.welcomeWrap}>
        <Text style={[styles.welcomeText, styles.bold]}> WELCOME </Text> 
        <Text style={styles.welcomeText}> {email}</Text>
      </View>
      <View style={styles.roleWrap}>
        <Text style={[styles.welcomeText, styles.bold]}> YOU ARE A </Text> 
        <Text style={styles.welcomeText}> {roles}</Text>
      </View>
      <View style={styles.languageWrap}>
        <View style={styles.new}>
          <Text style={[styles.languagePrompt, styles.bold]}>
            WHAT LANGUAGE DO YOU WANT TO LEARN TODAY?
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
    backgroundColor: '#FF671D',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  welcomeWrap: {
    height: 70,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  welcomeText: {
    fontSize: 20,
    color: 'black',
  },
  roleWrap: {
    marginTop:20,
    height: 70,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  languageWrap: {
    marginTop:40,
    width:wp("90%"),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  new:{ 
    width:"75%",
  },
  languagePrompt: {
    textAlign:"center",
    fontSize: 16,
    color: 'black',
    paddingLeft: 2,
  },
});
