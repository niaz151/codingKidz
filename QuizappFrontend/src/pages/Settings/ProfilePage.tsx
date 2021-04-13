import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Avatar, Button} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

import axios, {AxiosError} from 'axios';
import {useAppDispatch, useAppSelector} from '../../ducks/store';
import {logout} from '../Auth/authSlice';

import {getProfile} from './settingsSlice';
import {Profile} from '../../utils/Models';
import {Buffer} from 'buffer';
import {TokenService} from '../../services';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const avatar = useAppSelector(
    (state) => state.settingsReducer.profile?.avatar,
  );
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);
  const userId = accessToken
    ? TokenService.readToken(accessToken).id
    : undefined;
  const settingsStatus = useAppSelector(
    (state) => state.settingsReducer.status,
  );

  const [fetchedImage, setFetchedImage] = useState<string>();
  const [uploadError, setUploadError] = useState<string>();

  useEffect(() => {
    const fetchAvatar = async () => {
      return await axios
        .get(`http://localhost:8000/api/user/${userId}/profile`, {
          headers: {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data; ',
            },
          },
        })
        .then(
          (response) => {
            Alert.alert(response.data);
            setFetchedImage(
              Buffer.from(response.data.user.profile.avatar.data).toString(
                'base64',
              ),
            );
          },
          (error: AxiosError) => {
            setUploadError(error.message);
          },
        );
    };

    fetchAvatar();
  }, [accessToken, userId]);

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
        <Text>Fetched image</Text>
        {fetchedImage ? (
          <Avatar.Image
            size={100}
            source={{
              uri: 'data:image/jpeg;base64,' + fetchedImage,
            }}
          />
        ) : (
          <Text>Loading image...</Text>
        )}
      </View>
      <View>
        <Text>Avatar image</Text>
        {avatar ? (
          <Avatar.Image
            size={100}
            source={{
              uri: 'data:image/jpeg;base64,' + avatar.toString('base64'),
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
