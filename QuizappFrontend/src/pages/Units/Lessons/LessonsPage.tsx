import React from 'react';
import {View, Text} from 'react-native';

export const LessonsPage = (props: {
  accessToken: string;
  logout: () => Promise<void>;
}) => {
  return(
    <View>
      <Text> Lessons Page </Text>
    </View>
  )
}
