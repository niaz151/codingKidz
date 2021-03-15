import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {UnitsPage} from './UnitsPage';
import {LessonsPage} from './Lessons/LessonsPage';

const Stack = createStackNavigator();

const UnitsStack = (props: {
  accessToken: string;
  logout: () => Promise<void>;
}) => {
  const UnitsPageWithProps = () => <UnitsPage {...props} />;
  const LessonsPageWithProps = () => <LessonsPage {...props} />;

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
      <Stack.Screen
        name="Lessons"
        component={LessonsPageWithProps}
        options={{
          title: 'Lessons',
          headerStyle: {
            backgroundColor: '#FF671D',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default UnitsStack;
