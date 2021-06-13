import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {MultipleChoiceQuestion, shuffleArray} from '../../../../utils';

type Props = {
  question: MultipleChoiceQuestion;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
};

const MultipleChoiceQuestionContainer = (props: Props) => {
  const {question, onCorrectAnswer, onIncorrectAnswer} = props;

  const shuffledAnswers = shuffleArray([
    question.correctAnswer,
    question.wrongAnswer0,
    question.wrongAnswer1,
    question.wrongAnswer2,
  ]);

  const checkAnswer = (answer: MultipleChoiceQuestion['correctAnswer']) => {
    if (answer === question.correctAnswer) {
      return onCorrectAnswer();
    } else {
      return onIncorrectAnswer();
    }
  };

  return (
    <View>
      <Text>{question.question}</Text>
      {shuffledAnswers.map((answer) => {
        return (
          <Button onPress={() => checkAnswer(answer)}>
            <Text>{answer}</Text>
          </Button>
        );
      })}
    </View>
  );
};

export default MultipleChoiceQuestionContainer;
