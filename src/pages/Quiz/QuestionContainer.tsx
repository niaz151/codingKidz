import * as React from "react";
import { isMultipleChoice, isTrueFalse, MultipleChoice, TrueFalse } from "models";
import { Button } from "react-bootstrap";

export const QuestionContainer = (props: {
  question: MultipleChoice | TrueFalse;
  handleResult: (result: boolean) => void;
}) => {
  const { question, handleResult } = props;

  if (isMultipleChoice(question)) {
    return (
      <MultipleChoiceContainer
        question={question}
        handleResult={handleResult}
      />
    );
  } else if (isTrueFalse(question)) {
    return (
      <TrueFalseContainer
        question={question}
        handleResult={handleResult}
      />
    )
  } else {
    return <p>Invalid question</p>
  }
};

const MultipleChoiceContainer = (props: {
  question: MultipleChoice;
  handleResult: (result: boolean) => void;
}) => {
  const { question, handleResult } = props;
  const [answers] = React.useState<string[]>(
    question.wrong_answers
      .concat(question.correct_answer)
      .sort(() => Math.random() - 0.5)
  );

  const checkAnswer = (answer: string) => {
    if (answer === question.correct_answer) {
      handleResult(true);
    } else {
      handleResult(false);
    }
  };

  return (
    <>
      {/* display question */}
      <h3 style={{ marginLeft: 600, marginBottom: 16 }}>{question.question}</h3>

      {/* diplay answer buttons */}
      {answers.map((answer, idx) => {
        return (
          <p style={{ marginLeft: 600 }} key={idx}>
            <Button onClick={() => checkAnswer(answer)}>{answer}</Button>
          </p>
        );
      })}
    </>
  );
};

const TrueFalseContainer = (props: {
  question: TrueFalse;
  handleResult: (result: boolean) => void;
}) => {
  const { question, handleResult } = props;

  const checkAnswer = (answer: boolean) => {
    if (answer === question.answer) {
      handleResult(true);
    } else {
      handleResult(false);
    }
  };

  return (
    <>
      {/* display question */}
      <h3>{question.question}</h3>

      <Button
        onClick={() => {
          checkAnswer(true);
        }}
      >
        True
      </Button>
      <Button
        onClick={() => {
          checkAnswer(false);
        }}
      >
        False
      </Button>
    </>
  );
};
