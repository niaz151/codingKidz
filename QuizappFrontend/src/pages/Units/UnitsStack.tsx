import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {UnitsPage} from './UnitsPage';

const Stack = createStackNavigator();

const UnitsStack = (props: {
  accessToken: string;
  logout: () => Promise<void>;
}) => {
  const UnitsPageWithProps = () => <UnitsPage {...props} />;

  return (
    <Stack.Navigator initialRouteName="Units">
      <Stack.Screen
        name="Units"
        component={UnitsPageWithProps}
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
