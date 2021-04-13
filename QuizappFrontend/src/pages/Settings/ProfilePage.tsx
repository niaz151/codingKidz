import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Avatar, Button} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

import axios from 'axios';
import {useAppDispatch, useAppSelector} from '../../ducks/store';
import {logout} from '../Auth/authSlice';

import {getProfile} from './settingsSlice';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const avatar = useAppSelector(
    (state) => state.settingsReducer.profile?.avatar,
  );
  const settingsStatus = useAppSelector(
    (state) => state.settingsReducer.status,
  );

  useEffect(() => {
    console.log('useEffect profilepage');
    if (settingsStatus === 'idle') {
      dispatch(getProfile({}));
    }
  }, [dispatch, settingsStatus]);

  return (
    <View style={styles.container}>
      <View>
        {avatar ? (
          <Avatar.Image
            size={100}
            source={{
              uri: 'data:image/jpeg;base64,' + avatar?.toString('base64'),
            }}
          />
        ) : (
          <Text>Upload an avatar!</Text>
        )}
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

export default ProfilePage;
