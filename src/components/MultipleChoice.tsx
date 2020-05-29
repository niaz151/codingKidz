import * as React from "react";
import { Question } from "models/Question";

interface Props {
  question: Question;
  handleResult: (result: boolean) => void;
}

export const MultipleChoice: React.FC<Props> = (props) => {
  const question: Question = props.question;
  const [answers] = React.useState<string[]>(
    shuffle(question.wrong_answers.concat(question.correct_answer))
  );

  return (
    <>
      {/* display question */}
      <h3>{question.question}</h3>

      {/* diplay answer buttons */}
      {answers.map((answer) => {
        return <button onClick={() => checkAnswer(answer)}>{answer}</button>;
      })}
    </>
  );

  function checkAnswer(answer: string) {
    if (answer === question.correct_answer) {
      props.handleResult(true);
    } else {
      props.handleResult(false);
    }
  }

  // Fischer-Yates Shuffle
  function shuffle(array: any[]) {
    var i = 0,
      j = 0,
      temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }
};
