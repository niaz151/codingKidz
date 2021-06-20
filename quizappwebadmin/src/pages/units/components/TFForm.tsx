import { useState } from "react";
import {
  Language,
  Topic,
  TrueFalseQuestion,
  Unit,
} from "../../../utils/models";

import { Button, Col, Form, Row } from "react-bootstrap";
import { useAppDispatch } from "../../../ducks/hooks";
import { createTrueFalseQuestion, editQuestion } from "../languagesSlice";

type Props = {
  languageId: Language["id"];
  unitId: Unit["id"];
  topicId: Topic["id"];
  initialQuestion?: TrueFalseQuestion;
};

const TFForm = (props: Props) => {
  const dispatch = useAppDispatch();

  const { initialQuestion } = props;
  const [question, setQuestion] = useState<string>(
    initialQuestion?.question ?? ""
  );
  const [correctAnswer, setCorrectAnswer] = useState(
    initialQuestion?.correctAnswer ?? true
  );

  const onSubmit = () => {
    // Ensure all fields are filled before submitting
    if (!question || !correctAnswer) {
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
          },
        })
      );
    } else {
      dispatch(
        createTrueFalseQuestion({
          languageId: props.languageId,
          unitId: props.unitId,
          topicId: props.topicId,
          question: {
            question: question,
            correctAnswer: correctAnswer,
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
        <Form>
          <div className="mb-3">
            <Form.Check
              type="radio"
              inline
              label="True"
              value={String(correctAnswer)}
              onChange={(event) =>
                setCorrectAnswer(Boolean(event.target.value))
              }
            />
            <Form.Check
              type="radio"
              inline
              label="False"
              value={String(correctAnswer)}
              onChange={(event) =>
                setCorrectAnswer(Boolean(event.target.value))
              }
            />
          </div>
        </Form>
      </Row>
      <Button onClick={onSubmit}>{initialQuestion ? "Edit" : "Create"} Question</Button>
    </Col>
  );
};

export default TFForm;
