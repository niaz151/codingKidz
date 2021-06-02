import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {MultipleChoiceQuestion, shuffleArray} from '../../../../utils';

type Props = {
  question: MultipleChoiceQuestion;
};

const MultipleChoiceQuestionContainer = (props: Props) => {
  const {question} = props;

  const shuffledAnswers = shuffleArray([
    question.correctAnswer,
    question.wrongAnswer0,
    question.wrongAnswer1,
    question.wrongAnswer2,
  ]);

  const checkAnswer = (answer: MultipleChoiceQuestion['correctAnswer']) => {
    return answer === question.correctAnswer;
  };

  return (
    <View>
      <Text>{question.question}</Text>
      {shuffledAnswers.map((answer) => {
        <Button onPress={() => checkAnswer(answer)}>{answer}</Button>;
      })}
    </View>
  );
};

export default MultipleChoiceQuestionContainer;
