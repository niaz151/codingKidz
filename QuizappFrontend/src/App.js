import 'react-native-gesture-handler';
import {StatusBar, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import TestPage from './pages/TestPage';
import Splash from './pages/Splash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {UnitsStack, HomeStack} from './pages';
import {SafeAreaView} from 'react-native-safe-area-context';
const Tab = createBottomTabNavigator();
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import { create } from 'react-test-renderer';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import {View, Text} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Stack = createStackNavigator();

function App(){
    return (
      <SafeAreaView style={styles.viewStyles}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Splash" component={Splash}  options={{
              title:"",
              headerStyle:{
                backgroundColor:"#FF671D"
              }
            }} />
            <Stack.Screen name="Login" component={LoginPage} options={{
              title:"",
              headerLeft:null,
              headerStyle:{
                backgroundColor:"white"
              }
            }} />
            <Stack.Screen name="Register" component={RegisterPage} options={{
              title:"",
              headerLeft: null,
              headerStyle:{
                backgroundColor:"white"
              }
            }}/>
          </Stack.Navigator> 
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