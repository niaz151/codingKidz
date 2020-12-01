import {
  isMultipleChoice,
  isTrueFalse,
  MultipleChoice,
  TrueFalse,
} from "models";
import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { addQuestion, editQuestion } from "services/api";

export const EditQuestionForm = (props: {
  initialQuestion?: MultipleChoice | TrueFalse;
  unit_id: string;
  topic_id: string;
}) => {
  const { initialQuestion, unit_id, topic_id } = props;

  const [questionType, setQuestionType] = useState<string>("MultipleChoice");

  if (!initialQuestion) {
    return (
      <>
        <Form>
          <Form.Label>New Question Type</Form.Label>
          <Form.Control
            required
            as="select"
            onChange={(event) => {
              switch (event.target.value) {
                case "MultipleChoice":
                  setQuestionType("MultipleChoice");
                  break;
                case "TrueFalse":
                  setQuestionType("TrueFalse");
                  break;
                default:
                  throw new Error("Invalid question type");
              }
            }}
            value={questionType}
          >
            <option value="MultipleChoice">Multiple Choice</option>
            <option value="TrueFalse">True False</option>
          </Form.Control>
        </Form>
        {questionType === "MultipleChoice" && (
          <MultipleChoiceForm unit_id={unit_id} topic_id={topic_id} />
        )}
        {questionType === "TrueFalse" && (
          <TrueFalseForm unit_id={unit_id} topic_id={topic_id} />
        )}
      </>
    );
  } else if (isMultipleChoice(initialQuestion)) {
    return (
      <MultipleChoiceForm
        initialQuestion={initialQuestion}
        unit_id={unit_id}
        topic_id={topic_id}
      />
    );
  } else if (isTrueFalse(initialQuestion)) {
    return (
      <TrueFalseForm
        initialQuestion={initialQuestion}
        unit_id={unit_id}
        topic_id={topic_id}
      />
    );
  } else {
    return <p>If you see me something is wrong</p>;
  }
};

const MultipleChoiceForm = (props: {
  initialQuestion?: MultipleChoice;
  unit_id: string;
  topic_id: string;
}) => {
  const { initialQuestion, unit_id, topic_id } = props;
  const [question, setQuestion] = useState<string | undefined>(
    initialQuestion?.question
  );
  const [correct_answer, setCorrectAnswer] = useState<string | undefined>(
    initialQuestion?.correct_answer
  );
  const [wrong_answer0, setWrong0] = useState<string | undefined>(
    initialQuestion?.wrong_answers[0]
  );
  const [wrong_answer1, setWrong1] = useState<string | undefined>(
    initialQuestion?.wrong_answers[1]
  );
  const [wrong_answer2, setWrong2] = useState<string | undefined>(
    initialQuestion?.wrong_answers[2]
  );
  const [wrong_answer3, setWrong3] = useState<string | undefined>(
    initialQuestion?.wrong_answers[3]
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (
      !question ||
      !correct_answer ||
      !wrong_answer0 ||
      !wrong_answer1 ||
      !wrong_answer2 ||
      !wrong_answer3
    ) {
      console.log("got empty values from required controls");
    } else {
      if (initialQuestion) {
        console.log(
          "editing",
          initialQuestion.id,
          "to unit:topic",
          unit_id,
          ":",
          topic_id
        );
        editQuestion(unit_id, topic_id, {
          id: initialQuestion.id,
          question: question,
          correct_answer: correct_answer,
          wrong_answers: [
            wrong_answer0,
            wrong_answer1,
            wrong_answer2,
            wrong_answer3,
          ],
        });
      } else {
        console.log(
          "adding",
          question,
          "to unit:topic",
          unit_id,
          ":",
          topic_id
        );
        addQuestion(unit_id, topic_id, {
          question: question,
          correct_answer: correct_answer,
          wrong_answers: [
            wrong_answer0,
            wrong_answer1,
            wrong_answer2,
            wrong_answer3,
          ],
        });
      }
    }
    event.preventDefault();
  };

  return (
    <Form name="addquestion" onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Question</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Question Here"
          defaultValue={initialQuestion?.question}
          onChange={(event) => {
            setQuestion(event.target.value);
          }}
        />
        <FormControl.Feedback type="invalid">
          Please enter question
        </FormControl.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Correct Answer</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Correct Answer Here"
          defaultValue={initialQuestion?.correct_answer}
          onChange={(event) => {
            setCorrectAnswer(event.target.value);
          }}
        />
        <FormControl.Feedback type="invalid">
          Please enter answer
        </FormControl.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>First Wrong Answer</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Wrong Answer Here"
          defaultValue={initialQuestion?.wrong_answers[0]}
          onChange={(event) => {
            setWrong0(event.target.value);
          }}
        />
        <FormControl.Feedback type="invalid">
          Please enter answer
        </FormControl.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Second Wrong Answer</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Wrong Answer Here"
          defaultValue={initialQuestion?.wrong_answers[1]}
          onChange={(event) => {
            setWrong1(event.target.value);
          }}
        />
        <FormControl.Feedback type="invalid">
          Please enter answer
        </FormControl.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Third Wrong Answer</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Wrong Answer Here"
          defaultValue={initialQuestion?.wrong_answers[2]}
          onChange={(event) => {
            setWrong2(event.target.value);
          }}
        />
        <FormControl.Feedback type="invalid">
          Please enter answer
        </FormControl.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Fourth Wrong Answer</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Wrong Answer Here"
          defaultValue={initialQuestion?.wrong_answers[3]}
          onChange={(event) => {
            setWrong3(event.target.value);
          }}
        />
        <FormControl.Feedback type="invalid">
          Please enter answer
        </FormControl.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        {!initialQuestion ? "Add Question" : "Edit Question"}
      </Button>
    </Form>
  );
};

