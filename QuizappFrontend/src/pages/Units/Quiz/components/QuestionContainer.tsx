import React from 'react';
import {MultipleChoiceQuestion, TrueFalseQuestion} from '../../../../utils';
import MultipleChoiceQuestionContainer from './MultipleChoiceQuestionContainer';
import TrueFalseQuestionContainer from './TrueFalseQuestionContainer';

const QuestionContainer = (props: {
  question: MultipleChoiceQuestion | TrueFalseQuestion;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
  numQuestions: number;
  score: number | null;
}) => {
  const {question, onCorrectAnswer, onIncorrectAnswer, score} = props;

  const getQuestionType = (question: any) => {
    return question.wrongAnswer0 === undefined ? 'TrueFalse' : 'MultipleChoice';
  };

  return getQuestionType(question) === 'MultipleChoice' ? (
    <MultipleChoiceQuestionContainer
      onCorrectAnswer={onCorrectAnswer}
      onIncorrectAnswer={onIncorrectAnswer}
      question={question as MultipleChoiceQuestion}
      numQuestions={props.numQuestions}
      score={score}
    />
  ) : (
    <TrueFalseQuestionContainer
      onCorrectAnswer={onCorrectAnswer}
      onIncorrectAnswer={onIncorrectAnswer}
      question={question as TrueFalseQuestion}
      numQuestions={props.numQuestions}
      score={score}
    />
  );
};

export default QuestionContainer;
