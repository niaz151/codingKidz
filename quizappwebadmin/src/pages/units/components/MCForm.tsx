import { useState } from "react";
import { MultipleChoiceQuestion } from "../../../utils/models";

type Props = {
  initialQuestion?: MultipleChoiceQuestion
}

const MCForm = (props: Props) => {
  const {initialQuestion} = props;
  const [question, setQuestion] = useState<string>();
  const [correctAnswer, setCorrectAnswer] = useState<string>();
  const [wrongAnswer0, setWrongAnswer0] = useState<string>();
  const [wrongAnswer1, setWrongAnswer1] = useState<string>();
  const [wrongAnswer2, setWrongAnswer2] = useState<string>();

  return (
    <>
      <form>
        <label>Question</label>
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
        <label>Correct Answer</label>
        <input
          value={correctAnswer}
          onChange={(event) => setCorrectAnswer(event.target.value)}
        />
        <label>First Wrong Answer</label>
        <input
          value={wrongAnswer0}
          onChange={(event) => setWrongAnswer0(event.target.value)}
        />
        <label>Second Wrong Answer</label>
        <input
          value={wrongAnswer1}
          onChange={(event) => setWrongAnswer1(event.target.value)}
        />
        <label>Third Wrong Answer</label>
        <input
          value={wrongAnswer2}
          onChange={(event) => setWrongAnswer2(event.target.value)}
        />
      </form>
      <button>Create Question</button>
    </>
  );
};

export default MCForm;
