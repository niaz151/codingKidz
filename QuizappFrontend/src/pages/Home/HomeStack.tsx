import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {HomePage} from './HomePage';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomePage} />
    </Stack.Navigator>
  );
};

export default HomeStack;