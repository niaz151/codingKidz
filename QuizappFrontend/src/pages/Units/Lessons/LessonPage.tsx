import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {
  Topic,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  Question,
} from '../../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAppSelector} from '../../../ducks/store';

export const LessonPage = () => {
  const route: any = useRoute();
  const unit_id = route.params.unit_id;
  const topic_num = route.params.topic_num;
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);
  const [topics, setTopics] = useState<Topic[]>();
  const [questions, setQuestions] = useState<Question[]>();
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [questionNum, setQuestionNum] = useState<number>(1);

  const nextQuestion = () => {
    setQuestionNum(questionNum + 1);
  };

  const previousQuestion = () => {
    setQuestionNum(questionNum - 1);
  };

  const shuffleArray = (array: Question[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  useEffect(() => {
    const getQuestions = async () => {
      return await axios
        .get(
          `http://localhost/api/unit/${unit_id}/topic/${topic_num}/question`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then(
          (response) => {
            let tempQuestions: Question[] = [];

            response.data.trueFalseQuestions.map(
              (question: TrueFalseQuestion) => {
                tempQuestions.push(question);
              },
            );
            response.data.multipleChoiceQuestions.map(
              (question: MultipleChoiceQuestion) => {
                tempQuestions.push(question);
              },
            );

            setQuestions(tempQuestions);
          },
          (error) => {
            console.log('fetching error', error);
          },
        );
    };

    const getTopics = async () => {
      return await axios
        .get(`http://localhost/api/unit/${unit_id}/topic/`, {
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
            console.log('Topics:', topics);
          },
          (error) => {
            console.log('fetching error', error);
          },
        );
    };

    getQuestions();
    getTopics();
  }, [accessToken, topic_num, topics, unit_id]);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}> Question Description </Text>
      </View>
      <Button title="Next Question" />
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
