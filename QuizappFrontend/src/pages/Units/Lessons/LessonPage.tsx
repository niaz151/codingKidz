import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {Topic} from '../../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAppSelector} from '../../../ducks/store';

export const LessonPage = () => {
  const route:any = useRoute();
  const id = route.params.id;
  const accessToken = useAppSelector((state) => state.userReducer.accessToken);
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
        console.log('topics', getTopics)
    };

    getTopics();
  }, [accessToken]);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}> Test </Text>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#FF671D',
  },
  titleContainer: {
    height: hp('8%'),
    maxHeight: 70,
    width: wp('100%'),
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 15,
    color: 'black',
  },
};
