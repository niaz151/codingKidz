import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native'
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import {Topic} from '../../../utils';

export const LessonsPage = (props: {
  accessToken: string;
}) => {

  const route:any = useRoute();
  const id = route.params.id;
  const accessToken = props.accessToken;
  const [topics, setTopics] = useState<Topic[]>();

  useEffect(() => {
    const getTopics = async () => {
      return await axios
        .get(`http://localhost:8000/api/unit/${id}/topic/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(
          (response) => {
            console.log('RESPONSE DATA', response.data);
            let tempTopics: Topic[] = [];
             response.data.topics.map((topic: Topic) => {
              tempTopics.push(topic);
            });
            setTopics(tempTopics);
          },
          (error) => {
            console.log('fetching error', error);
          },
        );
    };

    getTopics();
  }, [accessToken]);

  return(
    <View>
      <Text> Lessons Page </Text>
    </View>
  )
}
