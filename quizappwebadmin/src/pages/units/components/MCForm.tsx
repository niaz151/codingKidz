import { useState } from "react";
import {
  Language,
  MultipleChoiceQuestion,
  Topic,
  Unit,
} from "../../../utils/models";

import Button from "react-bootstrap/Button";
import { useAppDispatch } from "../../../ducks/hooks";
import { createMultipleChoiceQuestion } from "../languagesSlice";

type Props = {
  languageId: Language["id"];
  unitId: Unit["id"];
  topicId: Topic["id"];
  initialQuestion?: MultipleChoiceQuestion;
};

const MCForm = (props: Props) => {
  const dispatch = useAppDispatch();

  const { initialQuestion } = props;
  const [question, setQuestion] = useState<string>(
    initialQuestion?.question ?? ""
  );
  const [correctAnswer, setCorrectAnswer] = useState<string>(
    initialQuestion?.correctAnswer ?? ""
  );
  const [wrongAnswer0, setWrongAnswer0] = useState<string>(
    initialQuestion?.wrongAnswer0 ?? ""
  );
  const [wrongAnswer1, setWrongAnswer1] = useState<string>(
    initialQuestion?.wrongAnswer1 ?? ""
  );
  const [wrongAnswer2, setWrongAnswer2] = useState<string>(
    initialQuestion?.wrongAnswer2 ?? ""
  );

  const onSubmit = () => {
    // Ensure all fields are filled before submitting
    if (
      question !== "" ||
      correctAnswer !== "" ||
      wrongAnswer0 !== "" ||
      wrongAnswer1 !== "" ||
      wrongAnswer2 !== ""
    ) {
      alert("fill out the form!");
    } else if (initialQuestion) {
      // TODO Edit question
    } else {
      dispatch(
        createMultipleChoiceQuestion({
          languageId: props.languageId,
          unitId: props.unitId,
          topicId: props.topicId,
          question: {
            question: question,
            correctAnswer: correctAnswer,
            wrongAnswer0: wrongAnswer0,
            wrongAnswer1: wrongAnswer1,
            wrongAnswer2: wrongAnswer2,
          },
        })
      );
    }
  };

  return (
    <>
      <div>
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
      </div>
      <Button onClick={onSubmit}>Create Question</Button>
    </>
  );
};

export default MCForm;
