import React, { useState } from "react";

import { useParams } from "react-router-dom";

import { Form, FormControl, Button } from "react-bootstrap";
import { ExclamationTriangle } from "react-bootstrap-icons";

import { NewQuestion, Question } from "models";

import {
  editQuestion,
  addQuestion,
  deleteQuestion,
  useQuestions,
} from "services/api";

interface RouteParams {
  unit_id: string;
  topic_id: string;
}

const EditTopic: React.FC = () => {
  const { unit_id, topic_id } = useParams<RouteParams>();
  let questions: Question[] | undefined;
  let questionsLoading = true;
  let questionsError: Error | undefined;

  try {
    const [
      fetchedQuestions,
      fetchedQuestionsLoading,
      fetchedQuestionsError,
    ] = useQuestions(unit_id, topic_id);

    questions = fetchedQuestions;
    questionsLoading = fetchedQuestionsLoading;
    questionsError = fetchedQuestionsError;
  } catch (e) {
    console.log(e);
  }

  const handleDeleteQuestion = async (question_id: string) => {
    await deleteQuestion(unit_id, topic_id, question_id);
  };

  const QuestionForm = (props: { initialQuestion?: Question }) => {
    const { initialQuestion } = props;
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

    const onSubmit = () => {
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
          Add Question
        </Button>
      </Form>
    );
  };

  return (
    <>
      <p>Edit Topic Page</p>
      <QuestionForm />
      {questionsError && <ExclamationTriangle color="#EED202" />}
      {questionsLoading ? (
        <p>Loading questions...</p>
      ) : !questions ? (
        <p>Add your first question!</p>
      ) : (
        questions.map((question) => {
          // TODO: Add delete question button
          return <QuestionForm initialQuestion={question} />;
        })
      )}
    </>
  );
};

export default EditTopic;
