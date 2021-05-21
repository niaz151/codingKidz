import React from 'react';

import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {UnitsPage} from './UnitsPage';
import {LessonPage} from './Lessons/LessonPage';
import {QuestionsPage} from './Questions/QuestionsPage';
import {Language, Topic, Unit} from '../../utils/Models';

export type UnitsStackParamList = {
  Units: {language: Language};
  Lessons: {unit: Unit};
  Quiz: {topic: Topic};
};

const Stack = createStackNavigator();

const UnitsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Units">
      <Stack.Screen
        name="Units"
        component={UnitsPage}
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
