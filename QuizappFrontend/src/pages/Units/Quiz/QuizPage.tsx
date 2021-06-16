import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../ducks/store';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  MultipleChoiceQuestion,
  Question,
  shuffleArray,
  TrueFalseQuestion,
} from '../../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StackScreenProps} from '@react-navigation/stack';
import {UnitsStackParamList} from '../UnitsStack';
import {Button} from 'react-native-paper';
import MultipleChoiceQuestionContainer from './components/MultipleChoiceQuestionContainer';
import TrueFalseQuestionContainer from './components/TrueFalseQuestionContainer';
import QuestionContainer from './components/QuestionContainer';

const QUESTIONS_PER_QUIZ = 10;

type Props = StackScreenProps<UnitsStackParamList, 'Quiz'>;

export const QuizPage = (props: Props) => {
  const {navigation, route} = props;
  const {topic} = route.params;
  const {multipleChoiceQuestions, trueFalseQuestions} = topic;
  const [lives, setLives] = useState(3);
  const [questionNum, setQuestionNum] = useState(0);

  useEffect(() => {
    console.log('rendering quiz');
  }, []);

  const loseLife = () => setLives((l) => l - 1);

  const nextQuestion = () => setQuestionNum((num) => num + 1);

  const previousQuestion = () => setQuestionNum((num) => num - 1);

  const selectedQuestions = shuffleArray<
    MultipleChoiceQuestion | TrueFalseQuestion
  >(multipleChoiceQuestions!.concat(trueFalseQuestions!)).slice(
    0,
    QUESTIONS_PER_QUIZ,
  );

  const returnToLessons = () => {
    navigation.goBack();
  };

  const onCorrectAnswer = () => {
    nextQuestion();
  };

  const onIncorrectAnswer = () => {
    loseLife();
    nextQuestion();
  };

  return (
    <View>
      {lives > 0 ? (
        questionNum < selectedQuestions.length ? (
          <>
            {[...Array(lives).keys()].map((k) => {
              return <Text key={k}>L</Text>;
            })}
            <QuestionContainer
              onCorrectAnswer={onCorrectAnswer}
              onIncorrectAnswer={onIncorrectAnswer}
              question={selectedQuestions[questionNum]}
            />
          </>
        ) : (
          <View>
            <Text>You Passed</Text>
            <Button onPress={returnToLessons}>Return to Lessons</Button>
          </View>
        )
      ) : (
        <View>
          <Text>You Failed</Text>
          <Button onPress={returnToLessons}>Return to Lessons</Button>
        </View>
      )}
    </View>
  );
};
