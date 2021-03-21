import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {Topic, Question} from '../../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAppSelector} from '../../../ducks/store';

export const LessonPage = () => {
  const route:any = useRoute();
  const id = route.params.id;
  const unitNum = route.params.unitNum;
  const accessToken = useAppSelector((state) => state.userReducer.accessToken);
  const [topics, setTopics] = useState<Topic[]>();
  const [questions,setQuestions] = useState<Question[]>();
  

  console.log('UNIT Num:', unitNum);
  async function getTopics(){
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
  }

  async function getQuestions(){
    return await axios
    .get(`http://localhost:8000/api/unit/${id}/topic/1/question`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(
      (response) => {
        console.log('RESPONSE DATA', response.data);
        let tempQuestions: Question[] = [];
        response.data.trueFalseQuestions.map((question: Question) => {
          tempQuestions.push(question);
        });
        response.data.multipleChoiceQuestions.map((question: Question) => {
          tempQuestions.push(question);
        });
        setQuestions(tempQuestions);
      },
      (error) => {
        console.log('fetching error', error);
      },
    );
  }

  useEffect(() => {
    getQuestions();
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
