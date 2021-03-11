import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {HomePage} from './HomePage';

const Stack = createStackNavigator();

const HomeStack = (props: {accessToken: string}) => {
  const HomePageWithProps = () => {
    return <HomePage {...props} />;
  };

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomePageWithProps} />
    </Stack.Navigator>
  );
};

export default HomeStack;
