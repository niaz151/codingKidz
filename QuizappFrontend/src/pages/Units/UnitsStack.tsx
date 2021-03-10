import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {UnitsPage} from './UnitsPage';

const Stack = createStackNavigator();

const UnitsStack = (props: {
  accessToken: string;
  logout: () => Promise<void>;
}) => {
  const {accessToken, logout} = props;

  console.log('units token: ', accessToken);

  return (
    <Stack.Navigator initialRouteName="Units">
      <Stack.Screen
        name="Units"
        component={() => {
          return <UnitsPage accessToken={accessToken} logout={logout} />;
        }}
        options={{
          title: '',
          headerLeft: null as any,
          headerStyle: {
            backgroundColor: '#FF671D',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default UnitsStack;
