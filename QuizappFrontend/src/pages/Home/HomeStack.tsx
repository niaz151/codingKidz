import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {HomePage} from './HomePage';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#FF671D',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
