import React from 'react';

import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

import {createStackNavigator} from '@react-navigation/stack';
import {HomePage} from './HomePage';

export type HomeStackParamList = {
  Home: undefined;
};

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
