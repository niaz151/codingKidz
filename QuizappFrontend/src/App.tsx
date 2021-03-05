import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthStack} from './pages/index';
import {TokenProvider, TokenContext} from './context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function App() {
  const {
    accessToken,
    refreshToken,
    storeAccessToken,
    storeRefreshToken,
  } = useContext(TokenContext);

  // TODO Check if accessToken and refreshToken are set,
  // render either authstack or tab app

  return (
    <SafeAreaView style={styles.viewStyles}>
      <TokenProvider>
        <NavigationContainer>{AuthStack()}</NavigationContainer>
      </TokenProvider>
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
