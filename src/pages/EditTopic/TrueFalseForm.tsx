import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";

import { addQuestion, editQuestion } from "services/api";

import { TrueFalse } from "models";

export const TrueFalseForm = (props: {
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
