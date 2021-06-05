import React from 'react';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {UnitsPage} from './UnitsPage';
import TopicsPage from './Topics/TopicsPage';
import {QuizPage} from './Quiz/QuizPage';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Language, Topic, Unit} from '../../utils';

export type UnitsStackParamList = {
  Units: {language: Language};
  Topics: {unit: Unit};
  Quiz: {topic: Topic};
};

const Stack = createStackNavigator<UnitsStackParamList>();

const UnitsStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Units">
      <Stack.Screen
        name="Units"
        component={UnitsPage}
        options={{
          headerTitle: 'SCRATCH',
          headerTitleStyle: {
            fontSize: 36,
            color: '#FF671D',
            fontWeight: '600',
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
          title: 'Test',
          headerTitleStyle: {
            fontSize: 36,
            fontWeight: '500',
          },
          headerStyle: {
            backgroundColor: '#FED500',
            height: 100,
          },
          headerTitleContainerStyle: {
            borderWidth: 1,
            borderColor: 'black',
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
            height: 100,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default UnitsStack;
