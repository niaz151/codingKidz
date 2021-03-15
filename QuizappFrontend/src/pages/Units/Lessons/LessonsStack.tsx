import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LessonsPage} from './LessonsPage';

const LessonsStack = () => {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Lessons">
      <Stack.Screen
        name="Lessons"
        component={LessonsPage}
      />
    </Stack.Navigator>
  );
};

export default LessonsStack;
