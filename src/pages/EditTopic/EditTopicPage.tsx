import React from "react";

import { useParams } from "react-router-dom";

import { Button, Container, Col, Row, Accordion, Card } from "react-bootstrap";
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
          <h1>Edit Topic Page</h1>
        </Row>
        <Row>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} eventKey="1">
                  Add Question
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <MultipleChoiceForm unit_id={unit_id} topic_id={topic_id} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Row>
        <Col>
          {questionsError && <ExclamationTriangle color="#EED202" />}
          {questionsLoading && <p>Loading questions...</p>}
          {!questions ? (
            <p>Add your first question</p>
          ) : (
            questions.map((question) => {
              // TODO: Add delete question button
              return (
                <Accordion key={question.id}>
                  <Card>
                    <Card.Header>
                      <Row>
                        <Col>{question.id}</Col>
                        <Col>
                          <Button
                            onClick={() => {
                              handleDeleteQuestion(question.id);
                            }}
                          >
                            <Trash />
                          </Button>
                        </Col>
                        <Col>
                          <Accordion.Toggle as={Button} eventKey="0">
                            Edit Question
                          </Accordion.Toggle>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <MultipleChoiceForm
                          initialQuestion={question}
                          unit_id={unit_id}
                          topic_id={topic_id}
                        />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              );
            })
          )}
        </Col>
      </Col>
    </Container>
  );
};

export default EditTopic;
