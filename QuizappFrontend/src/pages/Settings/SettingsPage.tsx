import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {useAppDispatch} from '../../ducks/store';
import {logout} from '../../ducks/authSlice';
import {Button} from 'react-native-paper';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeWrap}>
        <Text style={[styles.welcomeText, styles.bold]}>
          {' '}
          Settings will be here{' '}
        </Text>
      </View>
      <Button onPress={handleLogout}>Logout</Button>
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
