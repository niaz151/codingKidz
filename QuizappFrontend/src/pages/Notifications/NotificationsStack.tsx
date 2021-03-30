import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NotificationsPage} from './NotificationsPage';

const Stack = createStackNavigator();

const NotificationsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Notifications">
      <Stack.Screen
        name="Notifications"
        component={NotificationsPage}
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

export default NotificationsStack;
