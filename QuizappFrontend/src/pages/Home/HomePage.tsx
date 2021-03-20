import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {useAppSelector} from '../../ducks/store';

export const HomePage = () => {
  const accessToken = useAppSelector((state) => state.userReducer.accessToken);

  return (
    <View style={styles.container}>
      <View style={styles.welcomeWrap}>
        <Text style={[styles.welcomeText, styles.bold]}> WELCOME </Text>
        <Text style={styles.welcomeText}> niaz151@gmail.com !</Text>
      </View>
      <View style={styles.languageWrap}>
        <Text style={[styles.languagePrompt, styles.bold]}>
          {' '}
          WHAT LANGUAGE DO YOU WANT TO LEARN TODAY?{' '}
        </Text>
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
    backgroundColor: '#FFF9DF',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  welcomeWrap: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 20,
    color: 'black',
  },
  languageWrap: {
    height: hp('15%'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  languagePrompt: {
    fontSize: 20,
    color: 'black',
    paddingLeft: 2,
  },
});
