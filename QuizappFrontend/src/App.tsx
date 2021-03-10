import 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthStack, UnitsStack} from './pages/index';
import {useTokenContext} from './context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Buffer} from 'buffer';
import axios from 'axios';
import {Text} from 'react-native-paper';

function App() {
  // TODO Check if accessToken and refreshToken are set,
  // render either authstack or tab app
  const isExpired = (token: string) => {
    const decodedToken = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    );

    // token exp time is measured in seconds not milliseconds
    const currentTimeInUnixSeconds = Math.floor(Date.now() / 1000);

    return Number(decodedToken.exp) < currentTimeInUnixSeconds;
  };

  const {
    accessToken,
    refreshToken,
    storeAccessToken,
    storeRefreshToken,
  } = useTokenContext();

  const [hasValidAccessToken, setHasValidAccessToken] = useState(false);
  const [hasValidRefreshToken, setHasValidRefreshToken] = useState(false);

  // Check expiration effect
  useEffect(() => {
    if (accessToken) {
      setHasValidAccessToken(isExpired(accessToken));
    }
    if (refreshToken) {
      setHasValidRefreshToken(isExpired(refreshToken));
    }
  }, [accessToken, refreshToken]);

  // Check token validity effect
  useEffect(() => {
    if (!hasValidRefreshToken) {
      setHasValidAccessToken(false);
      setHasValidRefreshToken(false);
    } else {
      if (!hasValidAccessToken) {
        axios
          .get('http://localhost:8000/api/auth/refresh_access', {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          })
          .then(
            (response) => {
              storeAccessToken(response.data().access_token);
              storeRefreshToken(response.data().refresh_token);
            },
            (error) => {
              console.log(error);
            },
          );
      }
    }
  }, [
    hasValidAccessToken,
    hasValidRefreshToken,
    refreshToken,
    storeAccessToken,
    storeRefreshToken,
  ]);

  return (
    <SafeAreaView style={styles.viewStyles}>
      {/* TODO Remove debug text */}
      <View>
        <Text>context access: {accessToken}</Text>
        <Text>context refresh: {refreshToken}</Text>
      </View>
      <NavigationContainer>
        {/* {hasValidAccessToken ? UnitsStack() : AuthStack()} */}
        {accessToken ? UnitsStack() : AuthStack()}
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewStyles: {
    height: hp('100%'),
    width: wp('100'),
    backgroundColor: '#FF671D',
  },
});

export default App;
