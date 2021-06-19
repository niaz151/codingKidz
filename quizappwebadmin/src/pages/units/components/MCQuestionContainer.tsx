import { useState } from "react";
import { Accordion, Button, Card, Modal } from "react-bootstrap";
import { MCForm } from ".";
import { useAppDispatch } from "../../../ducks/hooks";
import { Language, MultipleChoiceQuestion, Unit } from "../../../utils/models";
import { deleteQuestion } from "../languagesSlice";

interface Props {
  languageId: Language["id"];
  unitId: Unit["id"];
  question: MultipleChoiceQuestion;
}

const MCQuestionContainer = (props: Props) => {
  const { question } = props;

  const dispatch = useAppDispatch();

  const [modalSettings, setModalSettings] = useState<{
    open: boolean;
    type: "EDIT" | "DELETE";
  }>({
    open: false,
    type: "EDIT",
  });

  const closeModal = () => {
    setModalSettings({ ...modalSettings, open: false });
  };

  const renderModalBody = () => {
    switch (modalSettings.type) {
      case "EDIT":
        return (
          <MCForm
            languageId={props.languageId}
            unitId={props.unitId}
            topicId={question.topicId}
            initialQuestion={question}
          />
        );
      case "DELETE":
        return (
          <div>
            <p>This will permanently delete the question!</p>
          </div>
        );
    }
  };

  const showEditModal = () => {
    setModalSettings({
      open: true,
      type: "EDIT",
    });
  };

  const showDeleteModal = () => {
    setModalSettings({
      open: true,
      type: "DELETE",
    });
  };

  const handleDelete = () => {
    dispatch(
      deleteQuestion({
        languageId: props.languageId,
        unitId: props.unitId,
        topicId: question.topicId,
        questionId: question.id,
      })
    );
  };

  return (
    <>
      <Modal show={modalSettings.open} onHide={closeModal}>
        <Modal.Header closeButton>
          {modalSettings.type === "EDIT" && (
            <Modal.Title>Edit Question</Modal.Title>
          )}
          {modalSettings.type === "DELETE" && (
            <Modal.Title>Delete Question</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>{renderModalBody()}</Modal.Body>
        <Modal.Footer>
          {modalSettings.type === "DELETE" && (
            <Button onClick={handleDelete}>Delete</Button>
          )}
          <Button variant="danger" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Card>
        <Card.Header>
          <Accordion.Toggle eventKey={String(question.topicId)}>
            {question.question}
          </Accordion.Toggle>
          <Button onClick={showEditModal}>Edit</Button>
          <Button onClick={showDeleteModal}>Delete</Button>
        </Card.Header>
        <Accordion.Collapse eventKey={String(question.topicId)}>
          <Card.Body>
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle eventKey={String(question.id)}>
                    {question.question}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={String(question.id)}>
                  <ul>
                    <li>Correct Answer: {question.correctAnswer}</li>
                    <li>Wrong Answer 0: {question.wrongAnswer0}</li>
                    <li>Wrong Answer 1: {question.wrongAnswer1}</li>
                    <li>Wrong Answer 2: {question.wrongAnswer2}</li>
                  </ul>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  );
};

export default MCQuestionContainer;
