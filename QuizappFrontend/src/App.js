import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthStack} from './pages/index';
import {TokenProvider} from './TokenContext';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function App(){
    return (
      <SafeAreaView style={styles.viewStyles}>
        <TokenProvider>
          <NavigationContainer>
            {AuthStack()}
          </NavigationContainer>
        </TokenProvider>
      </SafeAreaView>
  );  
}

const styles = StyleSheet.create({
  viewStyles:{
    height: hp("100%"),
    width: wp("100"),
    backgroundColor:"#FF671D"
  }
}) 

export default App; 