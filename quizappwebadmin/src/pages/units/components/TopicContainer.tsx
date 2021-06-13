import React, { useState } from "react";
import {
  Container,
  Col,
  Row,
  Accordion,
  Card,
  Button,
  Modal
} from "react-bootstrap";

import { MCQuestionContainer, TFQuestionContainer } from ".";
import { Language, Topic, Unit } from "../../../utils/models";
import MCForm from "./MCForm";

interface Props {
  languageId: Language["id"];
  unitId: Unit["id"];
  topic: Topic;
}

const TopicContainer = (props: Props) => {
  const { topic } = props;

  const [showModal, setShowModal] = useState(false);
  const [modalSettings, setModalSettings] = useState<{
    open: boolean;
    type: "MC" | "TF";
  }>({
    open: false,
    type: "MC",
  });

  const closeModal = () => {
    setModalSettings({ ...modalSettings, open: false });
  };

  return (
    <>
      <Modal show={modalSettings.open} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalSettings.type === "MC" ? (
            <MCForm
              languageId={props.languageId}
              unitId={props.unitId}
              topicId={topic.id}
            />
          ) : (
            <Text>True False</Text>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Card>
        <Card.Header>
          <Accordion.Toggle eventKey={String(topic.id)}>
            {topic.name}
          </Accordion.Toggle>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </Card.Header>
        <Accordion.Collapse eventKey={String(topic.id)}>
          <Card.Body>
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle eventKey="mcquestions">
                    Multiple Choice Questions
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="mcquestions">
                  <div>
                    {topic.multipleChoiceQuestions?.map((question) => {
                      return (
                        <MCQuestionContainer
                          question={question}
                          key={question.id}
                        />
                      );
                    })}
                    <Button onClick={() => setShowModal(true)}>
                      Create Multiple Choice Question
                    </Button>
                  </div>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle eventKey="mcquestions">
                    True False Choice Questions
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="mcquestions">
                  <>
                    {topic.trueFalseQuestions?.map((question) => {
                      return (
                        <TFQuestionContainer
                          question={question}
                          key={question.id}
                        />
                      );
                    })}
                  </>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  );
};

export default TopicContainer;
