import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LessonsPage} from './LessonsPage';

const LessonsStack = (props: {
  accessToken:string,
}) => {

  const Stack = createStackNavigator();
  const LessonsPageWithProps = () => <LessonsPage {...props} />;

  return (
    <Stack.Navigator initialRouteName="Units">
      <Stack.Screen
        name="Lessons"
        component={LessonsPageWithProps}
      />
    </Stack.Navigator>
  );
};

export default LessonsStack;
