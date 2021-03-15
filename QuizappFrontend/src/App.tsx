import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthStack, UnitsStack, HomeStack} from './pages';
// import {useTokenContext} from './context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
  getRefreshTokenFromStorage,
  isTokenExpired,
  refreshTokens,
  removeRefreshTokenFromStorage,
  storeRefreshTokenInStorage,
} from './utils';

Ionicon.loadFont();

const App = () => {
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();

  const setTokensInApp = async (
    newAccessToken: string,
    newRefreshToken: string,
  ) => {
    await storeRefreshTokenInStorage(newRefreshToken);
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
  };

  const logout = async () => {
    setAccessToken(undefined);
    setRefreshToken(undefined);
    await removeRefreshTokenFromStorage();
  };

  // Manage JWTs, render based on auth
  useEffect(() => {
    console.log('running useEffect');
    // Workaround to use async functions in useEffect by defining
    // them inside useEffect and calling them at the end

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
          // may exist and exit so user is sent to auth stack
          setAccessToken(undefined);
          return;
        }

        // Set refresh token and exit early because useEffect
        // will be called again by changed refreshToken state
        setRefreshToken(storedRefreshToken);
        return;
      }

      // If we have a refresh token, make sure it's not expired, if
      // it is clear any access token to send them to auth stack
      if (isTokenExpired(refreshToken)) {
        setAccessToken(undefined);
        return;
      }

      // Now that we know we have a valid refresh token, refresh both
      // tokens
      // TODO (Backend) Only refresh access token, have different
      // endpoint to fetch new refresh and access tokens
      if (isTokenExpired(accessToken)) {
        const {access_token, refresh_token} = await refreshTokens(refreshToken);
        setAccessToken(access_token);
        setRefreshToken(refreshToken);
        await storeRefreshTokenInStorage(refresh_token);
      }
    };

    checkOrGetTokens();
  }, [accessToken, refreshToken]);

  const Tab = createBottomTabNavigator();

  // Define this so that we can pass it directly to component below
  // Passing () => (<UnitsStack props.../>) is bad for performance
  // and gives a warning
  const UnitsStackWithProps = () => {
    // Assert accessToken is non-null because it will only
    // be rendered below when accessToken is defined
    return <UnitsStack accessToken={accessToken!} logout={logout} />;
  };

  const HomeStackWithprops = () => {
    // Assert accessToken is non-null because it will only
    // be rendered below when accessToken is defined
    return <HomeStack accessToken={accessToken!} />;
  };

  return (
    <SafeAreaView style={styles.viewStyles}>
      <NavigationContainer>
        {accessToken ? (
          <Tab.Navigator
            tabBarOptions={{
              labelStyle: {
                color: 'white',
                fontSize: 14,
              },
              style: {
                backgroundColor: '#FF671D',
              },
            }}>
            <Tab.Screen name="HOME" component={HomeStackWithprops} />
            <Tab.Screen name="UNITS" component={UnitsStackWithProps} />
          </Tab.Navigator>
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
