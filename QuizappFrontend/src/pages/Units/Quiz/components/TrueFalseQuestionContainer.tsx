import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import {TrueFalseQuestion, shuffleArray} from '../../../../utils';

type Props = {
  question: TrueFalseQuestion;
};

const TrueFalseQuestionContainer = (props: Props) => {
  const {question} = props;

  const checkAnswer = (answer: TrueFalseQuestion['correctAnswer']) => {
    return answer === question.correctAnswer;
  };

  const selectedTrue = () => {
    return checkAnswer(true);
  };

  const selectedFalse = () => {
    return checkAnswer(false);
  };

  return (
    <View>
      <Text>{question.question}</Text>
      <Button onPress={selectedTrue}>True</Button>
      <Button onPress={selectedFalse}>False</Button>
    </View>
  );
};

export default TrueFalseQuestionContainer;
