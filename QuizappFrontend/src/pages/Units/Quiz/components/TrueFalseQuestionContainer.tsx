import React from 'react';
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
    <div>
      <p>{question.question}</p>
      <button onClick={selectedTrue}>True</button>
      <button onClick={selectedFalse}>False</button>
    </div>
  );
};

export default TrueFalseQuestionContainer;
