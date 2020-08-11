import * as React from "react";
import { Question } from "models/Question";
import { Button } from "antd";

interface Props {
  question: Question;
  handleResult: (result: boolean) => void;
}

const MultipleChoice: React.FC<Props> = (props) => {
  const question: Question = props.question;
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
      <h3>{question.question}</h3>

      {/* diplay answer buttons */}
      {answers.map((answer) => {
        return <Button onClick={() => checkAnswer(answer)}>{answer}</Button>;
      })}
    </>
  );
};

export default MultipleChoice;
