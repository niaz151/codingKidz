import React from 'react';
import {View, Text} from 'react-native'
import { useRoute } from '@react-navigation/native';


export const LessonsPage = (props: {
  accessToken: string;
}) => {

  const route:any = useRoute();
  const id = route.params.id;

  console.log("params:", id)
  return(
    <View>
      <Text> Lessons Page </Text>
    </View>
  )
}
