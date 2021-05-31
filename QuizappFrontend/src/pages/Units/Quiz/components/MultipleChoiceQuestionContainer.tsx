import React from 'react';
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
    <div>
      <p>{question.question}</p>
      {shuffledAnswers.map((answer) => {
        <button onClick={() => checkAnswer(answer)}>{answer}</button>;
      })}
    </div>
  );
};

export default MultipleChoiceQuestionContainer;
