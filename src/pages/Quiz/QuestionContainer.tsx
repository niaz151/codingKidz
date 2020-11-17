import * as React from "react";
import { MultipleChoice } from "models";
import { Button } from "react-bootstrap";

interface Props {
  question: MultipleChoice;
  handleResult: (result: boolean) => void;
}

export const QuestionContainer: React.FC<Props> = (props) => {
  const question: MultipleChoice = props.question;
  const [answers] = React.useState<string[]>(
    question.wrong_answers
      .concat(question.correct_answer)
      .sort(() => Math.random() - 0.5)
  );

  const checkAnswer = (answer: string) => {
    if (answer === question.correct_answer) {
      props.handleResult(true);
    } else {
      props.handleResult(false);
    }
  };

  return (
    <>
      {/* display question */}
      <h3 style={{marginLeft: 600, marginBottom: 16}}>{question.question}</h3>

      {/* diplay answer buttons */}
      {answers.map((answer, idx) => {
        return <p style={{marginLeft: 600}} key={idx}>
          <Button onClick={() => checkAnswer(answer)}>{answer}</Button>
          </p>;
      })}
    </>
  );
};
