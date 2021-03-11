import React from 'react';

import {Text, View} from 'react-native';

export const HomePage = (props: {accessToken: string}) => {
  const {accessToken} = props;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
};
