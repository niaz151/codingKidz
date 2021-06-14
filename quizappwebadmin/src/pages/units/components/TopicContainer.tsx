import React, { useState } from "react";
import {
  Container,
  Col,
  Row,
  Accordion,
  Card,
  Button,
  Modal,
} from "react-bootstrap";

import { MCQuestionContainer, TFQuestionContainer, MCForm, TFForm } from ".";
import { Language, Topic, Unit } from "../../../utils/models";

interface Props {
  languageId: Language["id"];
  unitId: Unit["id"];
  topic: Topic;
}

const TopicContainer = (props: Props) => {
  const { topic } = props;

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

  const renderFormInModal = () => {
    switch (modalSettings.type) {
      case "MC":
        return (
          <MCForm
            languageId={props.languageId}
            unitId={props.unitId}
            topicId={topic.id}
          />
        );
      case "TF":
        return (
          <TFForm
            languageId={props.languageId}
            unitId={props.unitId}
            topicId={topic.id}
          />
        );
    }
  };

  return (
    <>
      <Modal show={modalSettings.open} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderFormInModal()}</Modal.Body>
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
                    <Button
                      onClick={() =>
                        setModalSettings({ type: "MC", open: true })
                      }
                    >
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
                    <Button
                      onClick={() =>
                        setModalSettings({ type: "TF", open: true })
                      }
                    >
                      Create True False Question
                    </Button>
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
