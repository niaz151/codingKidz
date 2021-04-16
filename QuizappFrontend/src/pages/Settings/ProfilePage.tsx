import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Avatar, Button} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

import {useAppDispatch, useAppSelector} from '../../ducks/store';

import {getProfile, uploadAvatar} from './settingsSlice';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.settingsReducer.profile);

  const settingsStatus = useAppSelector(
    (state) => state.settingsReducer.status,
  );

  useEffect(() => {
    if (settingsStatus === 'idle') {
      dispatch(getProfile({}));
    }
  }, [dispatch, settingsStatus]);

  const selectImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Avatar image</Text>
        {profile ? (
          <Avatar.Image
            size={100}
            source={{
              uri:
                'data:image/jpeg;base64,' + profile.avatar.toString('base64'),
            }}
          />
        ) : (
          <Text>Upload an avatar!</Text>
        )}
      </View>
      <View>
        <Button onPress={selectImage}>Upload new avatar...</Button>
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
