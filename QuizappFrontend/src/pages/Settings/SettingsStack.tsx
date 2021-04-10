import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import SettingsPage from './SettingsPage';
import ProfilePage from './ProfilePage';

const Stack = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#FF671D',
          },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#FF671D',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
