import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {Topic, MultipleChoiceQuestion, TrueFalseQuestion} from '../../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAppSelector} from '../../../ducks/store';

export const LessonPage = () => {

  const route:any = useRoute();
  const unit_id = route.params.unit_id;
  const topic_num = route.params.topic_num;
  const accessToken = useAppSelector((state) => state.userReducer.accessToken);
  const [topics, setTopics] = useState<Topic[]>();
  const [MC_Questions,setMC_Questions] = useState<MultipleChoiceQuestion[]>();
  const [TF_Questions,setTF_Questions] = useState<TrueFalseQuestion[]>();
  

  async function getTopics(){
    return await axios
    .get(`http://localhost:8000/api/unit/${unit_id}/topic/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(
      (response) => {
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
    .get(`http://localhost:8000/api/unit/${unit_id}/topic/${topic_num}/question`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(
      (response) => {
        let tempTF_Questions: TrueFalseQuestion[] = [];
        let tempMC_Questions: MultipleChoiceQuestion[] = [];

        response.data.trueFalseQuestions.map((question: TrueFalseQuestion) => {
          console.log(question)
          tempTF_Questions.push(question);
        });
        response.data.multipleChoiceQuestions.map((question: MultipleChoiceQuestion) => {
          tempMC_Questions.push(question);
        });

        setTF_Questions(tempTF_Questions);
        setMC_Questions(tempMC_Questions);
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
