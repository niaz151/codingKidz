import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
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
import {getRefreshTokenFromStorage, isTokenExpired} from './utils';

import {useAppDispatch, useAppSelector} from './ducks/store';
import {logout, refreshTokens, setRefreshToken} from './ducks/authSlice';

Ionicon.loadFont();

const App = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.userReducer.accessToken);
  const refreshToken = useAppSelector((state) => state.userReducer.accessToken);

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
          dispatch(logout());
          return;
        }

        // Set refresh token and exit early because useEffect
        // will be called again by changed refreshToken state
        await dispatch(setRefreshToken(storedRefreshToken));
        return;
      }

      // If we have a refresh token, make sure it's not expired, if
      // it is log us out
      if (isTokenExpired(refreshToken)) {
        dispatch(logout());
        return;
      }

      // Now that we know we have a valid refresh token, refresh both
      // tokens
      // TODO (Backend) Only refresh access token, have different
      // endpoint to fetch new refresh and access tokens
      if (isTokenExpired(accessToken)) {
        dispatch(refreshTokens(refreshToken));
        return;
      }
    };

    checkOrGetTokens();
  }, [accessToken, dispatch, refreshToken]);

  const Tab = createBottomTabNavigator();

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
            <Tab.Screen name="HOME" component={HomeStack} />
            <Tab.Screen name="UNITS" component={UnitsStack} />
          </Tab.Navigator>
        ) : (
          <AuthStack />
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
