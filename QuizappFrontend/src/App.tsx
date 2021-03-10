import 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthStack, UnitsStack} from './pages/index';
// import {useTokenContext} from './context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Buffer} from 'buffer';
import axios from 'axios';

const App = () => {
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();

  const storeRefreshTokenInStorage = async (token: string) => {
    try {
      return await AsyncStorage.setItem('@refreshToken', token);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  };

  const getRefreshTokenFromStorage = async () => {
    try {
      const storedRefreshToken = await AsyncStorage.getItem('@refreshToken');
      if (storedRefreshToken) {
        setRefreshToken(storedRefreshToken);
        return storedRefreshToken;
      } else {
      }
    } catch (error) {
      console.log('AsyncStorage Error: ', +error.message);
    }
  };

  const removeRefreshTokenFromStorage = async () => {
    try {
      return await AsyncStorage.removeItem('@refreshToken');
    } catch (error) {
      console.log('AsyncStorage Error: ', +error.message);
    }
  };

  const setTokensInApp = async (
    newAccessToken: string,
    newRefreshToken: string,
  ) => {
    await storeRefreshTokenInStorage(newRefreshToken);
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
  };

  // TODO Check if accessToken and refreshToken are set,
  // render either authstack or tab app
  const isTokenExpired = (token: string) => {
    const decodedToken = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    );

    // token exp time is measured in seconds not milliseconds
    const currentTimeInUnixSeconds = Math.floor(Date.now() / 1000);

    return Number(decodedToken.exp) < currentTimeInUnixSeconds;
  };

  const logout = async () => {
    setAccessToken(undefined);
    setRefreshToken(undefined);
    await removeRefreshTokenFromStorage();
  };

  // Manage JWTs, render based on auth
  useEffect(() => {
    // Workaround to use async functions in useEffect by defining
    // them inside useEffect and calling them at the end
    const refreshTokens = async () => {
      return await axios
        .get('http://localhost:8000/api/auth/refresh_access', {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        })
        .then(
          (response) => {
            const access_token = response.data.access_token as string;
            const refresh_token = response.data.refresh_token as string;
            return {access_token, refresh_token};
          },
          (error) => {
            throw new Error(error);
          },
        );
    };

    const checkOrGetTokens = async () => {
      // If we have a valid access token, no need to do anything else
      if (accessToken && !isTokenExpired(accessToken)) {
        return;
      }

      // Check for refresh token because we need to get a new access token
      if (!accessToken || !refreshToken) {
        const storedRefreshToken = await getRefreshTokenFromStorage();
        if (!storedRefreshToken) {
          // No stored refresh token, remove any access token that
          // may exist and exit so user is sent to login screen
          setAccessToken(undefined);
          return;
        }

        // Set refresh token and exit early because useEffect
        // will be called again by changed refreshToken state
        setRefreshToken(refreshToken);
        return;
      }

      // If we have a refresh token, make sure it's not expired, if
      // it is clear any access token to send them to login screen
      if (isTokenExpired(refreshToken)) {
        setAccessToken(undefined);
        return;
      }

      // Now that we know we have a valid refresh token, refresh both
      // tokens
      // TODO (Backend) Only refresh access token, have different
      // endpoint to fetch new refresh and access tokens
      if (isTokenExpired(accessToken)) {
        const {access_token, refresh_token} = await refreshTokens();
        setAccessToken(access_token);
        setRefreshToken(refreshToken);
        storeRefreshTokenInStorage(refresh_token);
      }
    };

    checkOrGetTokens();
  }, [accessToken, refreshToken]);

  return (
    <SafeAreaView style={styles.viewStyles}>
      <NavigationContainer>
        {accessToken ? (
          <UnitsStack accessToken={accessToken} logout={logout} />
        ) : (
          <AuthStack setTokensInApp={setTokensInApp} />
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewStyles: {
    height: hp('100%'),
    width: wp('100'),
    backgroundColor: '#FF671D',
  },
});

export default App;
