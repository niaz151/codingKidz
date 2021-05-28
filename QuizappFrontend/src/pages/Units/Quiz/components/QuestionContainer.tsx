import React from 'react';
import {MultipleChoiceQuestion, TrueFalseQuestion} from '../../../../utils';
import MultipleChoiceQuestionContainer from './MultipleChoiceQuestionContainer';
import TrueFalseQuestionContainer from './TrueFalseQuestionContainer';

const QuestionContainer = (props: {
  question: MultipleChoiceQuestion | TrueFalseQuestion;
}) => {
  const {question} = props;

  const getQuestionType = (question: any) => {
    return question.wrongAnswer0 === undefined ? 'TrueFalse' : 'MultipleChoice';
  };

  return getQuestionType(question) === 'MultipleChoice' ? (
    <MultipleChoiceQuestionContainer
      question={question as MultipleChoiceQuestion}
    />
  ) : (
    <TrueFalseQuestionContainer question={question as TrueFalseQuestion} />
  );
};

export default QuestionContainer;
