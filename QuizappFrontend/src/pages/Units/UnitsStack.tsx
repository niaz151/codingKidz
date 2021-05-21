import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {UnitsPage} from './UnitsPage';
import {LessonPage} from './Lessons/LessonPage';
import {QuestionsPage} from './Questions/QuestionsPage';

const Stack = createStackNavigator();

const UnitsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Units">
      <Stack.Screen
        name="Units"
        component={UnitsPage}
        options={{
          headerTitle: 'SCRATCH',
          headerTitleStyle:{
            fontSize:30,
            fontWeight:'500',
          },
          headerStyle: {
            backgroundColor: '#FED500',
            height: 80,
          },
          headerTitleContainerStyle:{
            borderWidth:1,
            borderColor:'black',
          }
        }}
      />
      <Stack.Screen
        name="Lessons"
        component={LessonPage}
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

export default UnitsStack;