const TrueFalseForm = (props: {
  initialQuestion?: TrueFalse;
  unit_id: string;
  topic_id: string;
}) => {
  const { initialQuestion, unit_id, topic_id } = props;
  const [question, setQuestion] = useState<string | undefined>(
    initialQuestion?.question
  );

  const [answer, setAnswer] = useState<boolean>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!question || !answer) {
      console.log("got empty values from required controls");
    } else {
      if (initialQuestion) {
        console.log(
          "editing",
          initialQuestion.id,
          "to unit:topic",
          unit_id,
          ":",
          topic_id
        );
        editQuestion(unit_id, topic_id, {
          id: initialQuestion.id,
          question: question,
          answer: answer,
        });
      } else {
        console.log(
          "adding true false",
          question,
          "to unit:topic",
          unit_id,
          ":",
          topic_id
        );
        addQuestion(unit_id, topic_id, {
          question: question,
          answer: answer,
        });
      }
    }
    event.preventDefault();
  };

  return (
    <Form name="addquestion" onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Question</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Question Here"
          defaultValue={initialQuestion?.question}
          onChange={(event) => {
            setQuestion(event.target.value);
          }}
        />
        <FormControl.Feedback type="invalid">
          Please enter question
        </FormControl.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Correct Answer</Form.Label>
        <Form.Control
          required
          as="select"
          placeholder="Enter Correct Answer Here"
          defaultValue={String(initialQuestion?.answer).toLowerCase()}
          onChange={(event) => {
            switch (event.target.value) {
              case "true":
                setAnswer(true);
                break;
              case "false":
                setAnswer(false);
                break;
              default:
                throw new Error("invalid answer type");
            }
          }}
        >
          <option value="none" selected disabled hidden>
            Please choose an answer
          </option>
          <option value="true">True</option>
          <option value="false">False</option>
        </Form.Control>
        <FormControl.Feedback type="invalid">
          Please enter answer
        </FormControl.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        {!initialQuestion ? "Add Question" : "Edit Question"}
      </Button>
    </Form>
  );
};
