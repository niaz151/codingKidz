import * as React from "react";
import { Question } from "models";
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
      <h3 style={{marginLeft: 600, marginBottom: 16}}>{question.question}</h3>

      {/* diplay answer buttons */}
      {answers.map((answer) => {
        return <p style={{marginLeft: 600}}>
          <Button onClick={() => checkAnswer(answer)}>{answer}</Button>
          </p>;
      })}
    </>
  );
};

export default MultipleChoice;
