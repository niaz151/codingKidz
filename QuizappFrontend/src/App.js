import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Splash from './pages/Splash';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Stack = createStackNavigator();

function App(){

  const [accessToken, setAccessToken] = useState();

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