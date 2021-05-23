import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {UnitsPage} from './UnitsPage';
import TopicsPage from './Topics/TopicsPage';
import {QuizPage} from './Quiz/QuizPage';

import {Language, Topic, Unit} from '../../utils';

export type UnitsStackParamList = {
  Units: {language: Language};
  Topics: {unit: Unit};
  Quiz: {topic: Topic};
};

const Stack = createStackNavigator<UnitsStackParamList>();

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
        name="Topics"
        component={TopicsPage}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#FF671D',
          },
        }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizPage}
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
