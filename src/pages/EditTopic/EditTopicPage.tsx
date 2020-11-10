import React from "react";

import { useParams } from "react-router-dom";

import { Button, Container, Col, Row } from "react-bootstrap";
import { ExclamationTriangle, Trash } from "react-bootstrap-icons";

import { deleteQuestion, useQuestions } from "services/api";
import { MultipleChoiceForm } from "./MultipleChoiceForm";

interface RouteParams {
  unit_id: string;
  topic_id: string;
}

const EditTopic: React.FC = () => {
  const { unit_id, topic_id } = useParams<RouteParams>();
  const [questions, questionsLoading, questionsError] = useQuestions(
    unit_id,
    topic_id
  );

  const handleDeleteQuestion = async (question_id: string) => {
    await deleteQuestion(unit_id, topic_id, question_id);
  };

  return (
    <Container>
      <Col>
        <Row>
          <p>Edit Topic Page</p>
        </Row>
        <Row>
          <MultipleChoiceForm unit_id={unit_id} topic_id={topic_id} />
        </Row>
        <Row>
          {questionsError && <ExclamationTriangle color="#EED202" />}
          {questionsLoading && <p>Loading questions...</p>}
          {!questions ? (
            <p>Add your first question</p>
          ) : (
            questions.map((question) => {
              // TODO: Add delete question button
              return (
                <Col>
                  <Row>
                    <Col>
                      <p>{question.id}</p>
                    </Col>
                    <Col>
                      <Button
                        onClick={() => {
                          handleDeleteQuestion(question.id);
                        }}
                      >
                        <Trash />
                      </Button>
                    </Col>
                  </Row>
                  <MultipleChoiceForm
                    initialQuestion={question}
                    unit_id={unit_id}
                    topic_id={topic_id}
                  />
                </Col>
              );
            })
          )}
        </Row>
      </Col>
    </Container>
  );
};

export default EditTopic;
