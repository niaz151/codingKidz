import React, { useState } from "react";

import { useParams } from "react-router-dom";

import {
  Button,
  Container,
  Col,
  Row,
  Accordion,
  Card,
  Modal,
} from "react-bootstrap";
import { ExclamationTriangle, Trash } from "react-bootstrap-icons";

import { deleteQuestion, useQuestions } from "services/api";
import { EditQuestionForm } from "./EditQuestionForm";

interface RouteParams {
  unit_id: string;
  topic_id: string;
}

const EditTopic: React.FC = () => {
  const { unit_id, topic_id } = useParams<RouteParams>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<string>();
  const [questions, questionsLoading, questionsError] = useQuestions(
    unit_id,
    topic_id
  );

  const handleDeleteQuestion = async (question_id: string | undefined) => {
    if (question_id) {
      await deleteQuestion(unit_id, topic_id, question_id);
    } else {
      console.log("called handleDeleteQuestion with undefined question_id");
    }
  };

  return (
    <Container>
      <Modal show={showDeleteModal}>
        <Modal.Header>
          <Modal.Title>Confirm your choice</Modal.Title>
        </Modal.Header>
        <Modal.Body>This will permanently delete the question!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowDeleteModal(false);
              setQuestionToDelete(undefined);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteQuestion(questionToDelete);
              setQuestionToDelete(undefined);
              setShowDeleteModal(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
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
                  <EditQuestionForm unit_id={unit_id} topic_id={topic_id} />
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
                <React.Fragment key={question.id}>
                  <Accordion>
                    <Card>
                      <Card.Header>
                        <Row>
                          <Col>{question.id}</Col>
                          <Col>
                            <Button
                              onClick={() => {
                                setQuestionToDelete(question.id);
                                setShowDeleteModal(true);
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
                          <EditQuestionForm
                            initialQuestion={question}
                            unit_id={unit_id}
                            topic_id={topic_id}
                          />
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </React.Fragment>
              );
            })
          )}
        </Col>
      </Col>
    </Container>
  );
};

export default EditTopic;
