import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";

import { addQuestion, editQuestion } from "services/api";

import { MultipleChoice } from "models";

export const MultipleChoiceForm = (props: {
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
    initialQuestion?.wrong_answers.wrong_answer_0
  );
  const [wrong_answer1, setWrong1] = useState<string | undefined>(
    initialQuestion?.wrong_answers.wrong_answer_1
  );
  const [wrong_answer2, setWrong2] = useState<string | undefined>(
    initialQuestion?.wrong_answers.wrong_answer_2
  );
  const [wrong_answer3, setWrong3] = useState<string | undefined>(
    initialQuestion?.wrong_answers.wrong_answer_3
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
          wrong_answers: {
            wrong_answer_0: wrong_answer0,
            wrong_answer_1: wrong_answer1,
            wrong_answer_2: wrong_answer2,
            wrong_answer_3: wrong_answer3,
          },
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
          wrong_answers: {
            wrong_answer_0: wrong_answer0,
            wrong_answer_1: wrong_answer1,
            wrong_answer_2: wrong_answer2,
            wrong_answer_3: wrong_answer3,
          },
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
          defaultValue={initialQuestion?.wrong_answers.wrong_answer_0}
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
          defaultValue={initialQuestion?.wrong_answers.wrong_answer_1}
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
          defaultValue={initialQuestion?.wrong_answers.wrong_answer_2}
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
          defaultValue={initialQuestion?.wrong_answers.wrong_answer_3}
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
