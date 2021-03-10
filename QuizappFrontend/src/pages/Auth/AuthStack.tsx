import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import SplashPage from './SplashPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const Stack = createStackNavigator();

const AuthStack = (props: {
  setTokensInApp: (
    newAccessToken: string,
    newRefreshToken: string,
  ) => Promise<void>;
}) => {
  const {setTokensInApp} = props;

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashPage}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#FF671D',
          },
        }}
      />

      <Stack.Screen
        name="Login"
        component={() => {
          return <LoginPage setTokensInApp={setTokensInApp} />;
        }}
        options={{
          title: '',
          headerLeft: null as any,
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />

      <Stack.Screen
        name="Register"
        component={() => {
          return <RegisterPage setTokensInApp={setTokensInApp} />;
        }}
        options={{
          title: '',
          headerLeft: null as any,
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
