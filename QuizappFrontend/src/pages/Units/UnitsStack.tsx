import React from 'react';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {UnitsPage} from './UnitsPage';
import TopicsPage from './Topics/TopicsPage';
import {QuizPage} from './Quiz/QuizPage';
import {PassedQuiz} from './Quiz/PassedQuiz';
import {FailedQuiz} from './Quiz/FailedQuiz';
import {useNavigation} from '@react-navigation/native';
import {Language, Topic, Unit, User} from '../../utils';

export type UnitsStackParamList = {
  Units: {language: Language};
  Topics: {unitId: number, unitName: string, userId: number};
  Quiz: {topicId: number,  unitId: number};
  PassedQuiz: {numberQuestions: number, numberCorrect: number, unitId: number, topicId: number, userId: number},
  FailedQuiz: {unitId: number, userId: number}
};

// home -> languages
// languages id -> unit
// unit id -> topics ..... pull in topic idea data instead of using the one passed in from props
// quiz
//

const Stack = createStackNavigator<UnitsStackParamList>();

const UnitsStack = (props: any) => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Units">
      <Stack.Screen
        name="Units"
        component={UnitsPage}
        options={{
          headerTitleStyle: {
            fontSize: 36,
            fontFamily: 'Nexa Bold',
            color: '#FF671D',
          },
          headerStyle: {
            backgroundColor: '#FDD400',
            height: 100,
            //borderColor:'black',
            //borderWidth:1,
          },
          headerTitleContainerStyle: {
            //borderWidth: 1,
            //borderColor: 'black',
          },
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerBackTitle: 'Languages',
        }}
      />
      <Stack.Screen
        name="Topics"
        component={TopicsPage}
        options={{
          headerTitleStyle: {
            fontSize: 36,
            fontFamily: 'Nexa Bold',
            color: '#FF671D',
          },
          headerStyle: {
            backgroundColor: '#FED500',
            height: 100,
          },
        }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizPage}
        options={{
          title: 'Quiz',
          headerTitleStyle: {
            fontSize: 36,
            fontFamily: 'Nexa Bold',
            color: '#FF671D',
          },
          headerStyle: {
            backgroundColor: '#FED500',
            height: 100,
          },
        }}
      />
      <Stack.Screen
        name="PassedQuiz"
        component={PassedQuiz}
        options={{
          title: 'You Passed',
          headerTitleStyle: {
            fontSize: 36,
            fontFamily: 'Nexa Bold',
            color: '#FF671D',
          },
          headerStyle: {
            backgroundColor: '#FED500',
            height: 100,
          },
          headerLeft: ()=> null,
        }}
      />
      <Stack.Screen
        name="FailedQuiz"
        component={FailedQuiz}
        options={{
          title: 'You Failed',
          headerTitleStyle: {
            fontSize: 36,
            fontFamily: 'Nexa Bold',
            color: '#FF671D',
          },
          headerStyle: {
            backgroundColor: '#FED500',
            height: 100,
          },
          headerLeft: ()=> null,
        }}
      />
    </Stack.Navigator>
  );
};

export default UnitsStack;
