import { useState } from "react";
import {
  Language,
  MultipleChoiceQuestion,
  Topic,
  Unit,
} from "../../../utils/models";

import { Button, Col, Row } from "react-bootstrap";
import { useAppDispatch } from "../../../ducks/hooks";
import { createMultipleChoiceQuestion, editQuestion } from "../languagesSlice";

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
  const [correctAnswer, setCorrectAnswer] = useState(
    initialQuestion?.correctAnswer ?? ""
  );
  const [wrongAnswer0, setWrongAnswer0] = useState(
    initialQuestion?.wrongAnswer0 ?? ""
  );
  const [wrongAnswer1, setWrongAnswer1] = useState(
    initialQuestion?.wrongAnswer1 ?? ""
  );
  const [wrongAnswer2, setWrongAnswer2] = useState(
    initialQuestion?.wrongAnswer2 ?? ""
  );

  const onSubmit = () => {
    // Ensure all fields are filled before submitting
    if (
      question === "" ||
      correctAnswer === "" ||
      wrongAnswer0 === "" ||
      wrongAnswer1 === "" ||
      wrongAnswer2 === ""
    ) {
      alert("fill out the form!");
    } else if (initialQuestion) {
      dispatch(
        editQuestion({
          languageId: props.languageId,
          unitId: props.unitId,
          topicId: props.topicId,
          question: {
            id: initialQuestion.id,
            topicId: props.topicId,
            question,
            correctAnswer,
            wrongAnswer0,
            wrongAnswer1,
            wrongAnswer2,
          },
        })
      );
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
    <Col>
      <Row>
        <label>Question</label>
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
      </Row>
      <Row>
        <label>Correct Answer</label>
        <input
          value={correctAnswer}
          onChange={(event) => setCorrectAnswer(event.target.value)}
        />
      </Row>
      <Row>
        <label>First Wrong Answer</label>
        <input
          value={wrongAnswer0}
          onChange={(event) => setWrongAnswer0(event.target.value)}
        />
      </Row>
      <Row>
        <label>Second Wrong Answer</label>
        <input
          value={wrongAnswer1}
          onChange={(event) => setWrongAnswer1(event.target.value)}
        />
      </Row>
      <Row>
        <label>Third Wrong Answer</label>
        <input
          value={wrongAnswer2}
          onChange={(event) => setWrongAnswer2(event.target.value)}
        />
      </Row>
      <Button onClick={onSubmit}>{initialQuestion ? "Edit" : "Create"} Question</Button>
    </Col>
  );
};

export default MCForm;
