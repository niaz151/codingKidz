import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import {AuthStack} from './pages/index';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Stack = createStackNavigator();

function App(){

  const [accessToken, setAccessToken] = useState();

    return (
      <SafeAreaView style={styles.viewStyles}>
        <NavigationContainer>
          {AuthStack()}
        </NavigationContainer>
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


     {/* <RegisterPage/> */}
        {/*
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                switch (route.name) {
                  case 'Home':
                    return (
                      <Ionicons
                        name={`home-${focused ? 'outline' : 'sharp'}`}
                        size={size}
                        color={color}
                      />
                    );
                  case 'Units':
                    return (
                      <Ionicons
                        name={`book-${focused ? 'outline' : 'sharp'}`}
                        size={size}
                        color={color}
                      />
                    );
                  case 'Settings':
                    return (
                      <Ionicons name={`cog-${focused ? 'outline' : 'sharp'}`} />
                    );
                }
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Units" component={UnitsStack} />
            <Tab.Screen name="Settings" component={TestPage} />
          </Tab.Navigator>
        </NavigationContainer>
          */}